import Logo from "../Logo"
import { CartSvg } from "../Svg"
import { Transition } from "@headlessui/react"
import { useState } from "react"
import CartDetail from "./CartDetail"
import { useCart } from "react-use-cart";

const Chev = ({ isOpen }) => (
  <svg
    className="w-6 h-6 inline-block text-indigo-500 ml-1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d={
        isOpen
          ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      }
      clipRule="evenodd"
    />
  </svg>
)

export default function CartBar(props) {
  const { total } = props.charge
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="py-1 bg-black bg-opacity-80 text-center">
        <Logo className="text-gray-50" />
      </div>

      <div className="z-0 relative sm:hidden">
        <div className="relative z-10 bg-gray-50 bg-opacity-80 text shadow">
          <div className="max-w-7xl mx-auto flex px-4 py-6 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="font-semibold text-indigo-500 text-sm inline-flex items-center focus:ring-transparent focus:outline-none"
            >
              <CartSvg />
              <span className="">
                {isOpen ? "注文概要を非表示にする" : "注文概要"}
              </span>
              <Chev isOpen={isOpen} />
            </button>
            <span className="font-medium flex-grow text-right">
              &yen;{total.toLocaleString()}
            </span>
          </div>
        </div>

        <Transition
          show={isOpen}
          className="relative z-10 inset-x-0 transform shadow-lg border"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <CartDetail {...props} />
        </Transition>
      </div>
    </>
  )
}
