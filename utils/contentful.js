const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const BLACKLIST = [] //"sf1000", "sf2000"]

export function getImageFields(image) {
  return {
    alt: image.fields.title,
    src: "https:" + image.fields.file.url,
    ...image.fields.file.details.image,
  }
}

export async function getImageFromContentful(id) {
  return await client.getAsset(id)
}

export async function getShopFromContentful(params) {
  // console.log(params)
  return client.getEntries({
    content_type: "shop",
    "fields.slug": params.slug,
  })
}

export async function getDataFromContentful(content_type) {
  return client.getEntries({ content_type })
}

export async function getProductsFromContentful() {
  const res = await client.getEntries({
    content_type: "product",
    order: "sys.createdAt",
  })

  return {
    products: {
      sf1000: res.items[7],
      sf7000: res.items[6],
      sf4000: res.items[4],
      fc6500: res.items[5],
      sp6500: res.items[3],
      ts: res.items[2],
      sp150: res.items[1],
      sp3000: res.items[0],
    },
  }
}
