const order_confirm = {
  name: "xxx",
  headerImage:
    "http://cdn.mcauto-images-production.sendgrid.net/9257f8dcd27cf709/57f2d8bb-2249-43fc-bd08-922d413ffe69/742x198.png",
  order_url: "https://xxx.com",
  order_id: "#999999",
  subTotal: "59,600",
  delivery: "400",
  tax: "300",
  total: "600,000",
  address: "yyyyy",
  coupon: 0,
  fee: 0,
  email: "hello@fatlightslim.com",
  items: [
    { name: "product name1", price: "19,800", quantity: 1 },
    { name: "product name2", price: "39,800", quantity: 2 },
  ],
  price_detail: [
    { title: "配送料", amount: "100" },
    { title: "割引", amount: "2100" },
    { title: "代引手数料", amount: "3100" },
  ],
}

const shipping = {
  items: [
    {
      name: "product name1",
      image:
        "https://images.ctfassets.net/4qw6fucv5wfe/2Oppz15AAhWkCKgfynqKIV/cbd2a5984ef0a3514574270d90d96206/1608970272299-148x148.jpg",
      quantity: 1,
    },
    {
      name: "product name2",
      image:
        "https://images.ctfassets.net/4qw6fucv5wfe/1GEOr1VQQAjbb37GoFV6yy/a5041114ab6547a18915dbb085d84a96/1608970270627-148x148.jpg",
      quantity: 2,
    },
  ],
  headerImage:
    "http://cdn.mcauto-images-production.sendgrid.net/9257f8dcd27cf709/57f2d8bb-2249-43fc-bd08-922d413ffe69/742x198.png",
  order_id: "#999999",
  tracking_code: "xxx",
  order_url: "https://xxx.com",
  email: "hello@fatlightslim.com",
}

const payment_failed = {
  "headerImage":
"http://cdn.mcauto-images-production.sendgrid.net/9257f8dcd27cf709/57f2d8bb-2249-43fc-bd08-922d413ffe69/742x198.png",
"action_url": "https://xxx.com",
"order_id": "#999999",
"email": "hello@fatlightslim.com"
}
