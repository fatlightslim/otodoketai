import React from "react"

export default class PurchaseOrder extends React.Component {
  render() {
    const { _id, _ts, charge, customer } = this.props.order
    return <div className="print-container" style={{ margin: "0", padding: "0" }}>
      {this.props.items.map((v) => {
        const { shop, orders } = v
        return (
          <>
            <div className="page-break" />
            <section key={v.shop} className="py-12 px-8 border-b border-dotted">
              <div className="px-4 mb-8">
                <h2 className="text-xl leading-6 font-medium text-gray-900">
                  発注書
                  <span className="ml-2 uppercase text-sm text-gray-500">
                    #{_id.substr(18)}
                  </span>
                  <span className="text-sm text-gray-700 float-right">
                    {new Date(_ts).toLocaleDateString()}
                  </span>
                </h2>
                <h3> {shop} 様</h3> 
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
                    const { title, price } = fields
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
                          &yen;{(price * quantity).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}

                  <tr className="bg-gray-50 border-t border-gray-200 font-medium text-gray-900 text-left">
                    <th
                      className="py-4 px-4 text-sm font-medium text-left"
                      scope="row"
                    >
                      お届け日時
                    </th>
                    <td className="py-4 pr-4 text-right">
                      {/* &yen;{charge.subTotal.toLocaleString()} */}
                      {new Date(customer.date).toLocaleDateString()}&nbsp;{customer.time}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {charge.discount > 0 && (
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
                  )}
                  {/*
            <tr  className="border-t border-gray-200">
              <th
                className="py-5 px-4 text-sm font-normal text-left"
                scope="row"
              >
                配送料
              </th>
              <td className="py-5 pr-4 text-right">
                &yen;{charge.delivery.toLocaleString()}
              </td>
            </tr> */}

                  <tr className="bg-gray-50 border-t border-b border-gray-200 font-medium text-gray-900 text-left">
                    <th
                      className="py-4 px-4 text-sm font-medium text-left"
                      scope="row"
                    >
                      合計(税込)
                    </th>
                    <td className="py-4 pr-4 text-right">
                      &yen;{(charge.total - charge.delivery).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )
      })}
    </div>
  }
}
