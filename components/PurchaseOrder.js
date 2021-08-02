import { Menu } from "@headlessui/react"
import React from "react"
import OrderForm from "./cart/OrderForm"
//import { getShopFromContentful,getShopFromContentfulByTitle } from "../utils/contentful"

export default class PurchaseOrder extends React.Component {
  render() {

    const { _id, _ts, charge, customer } = this.props.order
    
    console.log(this.props.items)

    return (
      <div className="print-container" style={{ margin: "0", padding: "0" }}>
        {this.props.items.map((v) => {
          var total = 0
          const { shop, orders } = v

          return (
            <div key={shop}>
              <div className="page-break" />
              <section key={v.shop} className="py-4 px-8  min-h-screen">
                <div className="px-4">
                  <h2 className="text-xl leading-6 font-medium text-gray-900">
                    発注書
                    <span className="ml-2 uppercase text-sm text-gray-500">
                      #{_id.substr(18)}
                    </span>
                    <span className="text-sm text-gray-700 float-right">
                      {new Date(_ts).toLocaleDateString()}
                    </span>
                  </h2>
                  <h3 className="py-2"> {
                    orders[0].poName
                    ? orders[0].poName
                    : shop
                  } 様</h3>
                  {orders[0].pickup && (
                    <h4 className="text-gray-500 text-xl">
                    {/* <h4 className="text-gray-500 text-sm"> */}
                      引き取り時間{" "}
                      {customer.time === "17:00 ~ 18:00"
                        ? orders[0].pickup.pm
                        : orders[0].pickup.am}
                    </h4>
                  )}
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {/* &yen;{charge.total.toLocaleString()}&nbsp;- */}
                    </span>
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
                    {orders.map((v) => {
                      const { fields, sys, quantity } = v
                      const { title, price, supplier, valuePrice } = fields

                      var shop_price = Math.round(
                        price * quantity - price * quantity * 0.1
                      )
                      if (shop === "萬福飯店") {
                        shop_price = Math.round((price * quantity) - 50 * quantity)
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

                      total += shop_price

                      return (
                        <tr key={sys.id} className="border-t border-gray-200">
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
                    {/* {charge.discount > 0 && (
                    <tr className="border-t border-gray-200">
                      <th
                        className="py-5 px-4 text-sm font-normal text-left"
                        scope="row"
                      >
                        割引
                      </th>
                      <td className="py-5 pr-4 text-right">
                        &yen;{charge.discount.toLocaleString()}
                      </td>
                    </tr>
                  )} */}

                    <tr className="bg-gray-50 border-t border-b border-gray-200 font-medium text-gray-900 text-left">
                      <th
                        className="py-4 px-4 text-sm font-medium text-left"
                        scope="row"
                      >
                        合計(税込)
                      </th>
                      {/* <td className="py-4 pr-4 text-right">
                      &yen;{(charge.total - charge.delivery ).toLocaleString()}
                    
                    </td> */}
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
                      <td className="py-4 pr-4 text-right">
                        {/* &yen;{charge.subTotal.toLocaleString()} */}
                        {new Date(customer.date).toLocaleDateString()}&nbsp;
                        {customer.time}
                      </td>
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
                            orders[0].poName
                            ? orders[0].poName
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
          )
        })}
      </div>
    )
  }
}
