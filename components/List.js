import Link from "next/link"
import Image from "next/image"
import { getImageFields } from "../utils/contentful"
import { getDay } from "date-fns"

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function List({ data, copies }) {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div>
        {/* <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div> */}
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              人気のお店がゾクゾク出店中
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              たまには、いいよね？
              <span id="copy" className="h-3" />
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4  sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase"></h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight"></p>
          {/* <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p> */}
        </div>
      </div>
      <div className=" max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {data.items.map((v) => {
          const { fields, sys } = v
          const { image, address, name, slug, hook, comment, holiday } = fields
          const today = getDay(new Date())
          let holidays = []
          if (holiday) {
            holidays = holiday.map((v) => parseInt(v.slice(0, 1)))
          }

          const isHoliday = holidays.includes(today)

          return image ? (
            <div
              key={sys.id}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                isHoliday && "opacity-50"
              }`}
            >
              <div className={`flex-shrink-0`}>
                <div className="h-48 w-full overflow-hidden">
                  <Image {...getImageFields(image)} />
                  {isHoliday && <p className="text-center text-gray-50 py-4 font-bold bg-gray-500 bg-opacity-80 text-2xl -mt-40 relative">定休日</p>}
                </div>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      {address}
                    </a>
                  </p>
                  <Link href={isHoliday ? "#" : `/shops/${slug}`}>
                    <a className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="mt-3 text-base text-gray-500">{hook}</p>
                    </a>
                  </Link>
                </div>
                {comment && (
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">味村店長</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="/img/ajimura.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          YC東金中央・味村
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        {comment}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null
        })}
      </div>
    </div>
  )
}
