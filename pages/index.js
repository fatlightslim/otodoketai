import Head from "next/head"
import styles from "../styles/Home.module.css"
// import Header from "./components/Header"
import Image from "next/image"

const shops = [
  { name: "南方美味蓬莱閣", image: "" },
  { name: "フランス割烹竹田屋", image: "" },
  { name: "郷土の味 味良", image: "" },
  { name: "カフェ＆レストラン 玉子家", image: "" },
  { name: "MOG BOX", image: "" }, // (東金ステーキMOG)
  { name: "ケーキハウスアラジン", image: "" },
  { name: "E.G.DINNERハンバーガーショップ", image: "" }, //（イージーダイナー）
  { name: "手作りお弁当 かしま", image: "" },
  { name: "中華料理店 萬福飯店", image: "" },
  { name: "お食事処 ことのや", image: "" },
  { name: "よみうりギョーザ", image: "" },
  { name: "YC東金中央 食品事業部", image: "" },
  { name: "会席亭 かくじゅう", image: "" },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* <Header /> */}
      <main>
        {/* Hero section */}
        <div className="relative mt-4">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className=" inset-0">
                <Image
                  className="h-full w-full "
                  src="/img/cover.png"
                  alt="People working on laptops"
                  width={2467}
                  height={1565}
                />
                {/* <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700"
                  style={{ mixBlendMode: "multiply" }}
                /> */}
              </div>
              {/* <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Take control of your</span>
                  <span className="block text-indigo-200">
                    customer support
                  </span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <a
                      href="#"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* Logo Cloud */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xl font-semibold uppercase text-gray-500 tracking-wide">
              人気のお店がゾクゾク出店中
            </p>
            <div className=" marquee mt-12">
              <div className="marquee-inner">
                {shops.map((v) => {
                  return (
                    <span key={v.name} className="mx-4">
                      {v.name}
                      {/* <img
                  className="h-12"
                  src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                  alt="Tuple"
                /> */}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* This example requires Tailwind CSS v2.0+ */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4  sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                スタッフ厳選
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                今週のオススメ商品
              </p>
              {/* <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p> */}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            <div className="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  {/* Heroicon name: outline/clock */}
                  <svg
                    className="h-6 w-6"
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    玉子屋のふわふわピザ
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="sm:rounded-tr-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  {/* Heroicon name: outline/badge-check */}
                  <svg
                    className="h-6 w-6"
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </span>

              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
にんにくなし（ばか旨ギョーザ）①各種1袋/15個入
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-light-blue-50 text-light-blue-700 ring-4 ring-white">
                  {/* Heroicon name: outline/users */}
                  <svg
                    className="h-6 w-6"
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
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    Schedule a one-on-one
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                  {/* Heroicon name: outline/cash */}
                  <svg
                    className="h-6 w-6"
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    Payroll
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="sm:rounded-bl-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-rose-50 text-rose-700 ring-4 ring-white">
                  {/* Heroicon name: outline/receipt-refund */}
                  <svg
                    className="h-6 w-6"
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
                      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    Submit an expense
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="rounded-bl-lg rounded-br-lg sm:rounded-bl-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  {/* Heroicon name: outline/academic-cap */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    Training
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrmum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="py-8 mx-auto text-center">
          <Image
            className="h-full w-full "
            src="/img/michinoeki.png"
            alt=""
            width={1200}
            height={606}
          />
        </div>

        {/* Alternating Feature Sections */}
        <div className="relative pt-16 pb-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
          />
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
                      {/* Heroicon name: outline/inbox */}
                      <svg
                        className="h-6 w-6 text-white"
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
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Stay on top of customer support
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Semper curabitur ullamcorper posuere nunc sed. Ornare
                      iaculis bibendum malesuada faucibus lacinia porttitor.
                      Pulvinar laoreet sagittis viverra duis. In venenatis sem
                      arcu pretium pharetra at. Lectus viverra dui tellus ornare
                      pharetra.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <blockquote>
                    <div>
                      <p className="text-base text-gray-500">
                        “Cras velit quis eros eget rhoncus lacus ultrices sed
                        diam. Sit orci risus aenean curabitur donec aliquet. Mi
                        venenatis in euismod ut.”
                      </p>
                    </div>
                    <footer className="mt-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">

                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                            alt=""
                          />
                        </div>
                        <div className="text-base font-medium text-gray-700">
                          Marcia Hill, Digital Marketing Manager
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <div className="mt-12 sm:mt-16">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">

                <Image
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="http://yomiuri-ycs.com/wp/wp-content/uploads/2020/10/10%E6%9C%88%E3%81%AE%E3%82%88%E3%81%BF%E3%81%86%E3%82%8A%E3%80%8C%E3%81%8A%E5%B1%8A%E3%81%91%E9%9A%8A%E3%80%8D%E3%83%81%E3%83%A9%E3%82%B74p-1p%E8%A1%A8%E9%9D%A2.jpg"
                  alt=""
                  width={1677}
                  height={1410}
                />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
                      {/* Heroicon name: outline/sparkles */}
                      <svg
                        className="h-6 w-6 text-white"
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
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Better understand your customers
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Semper curabitur ullamcorper posuere nunc sed. Ornare
                      iaculis bibendum malesuada faucibus lacinia porttitor.
                      Pulvinar laoreet sagittis viverra duis. In venenatis sem
                      arcu pretium pharetra at. Lectus viverra dui tellus ornare
                      pharetra.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-24 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  

                <Image
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="http://yomiuri-ycs.com/wp/wp-content/uploads/2020/11/E.GDINNER.jpg"
                  alt=""
                  width={
2500
}
                  height={1534}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* This example requires Tailwind CSS v2.0+ */}
      <footer className="bg-white">
        {/* This example requires Tailwind CSS v2.0+ */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">SNSで情報発信中</span>
              <span className="block text-indigo-600">
                地域のセール情報やクーポンも
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="mt-8 flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-20 w-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-20 w-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-20 w-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pb-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p className="mt-8 text-center text-base text-gray-400">
              © 2020 YCS, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
