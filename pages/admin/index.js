import Layout from "../../components/admin/AdminLayout"
import OrderList from "../../components/admin/OrderList"
import isToday from "date-fns/isToday"

// stats, seo, orders,
export default function Admin({ data }) {
  return (
    <Layout>
      <Stats data={data} />
      <h3 className="mt-4 py-4 px-2">
        {data.length > 0 ? "本日配達の注文一覧" : "本日配達の注文はありません"}
      </h3>
      <OrderList orders={data} />
    </Layout>
  )
}

const Stats = ({ data }) => {
  let count = 0
  let sales = 0
  data.forEach((v) => {
    v.items.forEach((x) => {
      count += x.quantity
      sales += (x.quantity * x.fields.price)
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
          <dd className="mt-1 text-3xl font-semibold text-gray-900">&yen;{sales.toLocaleString()}</dd>
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
      isToday(new Date(v.customer.date)) &&
      v.log.slice(-1)[0]["status"] !== "draft"
  )
  return {
    props: { data: today },
  }
}
