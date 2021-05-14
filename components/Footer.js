import Logo from "./Logo"
import Link from "next/link"

export default function Footer({
  data = {
    copyright: `Copyright © ${new Date().getFullYear()} ${process.env.company.en} All rights reserved.`,
    menu: [
      {
        name: "利用規約",
        href: "/terms",
      },
      {
        name: "サイトポリシー",
        href: "/policies",
      },
      // {
      //   name: "Thanks \u2665",
      //   href: "/thanks",
      // },
    ],
  },
}) {
  return (
    <footer className="py-12 md:py-8 text-center md:text-left relative z-30">
      <div className="container mx-auto">
        <div className=" flex flex-col lg:flex-row content-center items-center justify-between">
          <div className="flex items-center flex-col lg:flex-row mx-auto">
            <Logo />
            <span className="ml-0 md:ml-4 text-sm text-gray-900 py-4 lg:py-0">
              {data.copyright}
            </span>
          </div>

          <div className="navbar mx-auto">
            <ul className="navbar-nav flex ">
              {data.menu.map((v, index) => {
                let className = "px-md-3 px-2"  
                if (data.menu.length-1 !== index) {
                  className += " border-r border-gray-300"
                }
                return (
                  <li
                    key={v.name}
                    className={className}
                  >
                    <Link href={v.href}>
                      <a className="text-gray-700 text-sm my-0 hover:text-black hover:underline ">
                        {v.name}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
