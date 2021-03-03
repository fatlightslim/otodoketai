import Image from "next/image"
import { useRouter } from "next/router"
import useSWR from "swr"
import { fetchGetJSON } from "../../utils/api-helpers"
import { SolidCheck } from "../../components/Svg"
import Layout from "../../components/Layout"
import { useEffect } from "react"
import { getImageFields } from "../../utils/contentful"

export default function Detail(props) {
  const router = useRouter()

  const { data, error } = useSWR(
    router.query._id ? `/api/orders/${router.query._id}` : null,
    fetchGetJSON
  )
  // useEffect(() => {
  //   if (!router.query._id) {
  //     router.replace("/")
  //   }
  // }, [data])

  if (!data) return <></>
  // console.log(data)
  const { charge, customer, items, log, _id, _ts } = data

  return (
    <Layout {...props}>
      <div className="bg-gray-100 antialiased">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                ご注文ありがとうございます。
              </h2>
              <p className="mt-4 text-xl text-gray-600 uppercase">
                注文番号: #{_id.substr(18)}
              </p>
              <p className=" text-xl text-gray-600 uppercase">
                注文日: {new Date(_ts).toLocaleString().replace(/,.*$/, "")}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                      注文概要
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <Items {...data} />

                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                        ご注文後の流れ
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                      {[
                        "注文確認メールをお送りいたしました。",
                        // "配送手配が完了後、出荷メールをお送りします。",
                        "よみうり新聞スタッフがご自宅までお届けします。",
                      ].map((v, i) => {
                        return (
                          <li
                            key={v}
                            className="flex items-start lg:col-span-1"
                          >
                            <div className="flex-shrink-0">
                              <SolidCheck
                                className={`h-5 w-5 ${
                                  i === 0 ? "text-green-400" : "text-gray-400"
                                }`}
                              />
                            </div>
                            <p className="ml-1 mt-0.5 font-bold text-xs text-gray-500">
                              {v}
                            </p>
                          </li>
                        )
                      })}

                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <SolidCheck className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="ml-1 mt-0.5 font-bold text-xs text-gray-500">
                          {log[1].status === "cod"
                            ? "料金はお届け時に配達スタッフにお渡しください。"
                            : "お支払い済みです。お届けまでお待ちください。"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  {/* <p className="text-lg leading-6 font-medium text-gray-900"> */}
                  {/* {pay} */}
                  {/* </p> */}
                  {/* <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900"> */}
                  {/* <span className="text-4xl font-medium">&yen;</span> */}
                  {/* <span>{parseInt(price).toLocaleString()}</span> */}
                  {/* </div> */}
                  <div className="mt-2">
                    <div className="rounded-md shadow">
                      {/* <a
                        target="_blank"
                        href={`mailto:hello@fatlightslim.com?subject=購入後のお問い合わせ #${client_reference_id
                          .substr(18)
                          .toUpperCase()}`}
                        className="relative focus:z-40 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                      >
                        お問い合わせ
                      </a> */}
                      <p className="relative focus:z-40 flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
                        領収書をダウンロード
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <PrintObject content={data ?? "loading..."} /> */}
    </Layout>
  )
}

function Items({ items, charge }) {
  return (
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
                    <p className="font-normal text-gray-500">x {quantity}</p>
                  </div>
                  {/* <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>
                          Closing on
                          <time dateTime="2020-01-07">January 7, 2020</time>
                        </p>
                      </div>
                    </div> */}
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
  )
}

// function Total({charge}) {
//  return (
//  )
// }
