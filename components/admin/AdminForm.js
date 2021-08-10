import { fetchPostJSON, cleanUp } from "../../utils/api-helpers"
import React, { useState, useEffect, useRef, Component } from "react"
import { useCart } from "react-use-cart"
import { useForm } from "react-hook-form"
import OrderDetails from "./OrderDetails"
import Badge from "./Badge"

import { getImageFields } from "../../utils/contentful"
import Image from "next/image"
import ReactToPrint from "react-to-print"
import PurchaseOrder from "../../components/PurchaseOrder"

const labels = {
  sent_order_confirm: "配送待ち",
  sent_tracking: "配送中",
  cod: "配送待ち",
  draft: "カゴ落ち",
  name: "名前",
  addr: "住所",
  email: "メール",
  tel: "TEL",
  allergy: "アレルギー",
  remark: "注意事項",
  pay: "決済方法",
  addr1: "住所1",
  addr2: "住所2",
  zip: "郵便番号",
}

export default function AdminForm({ name, order, result }) {
  const { items, setItems, cartTotal } = useCart()
  const { handleSubmit, errors, register, setValue } = useForm()
  const { customer, _id } = order
  const address = customer.zip + " " + customer.addr1 + customer.addr2
  const [charge, setCharge] = useState(getCharge())
  const [show, setShow] = useState(false)

  console.log("AdminForm_name")
  console.log(name)
  console.log("AdminForm_order")
  console.log(order)
  console.log("AdminForm_result")
  console.log(result)

  useEffect(() => {
    const newItems = order.items.map((v) => {
      return {
        id: v.sys.id, // required for cart
        price: v.fields.price, // required for cart
        ...v,
      }
    })
    setItems(newItems)
  }, [])

  useEffect(() => {
    setCharge(getCharge())
    // console.log(order)
  }, [cartTotal])

  function getCharge() {
    const total = cartTotal + order.charge.delivery
    return {
      ...order.charge,
      total,
      subTotal: cartTotal,
      tax: total - parseInt(total / 1.1),
    }
  }

  const onSubmit = (data) => {
    fetchPostJSON("/api/orders", {
      _id,
      customer: data,
      items: cleanUp(items),
      status: order.log.slice(-1)[0]["status"],
      charge: { ...charge, pay: order.charge.pay },
    }).then((value) => {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    })
  }

  const onCancel = (data) => {
    fetchPostJSON("/api/orders", {
      _id,
      status: "cancel",
    }).then((value) => {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 border-t border-gray-200"
      >
        <div className="absolute top-1 right-4 ">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            更新する
          </button>
          <button
            type="button"
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              if (window.confirm("are you sure?")) {
                onCancel()
              }
            }}
          >
            キャンセル
          </button>
        </div>
        <dl className="divide-y divide-gray-200">
          <Field ref={register({ required: true })} name="name" order={order} />
          <Field name="zip" order={order} ref={register({ required: true })} />
          <Field
            name="addr1"
            order={order}
            ref={register({ required: true })}
          />
          <Field
            name="addr2"
            order={order}
            ref={register()}
          />
          <Field
            ref={register({ required: true })}
            name="email"
            order={order}
          />
          <Field ref={register({ required: true })} name="tel" order={order} />
          <Field ref={register()} name="allergy" order={order} />
          <Field ref={register()} name="remark" order={order} />
          <Field name="pay" order={order} />
          <Field name="receipt" order={order} result={result}/>
        </dl>
        <OrderDetails charge={charge} />
      </form>
      <Badge show={show} setShow={setShow} />
    </div>
  )
}

const Field = React.forwardRef(
  ({ name, label, register, order, result, ...rest }, ref) => {
    if (!order) return null
    const { charge, customer } = order
    const { errors } = useForm()
    // console.log(order);

    const getReceipt = () => (
      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
        <Po order={order} result={result} />
        <Receipt order={order} />
      </ul>
    )

    return (
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{labels[name]}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {name === "pay" ? (
            <span className="">{getPay(charge.pay)}</span>
          ) : name === "receipt" ? (
            <span>{getReceipt()}</span>
          ) : name === "remark" ? (
            <textarea 
              id={name} 
              name={name} 
              ref={ref}
              {...rest}
              rows="4" cols="40"
              className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              defaultValue={customer[name]}
            />
          ) : name === "allergy" ? (
            <input
              type="checkbox"
              ref={ref}
              name={name}
              id={name}
              className="block shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              defaultChecked={customer[name]}
            />
          ) : (
            <input
              type="text"
              ref={ref}
              name={name}
              id={name}
              className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              defaultValue={customer[name]}
            />
          )}
        </dd>
      </div>
    )
  }
)

const getPay = (pay) => (pay === "cod" ? "代金引換" : "オンライン決済")



const Receipt = ({ order }) => {
  const componentRef = useRef()
  console.log("Receipt_order")
  console.log(order)
  return (
    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div className="w-0 flex-1 flex items-center">
        <svg
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2 flex-1 w-0 truncate">領収書</span>
      </div>
      <div className="ml-4 flex-shrink flex space-x-4">
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              印刷
            </button>
          )}
          content={() => componentRef.current}
        />
        <div className="absolute hidden">
          <ComponentToPrint order={order} ref={componentRef} />
        </div>
      </div>
    </li>
  )
}

const Po = ({ order, result }) => {
  const componentRef = useRef()
  return (
    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div className="w-0 flex-1 flex items-center">
        <svg
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2 flex-1 w-0 truncate">発注書</span>
      </div>
      <div className="ml-4 flex-shrink flex space-x-4">
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              印刷
            </button>
          )}
          content={() => componentRef.current}
        />
        <div className="absolute hidden">
          <PurchaseOrder order={order} items={result} ref={componentRef} />
        </div>
      </div>
    </li>
  )
}

class ComponentToPrint extends Component {
  render() {
    const { order } = this.props
    if (!order) return null
    const { customer, _ts, items, charge } = order
    const address = customer.zip + " " + customer.addr1 + customer.addr2

    return (
      <div className="py-8 px-12">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            領収書
          </h3>
          <p className="mt-1 max-w-2xl text-md text-gray-500">
            注文日: {new Date(_ts).toLocaleString()}
          </p>
          <p className="mt-1 max-w-2xl text-md text-gray-500">
            お届け日時: {new Date(customer.date).toLocaleDateString()}
            <span className="ml-2">{customer.time}</span>
          </p>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">お名前</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{customer.name}&nbsp;様</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                メールアドレス
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{customer.email}</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">ご住所</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{address}</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">お電話番号</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{customer.tel}</span>
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">決済方法</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{getPay(charge.pay)}</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">注意事項</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{customer.remark}</span>
                
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">注文概要</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border-b border-gray-200 rounded-md divide-y divide-gray-200">
                  {items.map((v) => {
                    const { fields, sys, quantity } = v
                    const { image, title, price } = fields
                    return (
                      <div className="border-t border-l border-r ">
                        <li
                          key={sys.id + v.shopName}
                          className="pl-10 pr-4 pt-3 flex items-center justify-between text-sm"
                          // className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                            {v.shopName}
                        </li>
                        <li
                          key={sys.id}
                          // className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          className="pl-3 pr-4 pb-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="flex-shrink-0 h-5 w-5 text-gray-400">
                              {image && image.fields ? (
                                <Image {...getImageFields(image)} />
                              ) : (
                                <img
                                  className="rounded-md"
                                  src="http://placehold.jp/24/cccccc/ffffff/200x200.png?text=撮影中"
                                />
                              )}
                            </span>
                            <span className="ml-2 flex-1 w-0 truncate">
                              {title}
                              <span className="ml-2 ">
                                  &yen;{price.toLocaleString()}
                              </span>
                              <span className="px-2">x</span> {quantity}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex space-x-4">
                            <span className="text-gray-900" aria-hidden="true">
                              &yen;{(price * quantity).toLocaleString()}  
                            </span>
                          </div>
                        </li>
                      </div>
                    )
                  })}
                  <li className="border pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">配送料</span>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <span className="text-gray-900" aria-hidden="true">
                        &yen; {charge.delivery}
                      </span>
                    </div>
                  </li>
                  <li className="border pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">合計</span>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <span className="text-gray-900" aria-hidden="true">
                        &yen; {charge.total}
                      </span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
          <div className="text-sm text-gray-900">
            上記金額を領収しました。
            <br />
            この度はよみうりのお届け隊をご利用いただきありがとうございました。
            <br />
            またのご利用を心よりお待ちしております。
            <br />
            ＹＣ東金中央・東金東部 よみうりお届け隊 代表：館坂民和
            <br />
            〒283-0063　東金市堀上56-4　電話0475-52-2240
          </div>
        </div>
      </div>
    )
  }
}
