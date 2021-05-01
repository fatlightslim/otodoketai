import { getDataFromContentful } from "../utils/contentful"
import Image from "next/image"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import List from "../components/List"
import Layout from "../components/Layout"

import { getImageFields } from "../utils/contentful"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

export default function Home(props) {
  const { data } = props
  return (
    <Layout {...props}>
      <main>
        <div className="bg-gray-800 m-2 py-8 rounded-md">
          <h3 className="text-gray-50">人気商品</h3>

          <Carousel centerMode centerSlidePercentage={80}>
            {data.items.map((v) => {
              const { fields, sys } = v
              const { image, address, name, slug, hook, comment } = fields
              return (
                <div
                  key={sys.id}
                  className="flex flex-col px-1 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <div className="h-48 w-full overflow-hidden">
                      <Image {...getImageFields(image)} />
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <Hero />
        <Marquee {...props} />
        <List {...props} />

        <div className="py-8 mx-auto text-center">
          <Image
            className="h-full w-full "
            src="/img/michinoeki.png"
            alt=""
            width={1200}
            height={606}
          />
          <Image
            className="h-full w-full "
            src="/img/banner1.jpg"
            alt=""
            width={291}
            height={155}
          />
          <Image
            className="h-full w-full "
            src="/img/banner2.jpg"
            alt=""
            width={290}
            height={102}
          />
        </div>
        {/* <InstagramFeed {...props} /> */}
      </main>
    </Layout>
  )
}

// export async function getStaticProps(params) {
//   const client = new Instagram({ username, password })
//   await client.login()
//   // const profile = await client.getProfile()
//   const instagram = await client.getPhotosByUsername({
//     username,
//   })
//   let posts = []
//   if (instagram["user"]["edge_owner_to_timeline_media"]["count"] > 0) {
//     // if we receive timeline data back
//     //  update the posts to be equal
//     // to the edges that were returned from the instagram API response
//     posts = instagram["user"]["edge_owner_to_timeline_media"]["edges"]
//   }

//   return {
//     props: {
//       data: await getDataFromContentful("shop"),
//       instagramPosts: posts,
//     }, // will be passed to the page component as props
//   }
// }

export async function getStaticProps(params) {
  return {
    props: {
      data: await getDataFromContentful("shop"),
    }, // will be passed to the page component as props
  }
}
