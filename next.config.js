module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  // module.exports = {
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    domains: [
      "yomiuri-ycs.com",
      "images.ctfassets.net",
      "scontent-lax3-1.cdninstagram.com",
      "scontent-lax3-2.cdninstagram.com"
    ],
  },
  env: {
    company: {
      ja: "株式会社ワイシーエス",
      en: "YCS HD Inc.",
      person: "館坂 民和",
      tel: "0475-52-2240",
      address: "千葉県東金市堀上56-4",
    },
    site: {
      name: "お届け隊",
      url: "https://otodoketai.vercel.app/",
      email: "touganechuuou@ycmail.jp",
      twitter: "@fatlightslim",
    },
  },
}
