import { X, Home, Question, ExCircle, Cog } from "../../components/Svg"
import { Transition } from "@headlessui/react"
import Logo from "../Logo"
import Link from "next/link"

function Menu({ isMobile }) {
  /* Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */
  return menu.map((v) => {
    return v.url ? (
      <Link key={v.name} href={`/admin${v.url}`}>
        <a
          className={
            isMobile
              ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm"
          }
        >
          <v.icon />
          {v.name}
        </a>
      </Link>
    ) : (
      <a
        key={v.name}
        href="#"
        className={
          isMobile
            ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
            : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm"
        }
      >
        <v.icon />
        {v.name}
      </a>
    )
  })
}
const menu = [
  {
    name: "ダッシュボード",
    url: "/",
    icon: () => (
      <Home className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
    ),
  },
  {
    name: "注文一覧",
    url: "/orders",
    icon: () => (
      <svg
        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  // {
  //   name: "店舗一覧",
  //   url: "/shops",
  //   icon: () => (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="text-gray-400 mr-3 h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  //       />
  //     </svg>
  //   ),
  // },
  {
    name: "注文入力",
    // url: "/orders/new",
    icon: () => (
      <svg
        className="text-gray-400 mr-3 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "集計",
    // url: "/stats",
    icon: () => (
      <svg
        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
]

export const MobileMenu = ({ setIsOpen, isOpen }) => {
  return (
    <div className="md:hidden">
      <div className={`${isOpen ? "z-40" : "z-0"} fixed inset-0 flex`}>
        <Transition
          show={isOpen}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0 "
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 "
          className="fixed inset-0"
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </Transition>
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col"
        >
          <div className="absolute top-0 right-0 -mr-14 p-1">
            <button
              onClick={() => setIsOpen(false)}
              className=" h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
            >
              <X />
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>
          <div className="flex-shrink-0 px-4 flex items-center">
            <Logo />
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="h-full flex flex-col">
              <div className="space-y-1">
                <Menu isMobile />
              </div>
              <div className="mt-auto pt-10 space-y-1">
                <a
                  href="#"
                  className="group rounded-md py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Question />
                  ヘルプ
                </a>
                <a
                  href="/api/auth/logout"
                  className="group rounded-md py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Cog className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  ログアウト
                </a>
              </div>
            </nav>
          </div>
        </Transition>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  )
}

export const DesktopMenu = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="w-64 flex flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <nav className="bg-gray-50 border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
        <div className="flex-shrink-0 px-4 flex items-center">
          <Logo />
        </div>
        <div className="flex-grow mt-5 flex flex-col">
          <div className="flex-1 space-y-1">
            <Menu />
          </div>
        </div>
        <div className="flex-shrink-0 block w-full">
          <a
            href="#"
            className="group py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Question className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
            ヘルプ
          </a>
          <a
            href="/api/auth/logout"
            className="group py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Cog className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
            ログアウト
          </a>
        </div>
      </nav>
    </div>
  </div>
)
