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
  // i18n: {
  //   locales: ["ja", "en", "kr"],
  //   defaultLocale: "ja",
  // },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  env: {
    CONTENTFUL_ACCESS_TOKEN: "BdEMwh4qdi1fRZz-PnlRjJ3yfPnVDO0_0vYVhRfTq-A",
    CONTENTFUL_SPACE_ID: "4qw6fucv5wfe",
    company: {
      ja: "株式会社ワイシーエス",
      en: "YCS HD Inc.",
      person: "館坂 民和",
      tel: "047-459-0084",
      address: "千葉県八千代市高津６７８－２ グリーンハイランドⅠ",
    },
    site: {
      name: "お届け隊",
      url: "http://fatlightslim.com/",
      email: "t.officework@ycs-hd.com",
      twitter: "@fatlightslim",
    },
  },
}
