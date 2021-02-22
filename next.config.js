module.exports = {
  // module.exports = {
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    domains: ["yomiuri-ycs.com"],
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
    shopify: {
      domain: "fatlightslim.myshopify.com",
      storefrontAccessToken: "1916a03edc91d97ee7ee99f5ab8add14",
    },
    products: {
      sp3000: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1OTM5MzgxNjU5MTY=",
      sp150: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1OTM5OTg2NTU2NDQ=",
      ts: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1OTM5OTkzNzY1NDA=",
      sp6500: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzYxMTA2NDgxMDcxNjQ=",
      fc6500: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzYxMTA2NzM2NjYyMDQ=",
      sf4000: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzYxOTE0NzQ1NzM0Njg="

    },
    customKey: "my-value",
    company: {
      ja: "合同会社SBO",
      en: "SBO LLC",
      person: "TUNG HAN SHEN",
      tel: "092-980-4282",
      address: "〒812-0883 福岡市博多区南本町2-1-9",
    },
    site: {
      name: "FATLightSLIM",
      url: "http://fatlightslim.com/",
      email: "hello@fatlightslim.com",
      twitter: "@fatlightslim",
    },
  },
}
