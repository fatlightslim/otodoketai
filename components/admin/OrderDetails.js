import { useCart } from "react-use-cart"
import { getImageFields } from "../../utils/contentful"
import { useState, useRef, Component } from "react"
import Image from "next/image"

export default function OrderDetails({ charge }) {
  return (
    <div className="relative">
      {/* <div className="absolute inset-0 h-1/2 bg-gray-100" /> */}

      <h3 className="pt-6 font-bold">注文概要</h3>
      <div className="mx-auto rounded-lg  overflow-hidden ">
        <div className="flex-1 bg-white py-8 ">
          <div className="flex items-center">
            {/* <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
            注文概要
          </h4> */}
            <div className="flex-1 border-t-2 border-gray-100">
              <List charge={charge} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function List({ charge }) {
  const { items, updateItemQuantity, cartTotal } = useCart()
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
                      {image && image.fields ? (
                        <Image
                          {...getImageFields(image)}
                          className="rounded-sm"
                        />
                      ) : (
                        <img
                          className="rounded-md"
                          src="http://placehold.jp/24/cccccc/ffffff/200x200.png?text=撮影中"
                        />
                      )}
                    </div>
                    <p className="mx-2">{title}</p>
                    <p className="font-normal text-gray-500">
                      {/* x  */}
                      <span className="pl-1 mr-4 inline-block">
                        <button onClick={() => updateItemQuantity(sys.id, quantity+1)}>+</button>
                        <span className="px-2">{quantity}</span>
                        <button onClick={() => updateItemQuantity(sys.id, quantity-1)}>-</button>
                      </span>
                    </p>
                  </div>
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
