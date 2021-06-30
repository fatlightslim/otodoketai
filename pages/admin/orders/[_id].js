import Layout from "../../../components/admin/AdminLayout"
import AdminForm from "../../../components/admin/AdminForm"
import OrderDetails from "../../../components/admin/OrderDetails"

const groupBy = (array, getKey) =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src)
      const list = map.get(key)
      if (list) list.push(cur)
      else map.set(key, [cur])
      return map
    }, new Map())
  )

const labels = {
  sent_order_confirm: "配送待ち",
  sent_tracking: "配送中",
  cod: "配送待ち",
  draft: "未確定",
  name: "名前",
  addr: "住所",
  email: "メール",
  tel: "TEL",
  pay: "決済方法",
  date: "配達日",
  time: "配達時間",
  cancel: "キャンセル",
}

export default function AdminOrder({ order }) {
  const { items, log, customer, _id, _ts, charge } = order
  const result = groupBy(items, (item) => item.shopName).map(
    ([shop, items]) => ({
      shop,
      orders: items,
    })
  )
  const address = customer.zip + " " + customer.addr1 + customer.addr2

  return (
    <Layout order={order}>
      <div className="">
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
      <AdminForm order={order} result={result} />

      {/* <OrderDetails order={order} /> */}
      <Log {...order} />
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { params } = context
  const url = process.env.URL || "http://localhost:3000"
  const res = await fetch(url + "/api/orders/" + params._id)
  const data = await res.json()

  return {
    props: { order: data }, // will be passed to the page component as props
  }
}

const Log = ({ log }) => {
  // const { log } = order
  return (
    <div className="">
      <h3 className="py-6 font-bold">履歴</h3>
      <div className="flow-root bg-gray-50  px-4 py-8 rounded-md">
        <ul className="-mb-8">
          {log
            // .sort((a, b) => {
            //   return a._ts < b._ts ? 1 : -1
            // })
            .map((v, i) => {
              const check = [
                "draft",
                "awaiting_payment",
                "sent_order_confirm",
                "sent_tracking",
                "cancel",
              ]
              const failure = ["sent_failure", "payment_failed"]
              const thumbsUp = ["done", "sent_tracking", "paid", "done"]
              const icon = check.includes(v.status) ? (
                <SolidCheck2 />
              ) : failure.includes(v.status) ? (
                <Close />
              ) : (
                <ThumbsUp />
              )
              return (
                <li key={v._ts}>
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
                          <p className="text-sm text-gray-500">
                            {labels[v.status]}
                          </p>
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
}

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

