import "tailwindcss/tailwind.css"
import "../styles/globals.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { init } from "ityped"
import { CartProvider } from "react-use-cart"
import { UserProvider } from "@auth0/nextjs-auth0"

function MyApp({ Component, pageProps }) {
  const [cartOpen, setCartOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const myElement = document.querySelector("#copy")
    if (myElement) {
      init(myElement, {
        showCursor: false,
        typeSpeed: 150,
        backSpeed: 100,
        backDelay: 1000,
        strings: [
          "ちょっぴり贅沢",
          "がんばった自分にご褒美",
          "ゆっくりブランチ",
        ],
      })
    }
  }, [router.pathname])

  const props = {
    cartOpen,
    setCartOpen,
  }
  return (
    <UserProvider>
      <CartProvider>
        <Component {...pageProps} {...props} />
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
