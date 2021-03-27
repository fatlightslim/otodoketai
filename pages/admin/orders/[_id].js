import Layout from "../../../components/admin/AdminLayout"
import { getImageFields } from "../../../utils/contentful"
import Image from "next/image"
import { SolidCheck } from "../../../components/Svg"

const labels = {
  sent_order_confirm: "配送待ち",
  cod: "配送待ち",
  draft: "Draft",
}

export default function AdminOrder({ order }) {
  const { log, customer, _id, _ts, charge } = order
  // console.log(customer)
  // console.log(order)
  // const data = []
  // Object.keys(customer).forEach((v) => {
  //   data.push({ [v]: customer[v] })
  // })
  const address = customer.zip + " " + customer.addr1 + customer.addr2

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

  const Field = ({ name }) => {
    return (
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{name}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span className="">
            {name === "addr"
              ? address
              : name === "pay"
              ? getPay(charge.pay)
              : name === "receipt"
              ? getReceipt()
              : customer[name]}
          </span>
        </dd>
      </div>
    )
  }

  return (
    <Layout order={order}>
      <div>
        <h3 className="text-lg leading-6 text-gray-900 uppercase font-bold">
          #{_id.substr(18)}
          <span className="ml-2 align-top inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {labels[log[log.length - 1].status]}
          </span>
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          注文日: {new Date(_ts).toLocaleString()}
        </p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <Field name="name" />
          <Field name="addr" />
          <Field name="email" />
          <Field name="tel" />
          <Field name="pay" />
          <Field name="receipt" />
        </dl>
      </div>

      <OrderDetails {...order} />
      <Log {...order} />
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { params } = context
  const res = await fetch("http://localhost:3000/api/orders/" + params._id)
  const data = await res.json()

  return {
    props: { order: data }, // will be passed to the page component as props
  }
}

const Log = ({ log }) => (
  <div className="">
    <h3 className="py-6 font-bold">履歴</h3>
    <div className="flow-root bg-gray-50  px-4 py-8 rounded-md">
      <ul className="-mb-8">
        {log.reverse().map((v, i) => {
          const check = [
            "draft",
            "awaiting_payment",
            "sent_order_confirm",
            "sent_shipping",
          ]
          const failure = ["sent_failure", "payment_failed"]
          const thumbsUp = ["done", "shipping", "paid", "done"]
          const icon = check.includes(v.status) ? (
            <SolidCheck2 />
          ) : failure.includes(v.status) ? (
            <Close />
          ) : (
            <ThumbsUp />
          )
          return (
            <li key={v.status}>
              <div className="relative pb-8">
                {log.length - 1 === i ? null : (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>{icon}</div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">{v.status}</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={v._ts}>{v._ts.toLocaleString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

const OrderDetails = ({ items, charge }) => (
  <div className="relative">
    {/* <div className="absolute inset-0 h-1/2 bg-gray-100" /> */}

    <h3 className="pt-6 font-bold">注文概要</h3>
    <div className="mx-auto rounded-lg  overflow-hidden ">
      <div className="flex-1 bg-white py-8 ">
        <div className="flex items-center">
          {/* <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
            注文概要
          </h4> */}
          <div className="flex-1 border-t-2 border-gray-100" />
        </div>

        <ul className="divide-y divide-gray-200">
          {items.map((v) => {
            const { fields, sys, quantity } = v
            const { title, price, image } = fields
            return (
              <li key={sys.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm font-medium text-gray-800 truncate items-center">
                        <div className="w-6 h-6">
                          <Image
                            {...getImageFields(image)}
                            className="rounded-sm"
                          />
                        </div>
                        <p className="mx-2">{title}</p>
                        <p className="font-normal text-gray-500">
                          x {quantity}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0">
                      <div className="flex overflow-hidden">
                        &yen;{(price * quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}

          <li>
            <div className="px-4 pt-4 flex items-center sm:px-6">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex text-sm font-medium text-gray-800 truncate items-center">
                    配送料
                  </div>
                </div>
              </div>
              <div className="mt-4 flex-shrink-0 sm:mt-0">
                <div className="flex overflow-hidden">
                  &yen;{charge.delivery.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="px-4 py-4 flex items-center sm:px-6">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex text-sm font-medium text-gray-800 truncate items-center">
                    合計(税込)
                  </div>
                </div>
              </div>
              <div className="mt-4 flex-shrink-0 sm:mt-0">
                <div className="flex overflow-hidden">
                  &yen;{charge.total.toLocaleString()}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

const SolidUser = () => (
  <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  </span>
)

const SolidCheck2 = () => (
  <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </span>
)

const ThumbsUp = () => (
  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
    </svg>
  </span>
)

const Close = ({ ...props }) => (
  <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
    <svg
      className=" text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
)
