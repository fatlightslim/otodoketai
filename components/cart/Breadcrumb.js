export default function Breadcrumb(props) {
  return (
    <nav className="max-w-7xl mx-auto flex pl-4 pt-4 md:pl-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              {/* Heroicon name: home */}
              <svg
                className="flex-shrink-0 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {[
          { label: "配送", key: "ORDER" },
          { label: "支払い", key: "PAYMENT" },
          // { label: "確認", key: "CONFIRM" },
        ].map((v) => {
          return (
            <li key={v.key}>
              <div className="flex items-center">
                {/* Heroicon name: chevron-right */}
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href="#"
                  className={`${
                    v.key === props.form.key
                      ? "text-indigo-500"
                      : "text-gray-500"
                  } ml-4 text-xs font-bold hover:text-gray-700`}
                >
                  {v.key === "PAYMENT" && props.form.key==="CONFIRM" ? <span className="text-indigo-500">確認</span> : v.label}
                </a>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}