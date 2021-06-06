import Image from "next/image"
import Layout from "../../components/Layout"
import Menu from "../../components/Menu"
import {
  getDataFromContentful,
  getShopFromContentful,
  getImageFields,
} from "../../utils/contentful"

export default function Shop(props) {
  const { fields, sys } = props.data.items[0]
  const { image, name, menu, hook, holiday, pickup } = fields

  return (
    <Layout {...props}>
      <div className="min-h-screen bg-gray-50 sm:py-4">
        <main>
          <div>
            {/* Hero card */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0 ">
                    <Image {...getImageFields(image)} />
                    <div
                      className="absolute inset-0 bg-yellow-500"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      <span className="block text-white">{name}</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                      {hook}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* More main page content here... */}
          <Menu holiday={holiday} menu={menu} name={name} pickup={pickup} {...props} />
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const shop = await getDataFromContentful("shop")

  // Get the paths we want to pre-render based on posts
  const paths = shop.items.map((s) => {
    return { params: { slug: s.fields.slug } }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      data: await getShopFromContentful(params),
    }, // will be passed to the page component as props
  }
}
