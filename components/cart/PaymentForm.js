import { fetchPostJSON } from "../../utils/api-helpers"
import { useState } from "react"
import { Spin, ChevRight } from "../Svg"
import { loadStripe } from "@stripe/stripe-js"
import CartDetail from "./CartDetail"
import { useCart } from "react-use-cart"

const feeList = [
  { key: "1万円以下", value: "300円" },
  { key: "3万円以下", value: "400円" },
  { key: "10万円以下", value: "1,000円" },
  { key: "50万円以下", value: "2,000円" },
  { key: "60万円以下", value: "6,000円" },
]

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

export default function PaymentForm(props) {
  const { labels, setForm, form, pay, setPay, charge } = props
  const [loading, setLoading] = useState(false)
  const { items } = useCart()

  const handleClick = async () => {
    setLoading(true)
    labels[1]["label"] === pay
      ? setForm({ key: "CONFIRM", value: form.value })
      : createStripeSession()
  }

  const createStripeSession = async () => {
    items.push({fields: {title: "配送料", price: charge.delivery}, sys: {id: "delivery"}, quantity: 1})
    // Get Stripe.js instance
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    const session = await fetchPostJSON("/api/sessions", {
      url: window.location.origin,
      client_reference_id: form.value._id,
      customer_email: form.value.customer.email,
      metadata: {
        ...charge, pay
      },
      line_items: items.map((v) => {
        const { title, price, image } = v.fields
        return {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
              images: image ? ["https:" + image.fields.file.url] : [],
            },
            unit_amount: price,
          },
          quantity: v.quantity,
        }
      }),
    })

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      setLoading(false)
      alert(
        "ネットワーク接続に問題が発生しました。更新して再度お試しください。" +
          result.error.message
      )
    }
  }

  const Fee = () => (
    <div className="py-8">
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50 text-sm font-thin">
          <tr>
            <th className="pt-1">代引金額</th>
            <th className="pt-1">代引手数料（税別）</th>
          </tr>
        </thead>
        <tbody className="text-sm text-right divide-y dosis">
          {feeList.map((v) => {
            const className = { className: "pr-12 py-2 whitespace-nowrap" }
            return (
              // TODO: hilight current fee
              <tr key={v.key}>
                <td {...className}>{v.key}</td>
                <td {...className}>{v.value}</td>
              </tr>
            )
          })}

          <tr className="text-center">
            <td colSpan={2} className="px-4 py-2">
              60万円超は10万円増す毎に1,000円を加算
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const Fieldset = () => (
    <fieldset className="">
      <legend className="sr-only">Payment form</legend>
      <div className="bg-white rounded-md -space-y-px">
        {labels.map((v, i) => {
          const on = pay === v.label
          return (
            <div
              key={v.label}
              className={`${
                on ? "bg-indigo-50 border-indigo-200 z-10" : "border-gray-200"
              } ${
                i === labels.length - 1
                  ? "border-gray-200 rounded-bl-md rounded-br-md"
                  : "rounded-tl-md rounded-tr-md"
              } relative border  p-4 flex`}
            >
              <div className="flex items-center h-5">
                <input
                  id={v.label}
                  name="payment_method"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
                  defaultChecked={on}
                  onClick={() => {
                    setPay(v.label)
                  }}
                />
              </div>
              <label
                htmlFor={v.label}
                className="ml-3 flex flex-col cursor-pointer"
              >
                <span
                  className={`${
                    on ? "text-indigo-900" : "text-gray-900"
                  } block text-sm font-medium`}
                >
                  {v.label}
                </span>
                <span
                  className={`${
                    on ? "text-indigo-700" : "text-gray-500"
                  } block text-sm`}
                >
                  {v.desc}
                </span>
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )

  const Actions = () => (
    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
      <div className="rounded-md shadow">
        <button
          onClick={() => handleClick()}
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          {loading && <Spin className="animate-spin -ml-4 h-5 w-5 text-white" />}
          {labels[1]["label"] === pay ? "注文確認画面" : "決済情報確認"}
          <ChevRight />
        </button>
      </div>
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
        <button
          onClick={() => setForm({ key: "ORDER", value: form.value })}
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
        >
          戻る
        </button>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 ">
      <div className="relative hidden sm:block border-r p-8">
        <CartDetail {...props} />
      </div>
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center py-12 font-bold text-gray-600">
          お支払い方法を選択してください。
        </h3>
        <Fieldset />
        {/* {labels[1]["label"] === pay ? <Fee /> : null} */}
        <Actions />
      </div>
    </div>
  )
}
