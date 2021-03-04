import { getDataFromContentful } from "../utils/contentful"
import Head from "next/head"
import Image from "next/image"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import List from "../components/List"
import Testimonial from "../components/Testimonial"
import Layout from "../components/Layout"
// import InstagramFeed from "../components/InstagramFeed"
// const Instagram = require("instagram-web-api")
// const { username, password } = process.env

export default function Home(props) {
  // console.log(props)
  return (
    <Layout {...props}>
      <main>
        <Hero />
        <Testimonial />
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
