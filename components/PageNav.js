import Logo from "./Logo"
import { Home } from "./Svg"
import Link from "next/link"

export default function PageNav() {
  return (
    <div className={`py-1 bg-black bg-opacity-80 z-30`}>
      <div className={`relative z-40`}>
        <div className="relative">
          <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <Home className="mt-1  h-6 w-6 text-white" />
            </Link>
            <Logo className="text-gray-50 mx-auto" />
            {/* <CartOpen /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
