import { fetchPostJSON, cleanUp } from "../../utils/api-helpers"
import React, { useEffect, useState } from "react"
import { useCart } from "react-use-cart"
import { useForm } from "react-hook-form"
import OrderDetails from "./OrderDetails"
import Badge from "./Badge"

const labels = {
  sent_order_confirm: "配送待ち",
  sent_tracking: "配送中",
  cod: "配送待ち",
  draft: "カゴ落ち",
  name: "名前",
  addr: "住所",
  email: "メール",
  tel: "TEL",
  pay: "決済方法",
  addr1: "住所1",
  addr2: "住所2",
  zip: "郵便番号",
}

export default function AdminForm({ name, order }) {
  const { items, setItems, cartTotal } = useCart()
  const { handleSubmit, errors, register, setValue } = useForm()
  const { customer, _id } = order
  const address = customer.zip + " " + customer.addr1 + customer.addr2
  const [charge, setCharge] = useState(getCharge())
  const [show, setShow] = useState(false)

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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 border-t border-gray-200"
      >
        <button
          type="submit"
          className="absolute top-1 right-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          更新する
        </button>
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
            ref={register({ required: true })}
          />
          <Field
            ref={register({ required: true })}
            name="email"
            order={order}
          />
          <Field ref={register({ required: true })} name="tel" order={order} />
          <Field name="pay" order={order} />
          <Field name="receipt" order={order} />
        </dl>
        <OrderDetails charge={charge} />
      </form>
      <Badge show={show} setShow={setShow} />
    </div>
  )
}

const Field = React.forwardRef(
  ({ name, label, register, order, ...rest }, ref) => {
    if (!order) return null
    const { charge, customer } = order
    const { errors } = useForm()
    // console.log(order);
    return (
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{labels[name]}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {name === "pay" ? (
            <span className="">{getPay(charge.pay)}</span>
          ) : name === "receipt" ? (
            <span>{getReceipt()}</span>
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

const getReceipt = () => (
  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
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
        <button
          type="button"
          className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Download
        </button>
      </div>
    </li>
  </ul>
)

