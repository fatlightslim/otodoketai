import { connectToDatabase } from "../../../utils/mongodb"
import { ObjectId } from "mongodb"
import Cors from "micro-cors"
import { sendMail } from "../../../utils/email-helpers"

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
})

async function handler(req, res) {
  const { db } = await connectToDatabase()
  switch (req.method) {
    case "GET":
      return res.json(
        await db.collection("orders").find({}).sort({ _ts: -1 }).limit(50).toArray()
      )
    case "POST":
      return await post()
    default:
      res.setHeader("Allow", "POST")
      res.status(405).end("Method Not Allowed")
  }

  async function upsert(_id, payload) {
    return new Promise(async (resolve, reject) => {
      await db
        .collection("orders")
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          { ...payload },
          { upsert: true, returnOriginal: false },
          (err, r) => {
            if (err) reject(err)
            resolve(r)
          }
        )
    })
  }

  async function post() {
    const { _id, status, url, ...rest } = req.body
    const _ts = new Date()

    db.collection("orders").findOneAndUpdate(
      { _id: ObjectId(_id) }, // generate new ObjectId if _id is undefined == new post
      {
        $set: {
          ...rest,
          _ts,
        },
        $push: {
          log: {
            status,
            _ts,
          },
        },
      },
      { upsert: true, returnOriginal: false },
      (err, r) => {
        if (err) console.log(err)
        if (url) {
          sendMail(r.value, status, url)
            .then(() => {
              res.json(r.value)
            })
            .catch((err) => {
              console.log(err)
              res.json(err)
            })
        } else {
          res.json(r.value)
        }
      }
    )
  }
}

export default cors(handler)

// const schema = {
//   _id: ObjectId,
//   _ts: DateTime, // A.K.A updatedAt. createdAt is supposed to be extracted from _id. ObjectId.getTimestamp().
//   items: Array, // line items from contentful and quantity. {{ product: { fields, sys }}, quantity: 1 }
//   status: Array [
//     {status: "cod", _ts: new Date() }
//   ], // ['cod', 'awaiting_payment', 'paid', 'sent_failure', 'done', 'shipping', 'sent_order_confirm', 'sent_shipping', 'payment_failed']
//   customer: {
//     name: String,
//     email: String,
//     addr1: String,
//     addr2: String,
//     zip: String,
//     pref: String,
//     country: String,
//     tel: String,
//   },
//   payment: { // response from Stripe
//     id: 'cs_test_a17X5ihg0rafVrZckbTgfF0d95Ym0pLGQgmvqcMO6JJ32QAMfj4UK7nwqf',
//     object: 'checkout.session',
//     allow_promotion_codes: null,
//     amount_subtotal: 169600,
//     amount_total: 169600,
//     billing_address_collection: null,
//     cancel_url: 'http://localhost:3000/',
//     client_reference_id: null,
//     currency: 'jpy',
//     customer: 'cus_IsJ1FD0v2q6Wjj',
//     customer_details: {
//       email: 'masataka.abiru@gmail.com',
//       tax_exempt: 'none',
//       tax_ids: []
//     },
//     customer_email: 'masataka.abiru@gmail.com',
//     livemode: false,
//     locale: null,
//     metadata: {},
//     mode: 'payment',
//     payment_intent: 'pi_1IGYPY2clWuDaPHqfYH7t5It',
//     payment_method_types: [ 'card' ],
//     payment_status: 'paid',
//     setup_intent: null,
//     shipping: null,
//     shipping_address_collection: null,
//     submit_type: null,
//     subscription: null,
//     success_url: 'http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}',
//     total_details: { amount_discount: 0, amount_tax: 0 }
//   }
// }
