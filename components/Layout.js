import Banner from "../components/Banner"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Cart from "./cart/Cart"

export default function Layout(props) {
  return (
    <div className="bg-white">
      {/* <Banner /> */}
      <Nav {...props} />
      {props.children}
      <Footer />
      <Cart {...props} />
    </div>
  )
}
