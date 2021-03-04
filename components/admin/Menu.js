import { X, Home, Question, ExCircle, Cog } from "../../components/Svg"

function Menu({ isMobile }) {
  /* Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */
  return menu.map((v) => {
    return (
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
    name: "Dashboard",
    icon: () => (
      <Home className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
    ),
  },
  {
    name: "Orders",
    icon: () => (
      <svg
        className="mr-3 h-6 w-6 text-purple-400 group-hover:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    name: "useer",
    icon: () => (
      <svg
        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    name: "setting",
    icon: () => (
      <svg
        className="text-gray-500 mr-3 h-6 w-6"
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
]

export const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 z-40 flex">
        {/*
Off-canvas menu overlay, show/hide based on off-canvas menu state.

Entering: "transition-opacity ease-linear duration-300"
From: "opacity-0"
To: "opacity-100"
Leaving: "transition-opacity ease-linear duration-300"
From: "opacity-100"
To: "opacity-0"
*/}
        <div className="fixed inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
        {/*
Off-canvas menu, show/hide based on off-canvas menu state.

Entering: "transition ease-in-out duration-300 transform"
From: "-translate-x-full"
To: "translate-x-0"
Leaving: "transition ease-in-out duration-300 transform"
From: "translate-x-0"
To: "-translate-x-full"
*/}
        <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
          <div className="absolute top-0 right-0 -mr-14 p-1">
            <button className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600">
              <X />
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>
          <div className="flex-shrink-0 px-4 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
              alt="Easywire"
            />
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
                  Help
                </a>
                <a
                  href="#"
                  className="group rounded-md py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Cog className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Logout
                </a>
              </div>
            </nav>
          </div>
        </div>
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
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
            alt="Easywire"
          />
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
            Help
          </a>
          <a
            href="#"
            className="group py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Cog className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
            Logout
          </a>
        </div>
      </nav>
    </div>
  </div>
)
