const fs = require("fs")
const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export default async function handler(req, res) {
  const res = await client.getEntries({
    content_type: "product",
    order: "sys.createdAt",
  })

  const products = {
    sf1000: res.items[7],
    sf7000: res.items[6],
    sf4000: res.items[4],
    fc6500: res.items[5],
    sp6500: res.items[3],
    ts: res.items[2],
    sp150: res.items[1],
    sp3000: res.items[0],
  }

  fs.writeFile("./manifest.json", JSON.stringify(data), (err) => {
    if (err) throw err
    console.info("Global data manifest written to file")
  })
  res.json(r)
}
