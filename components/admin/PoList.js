import { useState, useRef, Component } from "react"
import { getImageFields } from "../../utils/contentful"
import ReactToPrint from "react-to-print"
import Image from "next/image"
import {
  CheckCircleIcon,
  ChevronRightIcon,
  LinkIcon,
} from "@heroicons/react/solid"
import PurchaseOrder from "../PurchaseOrder"

// const groupBy = require("lodash.groupby")
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

export default function PoList({ data, poDate }) {


  const orders = []
  data.forEach((v) => {
    v.items.forEach((x) => {
      x.time = v.customer.time
      x.customerName = v.customer.name
      x.customerRemark = v.customer.remark
    })
    orders.push(v.items)
  })



  const result = groupBy(orders.flat(), (item) => item.shopName).map(
    ([shop, items]) => ({
      shop,
      orders: items,
    })
  )
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {result.map((v, i) => {
          const { shop, orders } = v
          

          const am = []
          const pm = []
          orders.forEach((v) => {
            v.time === "17:00 ~ 18:00" ? pm.push(v) : am.push(v)
          })
          // const { name, pickup, image, slug } = fields

          var hasAM
          var hasPM
          return (
            <li key={i}>
              <div className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {shop}
                        </p>
                      </div>
                      <div className="block">
                        <div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            {am.length > 0 
                              ?hasAM = true
                              :hasAM = false
                            }
                            {pm.length > 0 
                              ?hasPM = true
                              :hasPM = false
                            }
                            <PrintAM
                              name="午前便"
                              {...v}
                              poDate={poDate}
                              data={am}
                              result={result}
                              hasData={hasAM}
                            />
                            <PrintAM
                              name="午後便"
                              {...v}
                              data={pm}
                              poDate={poDate}
                              result={result}
                              hasData={hasPM}
                            />
                            {/* {am.length > 0 && (
                              <PrintAM
                                name="午前便"
                                {...v}
                                poDate={poDate}
                                data={am}
                                result={result}
                              />
                            )}
                            {pm.length > 0 && (
                              <PrintAM
                                name="午後便"
                                {...v}
                                data={pm}
                                poDate={poDate}
                                result={result}
                              />
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PrintAM({ name, shop, data, poDate, hasData }) {
  const componentRef = useRef()
  
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button
            type="button"
            className="disabled:opacity-20 mr-4 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!hasData}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clipRule="evenodd"
              />
            </svg>
            {name}
          </button>
        )}
        content={() => componentRef.current}
      />
      <div className="absolute hidden ">
        <MergedPO items={data} shop={shop} ref={componentRef} poDate={poDate} />
      </div>
    </>
  )
}

class MergedPO extends Component {
  render() {
    const { shop, items, poDate } = this.props
    console.log("items")
    console.log(items)
    let total = 0
    return (
      items.length > 0 && (
        <div className="print-container" style={{ margin: "0", padding: "0" }}>
          <div key={shop}>
            <div className="page-break" />
            <section key={shop} className="py-4 px-8  min-h-screen">
              <div className="px-4">
                <h2 className="text-xl leading-6 font-bold text-gray-900">
                  発注書
                  <span className="ml-2 uppercase text-sm text-gray-500">
                    {/* #{_id.substr(18)} */}
                  </span>
                  <span className="text-sm text-gray-700 float-right">
                    {new Date(poDate).toLocaleDateString()}
                  </span>
                </h2>
                {/* <h3 className="py-2"> {shop} 様</h3> */}
                <h3 className="py-2"> {
                    items[0].poName
                    ? items[0].poName
                    : shop
                } 様</h3>
                {items[0].pickup && (
                  <h4 className="text-gray-500 text-xl">
                  {/* <h4 className="text-gray-500 text-sm"> */}
                    引き取り時間
                    {items[0].time === "17:00 ~ 18:00"
                      ? items[0].pickup.pm
                      : items[0].pickup.am}
                  </h4>
                )}
                <p className="mt-4">
                  <span className="text-xs text-gray-500 float-right text-right">
                    読売お届け隊
                    <br />
                    〒283-0063 千葉県東金市堀上５６−４
                    <br />
                    0475-52-2240
                  </span>
                </p>
              </div>
              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-4 px-4 text-sm font-medium text-gray-900 text-left">
                  注文概要
                </caption>
                <tbody className="divide-y divide-gray-200">
                  {items.map((v, i) => {
                    const { fields, sys, quantity } = v
                    const { title, price, supplier, valuePrice } = fields

                    var shop_price = Math.round(
                      price * quantity - price * quantity * 0.1
                    )
                    if (shop === "萬福飯店") {
                      shop_price = ( Math.round((price * quantity) - 50 * quantity))
                    }

                    if (shop === "よみうりギョーザ") {
                      shop_price = Math.round(price * quantity)
                    }
                    if (shop === "YC東金中央　食品事業部") {
                      if (title === "コシヒカリ（白米）（5ｋg）") {
                        shop_price = Math.round(
                          price * quantity - price * quantity * 0.1
                        )
                      } else {
                        shop_price = Math.round(price * quantity)
                      }
                    }
                    
                    if (shop === "お買い物サポート") {
                      if (supplier === "道の駅みのりの郷東金"){
                        shop_price = Math.round(price * quantity + valuePrice * quantity - price * quantity)
                      }
                    }
                    if (shop === "塩田水産") {
                      shop_price = Math.round(price * quantity + valuePrice * quantity - price * quantity)
                    }
                  
                    if (shop === "唐揚げ本舗だるま") {
                    shop_price = Math.round(price * quantity + valuePrice * quantity - price * quantity)
                    }

                    total += shop_price

                    return (
                      <tr key={i} className="border-t border-gray-200">
                        <th
                          className="py-5 px-4 text-sm font-normal text-left"
                          scope="row"
                        >
                          {title}
                          <span className="text-gray-500">
                            <span className="ml-2 ">
                              &yen;{price.toLocaleString()}
                            </span>
                            <span className="px-1">x</span>
                            {quantity}
                          </span>
                          <p>{items[i].customerName} 様にお届け</p>
                          <p>注意事項 {items[i].customerRemark}</p>                                              
                        </th>
                        <td className="py-5 pr-4 text-right">
                          &yen;{shop_price.toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50 border-t border-b border-gray-200 font-medium text-gray-900 text-left">
                    <th
                      className="py-4 px-4 text-sm font-medium text-left"
                      scope="row"
                    >
                      合計(税込)
                    </th>
                    <td className="py-4 pr-4 text-right">
                      &yen;{total.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-white border-t border-gray-200 font-medium text-gray-900 text-left">
                    <th
                      className="py-4 px-4 text-sm font-medium text-left"
                      scope="row"
                    >
                      お届け日時
                    </th>
                    <td className="py-4 pr-4 text-right">{items[0].time}</td>
                  </tr>
                </tbody>
              </table>
              <div className="my-20">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p className="mt-5">
                            <span className="text-2xl ">

                              合計(税込)
                              &yen;{total.toLocaleString()}
                            </span>
                          </p>
                          <p>
                          上記金額を受領いたしました。
                          </p>
                        </td>
                        <td>
                          <p>
                          　　　　　年　　　　月　　　日(　　)
                          </p>
                          <div className=" border-gray-200 border rounded p-20 pt-0 pl-2 text-left ">
                            
                            ご署名または印
                          </div>
                          <p className=" text-center">
                          {/* {shop}様 */}
                          {
                            items[0].poName
                            ? items[0].poName
                            : shop
                          } 様
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </section>
          </div>
        </div>
      )
    )
  }
}
