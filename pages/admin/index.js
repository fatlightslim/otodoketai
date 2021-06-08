import { getImageFields } from "../../utils/contentful"
import Image from "next/image"
import { CheckCircleIcon, ChevronRightIcon, LinkIcon } from '@heroicons/react/solid'
import { getDataFromContentful } from "../../utils/contentful"
import Layout from "../../components/admin/AdminLayout"
import OrderList from "../../components/admin/OrderList"
import isToday from "date-fns/isToday"

// stats, seo, orders,
export default function Admin({ data, shops }) {
  console.log(shops);
  return (
    <Layout>
      <Stats data={data} />
      {/* <h3 className="mt-4 py-4 px-2">
        {data.length > 0 ? "本日配達の注文一覧" : "本日配達の注文はありません"}
      </h3> */}
      <OrderList orders={data} />
      <h3 className="mt-4 py-4 px-2">
        本日の発注書一覧
      </h3>
      <PoList shops={shops.items} />
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
    props: { data: today, shops: await getDataFromContentful("shop") },
  }
}




function PoList({ shops }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {shops.map((v) => {
          const { sys, fields } = v
          const { name, pickup, image, slug } = fields
          return <li key={sys.id}>
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12">
                    <Image className=""  {...getImageFields(image)} />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <LinkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <a className="truncate" href={`/shops/${slug}`} target="_blank">{slug}</a>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      {pickup && <div>
                        <p className="text-sm text-gray-900">
                          ピックアップ時間
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                          {pickup.am}
                          <CheckCircleIcon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                          {pickup.pm}
                        </p>
                      </div>}
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}
