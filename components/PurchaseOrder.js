import React from "react"

export default class PurchaseOrder extends React.Component {
  render() {
    const { items, charge, _ts, _id } = this.props.order
    console.log(this.props.order);
    return (
      <section className="py-12 px-8">
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
          <p className="mt-4">
            <span className="text-4xl font-extrabold text-gray-900">
              {/* &yen;{charge.total.toLocaleString()}&nbsp;- */}

            </span>
            <span className="text-xs text-gray-500 float-right text-right">
              {process.env.company.ja}
              <br />
              {process.env.company.address}
              <br />
              {process.env.company.tel}
            </span>
          </p>
        </div>
        <table className="w-full">
          <caption className="bg-gray-50 border-t border-gray-200 py-4 px-4 text-sm font-medium text-gray-900 text-left">
            注文概要
          </caption>
          <tbody className="divide-y divide-gray-200">
            {items.map((v) => {
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
                小計
              </th>
              <td className="py-4 pr-4 text-right">
                &yen;{charge.subTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            {charge.discount > 0 && (
              <tr  className="border-t border-gray-200">
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
    )
  }
}
