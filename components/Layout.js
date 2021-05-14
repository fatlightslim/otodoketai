import Banner from "../components/Banner"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Cart from "./cart/Cart"
import Head from 'next/head'


export default function Layout(props) {
  return (
    <div className="bg-white">
      <Head>
        <title>読売お届け隊</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Banner /> */}
      <Nav {...props} />
      {props.children}
      <Footer />
      <Cart {...props} />
    </div>
  )
}
