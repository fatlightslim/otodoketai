import Ticker from "react-ticker"
import { getImageFields } from "../utils/contentful"
import Image from "next/image"

export default function Marquee({ data }) {
  // const featured = data.items.map((v) => {
  //   const { fields, sys } = v
  //   return fields.menu ? fields.menu[0] : null
  // })
  const featured = data.items.filter(
    (v) => v.sys.id === "6Bu0ljtIiwIO4hIrlzoT9d"
  )[0]["fields"].menu
  // const shop = data[0].fields.name
  return (
    <div className="bg-gray-100">
      <div className=" mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xl font-semibold uppercase text-gray-500 tracking-wide">
          スタッフ厳選今週のオススメ商品
        </p>
        <div className="whitespace-no-wrap ">
          <Ticker >
            {({}) =>
              featured.map((v) => {
                const { fields, sys } = v
                const { image, title } = fields
                // console.log(image);
                return (
                  <span key={sys.id} className="inline-block py-4 px-16 whitespace-no-wrap">
                    <div>

                      <Image {...getImageFields(image)}  />
                    </div>
                    {/* <p>{shop}</p> */}
                    <p>{title}</p>
                  </span>
                )
              })
            }
          </Ticker>
        </div>
      </div>
    </div>
  )
}
