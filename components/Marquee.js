import Link from "next/link"
// import Ticker from "react-ticker"
import { getImageFields } from "../utils/contentful"
import Image from "next/image"

export default function Marquee({ data }) {
  // console.log(data.items.filter(v => v.fields.menu));

  const featured = data.items
    .filter((v) => v.fields.menu)
    .map((v) => {
      const { fields, sys } = v
      return fields.menu ? v : null
    })
  // const featured = data.items.filter(
  //   (v) => v.sys.id === "6Bu0ljtIiwIO4hIrlzoT9d"
  // )[0]["fields"].menu
  // const shop = data[0].fields.name

  return (
    <div className="bg-gray-100">
      <div className=" mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xl font-semibold uppercase text-gray-500 tracking-wide">
          スタッフ厳選今週のオススメ商品
        </p>
        {/* <div className="flex flex-row"> */}
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 mt-12"
        >
          {featured.map((v, i) => {
            const { fields, sys } = v
            const { name, menu, slug } = fields
            const image = menu[0].fields.image
            return image && i < 9 ? (
              <li key={sys.id} className="relative">
                <Link href={`/shops/${slug}`}>
                  <a>
                    <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                      <img
                        src={image.fields.file.url}
                        alt=""
                        layout="fill"
                        className="group-hover:opacity-75 object-cover pointer-events-none"
                      />
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                      {menu[0].fields.title}
                    </p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                      {name}
                    </p>
                  </a>
                </Link>
              </li>
            ) : null
          })}
        </ul>
      </div>
    </div>
  )
}
