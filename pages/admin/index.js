import { useState, useEffect } from "react"
import Layout from "../../components/admin/AdminLayout"
import OrderList from "../../components/admin/OrderList"
import { isToday, addDays, isSameDay, format, subDays } from "date-fns"
import PoList from "../../components/admin/PoList"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
} from "@heroicons/react/solid"

// stats, seo, orders,
export default function Admin({ data }) {
  const [poDate, setPoDate] = useState(new Date())
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const orderList = data.filter((v) => {
      return isSameDay(new Date(v.customer.date), poDate)
    })
    setOrderList(orderList)
  }, [poDate])

  return (
    <Layout>
      <Stats data={orderList} />
      {/* <h3 className="mt-4 py-4 px-2">
        {data.length > 0 ? "本日配達の注文一覧" : "本日配達の注文はありません"}
      </h3> */}
      <OrderList orders={orderList} />
      <h3 className="mt-4 py-4 px-2 inline-block text-xl mr-1.5">
        {format(poDate, "MM/dd (eee)")}の発注書一覧
      </h3>
      {!isToday(new Date(poDate)) && (
        <button
          onClick={() => setPoDate(subDays(poDate, 1))}
          type="button"
          className="mr-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {/* <ChevronLeftIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" /> */}
          前日
        </button>
      )}
      <button
        onClick={() => setPoDate(addDays(poDate, 1))}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        翌日
        <ChevronRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
      </button>
      <div className="pb-8">
        <PoList data={orderList} poDate={poDate} />
      </div>
    </Layout>
  )
}

const Stats = ({ data }) => {
  let count = 0
  let sales = 0
  data.forEach((v) => {
    v.items.forEach((x) => {
      count += x.quantity
      sales += x.quantity * x.fields.price
    })
  })
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            本日の注文件数
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {data.length}
          </dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            本日の売上
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            &yen;{sales.toLocaleString()}
          </dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            本日の注文商品数
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{count}</dd>
        </div>
      </dl>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const url = process.env.URL || "http://localhost:3000"
  const res = await fetch(`${url}/api/orders`)
  const data = await res.json()

  const today = data.filter(
    (v) =>
      // isToday(new Date(v.customer.date)) &&
      v.log.slice(-1)[0]["status"] !== "draft"
  )
  return {
    props: { data: today },
  }
}
