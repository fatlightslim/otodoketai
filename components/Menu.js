import Image from "next/image"
import { getImageFields } from "../utils/contentful"
import { Plus, Minus } from "./Svg"
import { useCart } from "react-use-cart"

export default function Menu({ menu, setCartOpen, name }) {
  const shopName = name
  const { addItem } = useCart()

  // const Counter = ({ icon }) => {
  //   return icon === "minus" ? (
  //     <Minus className="w-5 h-5 mr-2" />
  //   ) : (
  //     <Plus className="w-5 h-5 ml-2" />
  //   )
  // }

  // const randomize = (max, min) => {
  //   return Math.floor(Math.random() * (max - min)) + min
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              メニュー
            </h2>
            <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900 h-8">
              たまには、いいよね？
              <span id="copy" className="block sm:inline-block" />
            </p>
            {/* <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p> */}
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {menu.map((v) => {
          const { fields, sys } = v
          const { title, price, image } = fields
          return (
            <li
              key={sys.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <div className="w-32 h-32 flex-shrink-0 mx-auto ">
                  {/* <Image {...getImageFields(image)} className="rounded-md" /> */}

                  {image && image.fields ? (
                    <Image {...getImageFields(image)} className="rounded-md" />
                  ) : (
                    <img
                      className="rounded-md"
                      src="http://placehold.jp/24/cccccc/ffffff/200x200.png?text=撮影中"
                    />
                  )}
                </div>
                <h3 className="mt-6 text-gray-900 text-sm font-medium">
                  {title}
                </h3>
                {/* <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 text-sm">
                    Paradigm Representative
                  </dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      Admin
                    </span>
                  </dd>
                </dl> */}
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <span className="relative -mr-8 w-0 flex-1 inline-flex items-center justify-center py-4 text-lg text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                      &yen;{price.toLocaleString()}
                    </span>
                    {/* <span className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-lg text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                      <Counter icon="minus" />
                      1
                      <Counter icon="plus" />
                    </span> */}
                    {/* </div>
                  <div className="-ml-px w-0 flex-1 flex"> */}
                    <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center">
                      <button
                        onClick={() => {
                          addItem(
                            {
                              id: sys.id, // required for cart
                              price: fields.price, // required for cart
                              fields, // for DB
                              sys, // for DB
                              shopName,
                            },
                            1 // quantity, required for both DB and Cart
                          )
                          setCartOpen(true)
                        }}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        カートに追加
                      </button>
                    </div>

                    {/* <button
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="ml-3">Call</span>
                    </button> */}
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
