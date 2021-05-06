import { connectToDatabase } from "./mongodb"
import { ObjectId } from "mongodb"
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const headerImage = "http://cdn.mcauto-images-production.sendgrid.net/9257f8dcd27cf709/ae5db8df-9aa0-4e15-b8b8-98de5fe7df9a/2467x1535.png"

function getTemplateData(data) {
  const _id = data._id.toString() // NOTICE: returned _id is not String but Object
  const { customer, items, charge, payment, subject, url } = data
  const { addr1, addr2, zip, pref } = customer
  const address = zip + " " + pref + addr1 + addr2


  return {
    // tracking_code,
    subject,
    url,
    name: customer.name,
    tel: customer.tel,
    order_id: "#" + _id.substr(18).toUpperCase(),
    order_url: `${url}/order/detail?_id=${_id}`,
    subTotal: charge.subTotal.toLocaleString(),
    delivery: charge.delivery.toLocaleString(),
    total: charge.total.toLocaleString(),
    address,
    email: process.env.EMAIL,
    pay: payment ? "オンライン決済" : "代金引換",
    items: items.map((v) => {
      const { fields, quantity } = v
      const { image, title, price,  } = fields
      return {
        title,
        price,
        quantity,
        image: image ? "https:" + image.fields.file.url : headerImage,
      }
    }),
    price_detail: [{ title: "配送料", amount: charge.delivery }],
    headerImage
      
  }
}

function buildEmail(data, s) {
  const { customer, _id } = data
  const order_id = _id.toString().substr(18).toUpperCase()

  const templates = {
    sent_order_confirm: {
      subject: `${process.env.site.name} ご注文の確認 #${order_id}`,
      template: "d-5da79b6010c642cab0c6483d95f161e2",
    },
    sent_shipping: {
      subject: `${process.env.site.name} ご注文の商品(${order_id})が発送されました`,
      template: "d-6410e5d78a16446dab36463a37ad6210",
    },
    sent_failure: {
      subject: `重要なお知らせ: ${process.env.site.name} のご注文について ${order_id} `,
      template: "d-9f5e67f4369e4a9eaa6ed0f5b4b72bb9",
    },
  }

  //https://github.com/sendgrid/sendgrid-nodejs/issues/843
  data.subject = templates[s].subject 

  return {
    personalizations: [
      {
        subject: templates[s].subject,
        to: [{ email: customer.email }],
        bcc: [{ email: "fatlightslim@gmail.com" }, {email: "touganechuuou@ycmail.jp"}],
      },
    ],
    from: `お届け隊<${process.env.EMAIL}>`,
    // subject: templates[s].subject, // BUG. not working
    templateId: templates[s].template,
    dynamicTemplateData: getTemplateData(data),
  }
}

export async function sendMail(data, status, url) {
  const { db } = await connectToDatabase()

  return new Promise((resolve, reject) => {
    let newStatus
    if (["paid", "cod"].includes(status)) {
      newStatus = "sent_order_confirm"
    } else if (status === "shipping") {
      newStatus = "sent_shipping"
    } else if (status === "payment_failed") {
      newStatus = "sent_failure"
    } else {
      resolve()
    }

    data.url = url

    sgMail
      .send(buildEmail(data, newStatus))
      .then((r) => {
        db.collection("orders").findOneAndUpdate(
          { _id: ObjectId(data._id.toString()) },
          {
            $push: {
              log: {
                status: newStatus,
                _ts: new Date(),
              },
            },
          },
          { upsert: true, returnOriginal: false },
          (err, r) => {
            if (err) console.log(err)
            resolve(r)
          }
        )
      })
      .catch((e) => {
        reject(e)
      })
  })
}
