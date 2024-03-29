import Image from "next/image"
import { ExCircle, SolidCheck, X } from "../Svg"
import { getImageFields } from "../../utils/contentful"
import { fetchPostJSON } from "../../utils/api-helpers"
import { useCart } from "react-use-cart"

export default function CartDetail(props) {
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-center py-6 font-bold"></h3>
      <Summary {...props} />
      {/* <Coupon {...props} /> */}
      <Total {...props} />
    </div>
  )
}

const Total = ({ pay, coupon, labels, charge }) => {
  const { total, delivery, subTotal } = charge
  // const discount = coupon.amount_off || 0

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-left py-4 mt-4 px-2 text-xs leading-5">
        <div className="grid grid-cols-2">
          <p>小計</p>
          <p className="text-right mr-2 font-semibold text-sm">
            &yen;{subTotal.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <p>配送料</p>
          <p className="text-right mr-2 font-semibold">
            &yen;{delivery.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-300" />

      <div className="text-left py-4 px-2 grid grid-cols-2 text-sm font-bold">
        <p>合計</p>
        <p className="text-right mr-2 text-sm">
          &yen;
          {total.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

const Summary = ({ dateNumber }) => {
  const { items, removeItem } = useCart()

  return (
    <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 ">
      {items.map((v) => {
        const { fields, holidays, sys } = v
        const { title, image, price } = fields
        return (
          <div
            key={v.sys.id}
            className={`${
              holidays &&
              holidays.includes(dateNumber) &&
              "border border-red-500"
            } p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50 transition ease-in-out duration-150`}
          >
            {holidays && holidays.includes(dateNumber) && (
              <>
                <div className="text-red-500 absolute z-10 -mt-6 font-bold bg-white">
                  
                </div>
                <button
                  className="absolute mt-16 text-red-500 bg-white text-sm"
                  onClick={(e) => removeItem(sys.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 inline-block"
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
                  <span className="ml-1">削除する</span>
                </button>
              </>
            )}
            <div className="flex ">
              <div className="flex-shrink-0">
                {image && image.fields ? (
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white text-white sm:h-12 sm:w-12">
                    <Image {...getImageFields(image)} />
                  </div>
                ) : (
                  <img
                    className="h-10 w-10"
                    src="http://placehold.jp/24/cccccc/ffffff/200x200.png?text=撮影中"
                  />
                )}
              </div>
              <div className="ml-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    &yen;{price.toLocaleString()} x {v.quantity}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 flex-grow text-right">
                &yen;{(price * v.quantity).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 w-full border-t border-gray-300" />
          </div>
        )
      })}
    </div>
  )
}

const Coupon = ({ coupon, setCoupon }) => {
  const COUPON_SET = coupon.name !== undefined

  const getCoupnFromStripe = async () => {
    const r = await fetchPostJSON("/api/coupon", { id: coupon.id })
    const update = r.statusCode === 404 ? { name: "error" } : r
    setCoupon(update)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="inline-flex w-full">
        <label htmlFor="coupon" className="sr-only">
          Coupon
        </label>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="mt-1 flex rounded-md shadow-sm w-full"
        >
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              disabled={COUPON_SET && coupon.name !== "error"}
              type="text"
              name="coupon"
              id="coupon"
              className="focus:ring-indigo-500 focus:border-indigo-500 block rounded-none rounded-l-md w-full sm:text-sm border-gray-300 "
              placeholder="クーポン"
              value={coupon.id}
              onChange={(e) => setCoupon({ id: e.target.value })}
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {COUPON_SET && <Icon name={coupon.name} />}
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              getCoupnFromStripe()
            }}
            className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            適用
          </button>
        </form>
      </div>
    </div>
  )
}

const Icon = ({ name }) => {
  return name === "error" ? (
    <ExCircle className="h-5 w-5 text-red-500" />
  ) : (
    <SolidCheck className="h-5 w-5 text-green-400" />
  )
}
