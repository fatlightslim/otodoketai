export default function Testimonial(props) {
  return (
    <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <svg
          className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          role="img"
          aria-labelledby="svg-workcation"
        >
          <title id="svg-workcation">Workcation</title>
          <defs>
            <pattern
              id="ad119f34-7694-4c31-947f-5c9d249b21f3"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
          />
        </svg>
        <div className="relative">
          {/* <img className="mx-auto h-8" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg" alt="Workcation" /> */}
          <blockquote className="mt-10">
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900 antialiased">
              <p>
                {/* “” */}
                {/* “東金・九十九里エリアの皆様に地元の美味しい料理や食材をお届けしたい”そんな想いから、わたしたちはお届け隊を始めました。 */}
                東金市、九十九里町へお弁当、日用品をご家庭までお届けする、「よみうりお届け隊」を開業致しました。
                私達は、地元が大好きです。
                地元の皆様に笑顔で、喜んで頂きたくスタートしました。
                コロナの影響で客足が減って困っている飲食店の少しでもお力になれたらと思っています。
                今出来ることをお届け隊はやっていきます。
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  {/* <img className=" h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=EqnZfs2epz&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                  <img
                    className="mx-auto h-10 w-10 rounded-full"
                    // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=EqnZfs2epz&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    src="/img/ajimura.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">
                    味村 剛
                  </div>
                  <svg
                    className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>
                  <div className="text-base font-medium text-gray-500">
                    YC東金中央
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
