import { getDataFromContentful } from "../utils/contentful"
import Head from "next/head"
import Image from "next/image"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import List from "../components/List"
import Testimonial from "../components/Testimonial"
import Layout from "../components/Layout"
// import InstagramFeed from "../components/InstagramFeed"
// const Instagram = require("instagram-web-api")
// const { username, password } = process.env

export default function Home(props) {
  // console.log(props)
  return (
    <Layout {...props}>
      <main>
        <Hero />
        <Testimonial />
        <Marquee {...props} />
        <List {...props} />

        <div className="py-8 mx-auto text-center">
          <Image
            className="h-full w-full "
            src="/img/michinoeki.png"
            alt=""
            width={1200}
            height={606}
          />
          <Image
            className="h-full w-full "
            src="/img/banner1.jpg"
            alt=""
            width={291}
            height={155}
          />
          <Image
            className="h-full w-full "
            src="/img/banner2.jpg"
            alt=""
            width={290}
            height={102}
          />
        </div>
        {/* <InstagramFeed {...props} /> */}
      </main>
    </Layout>
  )
}

// export async function getStaticProps(params) {
//   const client = new Instagram({ username, password })
//   await client.login()
//   // const profile = await client.getProfile()
//   const instagram = await client.getPhotosByUsername({
//     username,
//   })
//   let posts = []
//   if (instagram["user"]["edge_owner_to_timeline_media"]["count"] > 0) {
//     // if we receive timeline data back
//     //  update the posts to be equal
//     // to the edges that were returned from the instagram API response
//     posts = instagram["user"]["edge_owner_to_timeline_media"]["edges"]
//   }

//   return {
//     props: {
//       data: await getDataFromContentful("shop"),
//       instagramPosts: posts,
//     }, // will be passed to the page component as props
//   }
// }

export async function getStaticProps(params) {
  return {
    props: {
      data: await getDataFromContentful("shop"),
    }, // will be passed to the page component as props
  }
}

const Landing = () => (
  <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 antialiased">
    <div className="px-4 py-5 sm:px-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">キャッチコピー。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            コピーの文頭は左に寄せ、写真を右に置くのが基本です。これはユーザー視点は、画面の左を軸に、下方へ流れていくからです。ランディングページは、それなりの文章量が必要ですから、読みやすいように、画面左で、行頭を揃えるようにします。写真は、視点を留める効果が高いので、人の顔写真をよく使います。
          </p>
          <p>
            キャッチコピーについては、色々な本も出ていますが、多くの方が誤解しているので、少し説明させてもらいます。まず、キャッチコピーの役割は２つです。
          </p>
          <ol>
            <li>
              <strong>
                着地力：　検索ユーザーが正しいページに来たことを、知らせる。
              </strong>
            </li>
            <li>
              <strong>
                興味力：　ランディングページを読みたいと思わせる。
              </strong>
            </li>
          </ol>
          <p>
            キャッチコピーは、ランディングページの冒頭に来るので、ページが開いた瞬間、目に飛込んできます。ここで自分の探しているページと違えば、ユーザーは直帰することになります。確実に着地させ、興味を喚起させるには、コピーのテクニックが必要です。もしコピーライティングに自信がなければ、
            <span style={{ color: "#ff0000" }}>
              <strong>検索ワードをキャッチコピーに含ませてください</strong>
            </span>
            。これが最も、簡単かつ確実な方法です。
          </p>
          <p>
            キャッチコピーの良し悪しは、コンバージョン率に影響します。それゆえ、多くの方がキャッチコピーに興味を持つし、制作会社さんなら、キャッチコピーのＡＢテストを繰り返すことでしょう。これはこれで正しいアプローチだと思います。ただし、だからといってテクニックを振りかざして、「どうだ！」と言わんばかりのキャッチコピーに、未来がないことも知っておいて下さい。
          </p>
          <p>
            テクニックに走る自称コピーライターは、コピーの本質を誤解しています。
            <span style={{ color: "#ff0000" }}>
              <strong>
                コピーライティングとは、テクニックを駆使することではありません。お客の関心を見抜き、ズバリ言葉で射抜くことです。
              </strong>
            </span>
            訴求点を見抜く力こそ、コピーライティングの本質であり、テクニックは２次的な話に過ぎません。
          </p>
          <p>
            お客の心に寄り添う謙虚な姿勢と、あらゆる視点から考える冷静な分析力が、コピーライティングには求められます。これなくしてコンバージョンをアップさせる、真のコピーは生まれないことを、決して忘れないで下さい。
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">共感部。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            <strong>
              なぜいきなり商品を提示せず、共感をとるような言葉が必要なのでしょうか？
            </strong>
            　それはランディングページの目的が、単に情報を伝えることでなく、商品の購入や資料の請求という、行動を求める点に関係しています。
          </p>
          <ul>
            <li>すみません、コピーを先にとらせてもらえませんか？</li>
            <li>
              すみません、もうすぐ授業が始まるので、コピーを先にとらせてもらえませんか？
            </li>
          </ul>
          <p>
            もしあなたがコピー機を使っていて、後ろから声をかけられたら、どちらの場合に、コピー機を譲る気持ちになりますか？　後者の方が譲る気になるのは、感覚的にお分かりになると思います。これは実際に社会心理学者が検証して、前者の場合は
            <strong>６０％の人が譲る</strong>のに対し、後者は
            <strong>９４％の人が譲る</strong>
            、という結果になっています。　～「影響力の武器」（誠信書房）第１版　９ページより。
          </p>
          <p>
            これだけ違いが出る理由は、後者は「もうすぐ授業が始まってしまう」という
            <span style={{ color: "#ff0000" }}>
              <strong>事実を、両者が共有するから</strong>
            </span>
            です。本来伝えたいことを伝える前に、何らかの事柄を共有することで、言葉を受け入れる準備が整います。このような準備のステップを踏まない限り、どれだけ商品の素晴らしさを伝えても、その素晴らしさは相手に伝わりません。
            <span style={{ color: "#ff0000" }}>
              <strong>
                商品の素晴らしさを効率よく伝えるために、このような準備ステップが必要になる
              </strong>
            </span>
            と、ご理解ください。
          </p>
        </div>
      </div>
    </div>

    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">商品（オファー）の提示。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            商品（オファー）を説明する時は、
            <strong>その外観をイメージできるように伝える</strong>
            のが、作成時のポイントです。商品であれば、商品の写真。サービスであれば、サービスを提供している人の写真。オファーであれば、オファー外観のイメージ図などを使います。
          </p>
          <p>
            特に注意してほしいのは、オファーの場合です。オファーは売り手が独自に作った集客用の無料商品ですから、お客さんはすぐに内容をイメージできません。ですので、レポートや冊子であれば、サイズやページ数などを伝えて、外観がイメージできるようにします。また試供品であれば、量や大きさを明記するようにしてください。ネーミングが重要なポイントになる場合もあります。
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">ベネフィット。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            <strong>
              ランディングページにおいて、ベネフィットは最も重要なパートです。
            </strong>
            ベネフィットが良く分からない人は、必ずこちらを読んでください。⇒
            <a
              target="_blank"
              title="ベネフィットとは何か？"
              href="https://web60.co.jp/bnf.html"
              className="text-indigo-500 ml-2"
            >
              ベネフィットとは何か？
            </a>
          </p>
          <p>
            あまり指摘されないのが不思議でしょうがないのですが、
            <span style={{ color: "#ff0000" }}>
              <strong>
                ランディングページのコンバージョン率は、このベネフィットで決まります
              </strong>
            </span>
            。なぜなら、お客さんはベネフィットを求めて、商品を購入したり、資料を請求するからです。ベネフィットがどれほど魅力的に書かれているか否か！　この魅力度が、お客さんを行動させるエンジンです。
          </p>
          <p>
            経験上、コンバージョン率の低いランディングページは、１００％ベネフィットが弱いです。そしてベネフィットの魅力を高めることで、ランディングページのコンバージョン率は、確実にアップします。コンバージョン率が低い場合、次の３点からチェックしてください。作成時の注意点でもあります。
          </p>
          <h4 className="news_headline2">ベネフィットの数：</h4>
          <p>
            ベネフィットの数は最低でも５個、出来れば７個ほしいところです。書く時は箇条書きの１行で済ませないで、見出し（１行）＋解説（３～６行）で、内容を分かりやすく説明します。
          </p>
          <h4 className="news_headline2">ベネフィットの多様性：</h4>
          <p>
            同じようなベネフィットを、表現を変えるだけで、何個も列記していないでしょうか。ぜひチェックしてください。お客さんは商品を買って、終わりではありません。それを１ヶ月使う場合もあれば、生涯に渡って使う場合もあります。購入直後のベネフィットと、一定期間経過後のベネフィットが、同じことはあり得ません。
          </p>
          <p>
            <span style={{ color: "#ff0000" }}>
              <strong>
                商品の使用、併用、メンテナンス、廃棄に至るまで、お客さんの使用ステージを思い浮かべながら、きめ細かくベネフィットを拾い上げてください。
              </strong>
            </span>
            ここで手を抜いているランディングページが、本当に多いです。
          </p>
          <h4 className="news_headline2">ベネフィットの書き方：</h4>
          <p>
            ベネフィットを作るときに大事なポイントは、書き方です。「世界最小サイズを実現！」　これは商品説明であり、ベネフィットではありません。ベネフィットは「無駄なスペースを使いません！」です。
          </p>
          <p>
            <strong>両者の違い、分かりますか？</strong>
          </p>
          <p>
            前者の主語は商品です。正確に書けば「この商品は、世界最小サイズを実現しました！」だからです。これに対し後者は、「あなたは無駄なスペースを使いません！」です。主語はあなたであり、お客さんになっています。ベネフィットとは、商品によってお客さんがどう変わるかであり、主語は必ずあなた＝お客さんです。
          </p>
          <p>
            <span style={{ color: "#ff0000" }}>
              <strong>
                それではなぜ、こんな面倒くさいことに、気を配る必用があるのでしょうか？
              </strong>
            </span>
          </p>
          <p>そこには２つの、大きな理由があります。</p>
          <p>
            まずランディングページの目的は、お客さんを行動させる点にあります。単に伝えるだけでなく、ランディングページの最後では行動してもらうわけです。人が行動するのは、決して軽くありません。それは想像以上に重いものです。そのために行動のエンジンであるベネフィットは、数多く、多種多様に伝えていくことが必要になります。
            <span style={{ color: "#ff0000" }}>
              <strong>
                お客さんの心理状態を、ベネフィットの数と多様性を使って、行動レベルまでグングン押し上げていくのです。
              </strong>
            </span>
          </p>
          <p>
            当然言葉の量は増え、文章量も多くなります。そのためには、多くの言葉を効率よく相手に届けなければなりません。「世界最小サイズを実現！」と「無駄なスペースを使いません！」を読み比べて下さい。どちらがすんなり頭に、入ってきますか？
          </p>
          <p>
            それは「無駄なスペースを使いません」です。なぜならお客さんの立場で、言い回しているので、１ステップ頭の動きを省いているからです。人が言葉を理解する時は、必ず自分の立場に置き換えて理解します。「世界最小サイズを実現」は、商品のことを言っているので、自分の立場に置き換えるのに、頭は１ステップ余計な動きをしなければならないのです。
          </p>
          <p>
            そしてもう１つの理由は、Ｗｅｂサイトは高速で読まれるということです。
          </p>
          <p>
            読むというよりも、流していくという方が的確でしょう。お客さんは紙媒体より速いスピードでＷｅｂを読みます。この極めて不利な環境で、多くの情報を伝える必用があるわけです。そのために、効率よく言葉を届けなければならない。だから言葉の言い回しを、お客さん主体で伝えていく。こう理解して下さい。
          </p>
          <p>※　ご注意。</p>
          <p>
            お客さんは、文章なんて読まないから、図やイメージ図を多用したほうが良い。これは大きな誤解です。
            <span style={{ color: "#ff0000" }}>
              <strong>
                文章を読まないのではありません。興味のないことがダラダラ続くから、読まないのです。
              </strong>
            </span>
            行動を求める以上、言葉の量は多くならざるを得ません。ここは避けられないから、言葉を効率的に伝える書き方を考える。そして、レイアウトやデザインも読みやすいように考える。これが正しいアプローチです。
          </p>
          <p>
            言葉の量を減らしては、お客さんの心理状態を行動レベルに、引上げることが出来ません。それでコンバージョン率がアップしないのは、ある意味で当然の帰結だと思います。
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">お客様の声。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            ベネフィットの数と多様性を使って、お客さんの心理状態をグングン引上げていくわけですが、そうするとお客さんは必ず、こう思います。
          </p>
          <p>
            「
            <span style={{ color: "#ff0000" }}>
              <strong>本当かな・・・。そんなに上手くいくだろうか？</strong>
            </span>
            」
          </p>
          <p>
            これは心の作用・反作用のようなもので、必ずこういう形で反作用が働きます。この反作用を堰き止めるのが、お客様の声の役割です。
          </p>
          <p>
            すなわちベネフィットで、お客さんのモチベーションを行動レベルまで引上げる。それは心理状態をハイにしますから、不自然なわけです。必ず元の自然な状態に戻ろうとします。それを「間違いないです」と伝え、防ぐということです。これだけの人が、これだけ評価しているから、大丈夫ですよ、とお客様の声を使って納得してもらうことになります。
          </p>
          <p>
            ですから、<strong>お客様の声では信憑性が命です</strong>。
          </p>
          <p>
            最初に基本的なことを言えば、匿名よりは実名の方が良いですし、写真があった方がなお良いです。この方が信憑性は、強くなるからです。一般的に言えば、お客様の声は数多くあった方が良いでしょう。ただし、単に数が多ければ良いわけではありません。やはり書かれている内容、特に商品の異なったポイントを、評価していることが大事です。ここでも多様性が必用と思ってください。
          </p>
          <p>
            このパートの役割は、間違いなくベネフィットが得られることを、納得してもらうことにあります。ですので、先に言った通り、
            <span style={{ color: "#ff0000" }}>
              <strong>
                お客様の声だけでなく、商品の実証データ、購入実績、マスコミ掲載、開発者の苦労話、会社の信用度等、あらゆる点から、「信用できる」を伝えていくことになります
              </strong>
            </span>
            。
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">差別化。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            差別化は、競合優位や強みなど、あらゆるところで重要性が指摘されていますから、ここで改めて言うこともないと思います。ここで注意してほしいのは、オファーを請求してもらう場合です。特に情報系のオファー、すなわち
            <span style={{ color: "#ff0000" }}>
              <strong>
                レポートや冊子の場合には、他のサイトでは手に入らないことを説明する必要があります
              </strong>
            </span>
            。
          </p>
          <p>
            今の時代ネットで調べれば、あらゆる情報が手に入る。多くの人は、こう思っています。実際は最も大事なポイントが、ネットで言われることはないのですが、多くの人は何でも分かると思っています。ですから、他のサイトでは手に入らない理由を、説明するのが不可欠です。
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6">アクション（求める行動）。</div>
        <div className="px-4 py-5 sm:p-6">
          <p>
            最後は、お客さんに求める行動を明示します。入力フォームへの記入が必要なら、フォームをページに貼り付けます。入力項目は、必要最小限に留めることが大事です。
            <span style={{ color: "#ff0000" }}>
              <strong>
                不必要に多い入力項目は、確実にコンバージョン率を下げます。
              </strong>
            </span>
          </p>
          <p>
            各入力項目の行間は十分にとり、記入しやすいイメージを伝えることが重要です。電話連絡を求めるのであれば、電話番号を大きめのフォントで書き、受付時間を、土日祝日の場合を含め、丁寧に書いてください。
          </p>
          <p>
            入力フォームの作り方は、ＥＦＯ（Entry Form
            Optimization）というサービスが成立つほど、色々なテクニックがあることも事実ですが、まずは最低限の入力項目に留める。ここから、スタートしてください。
          </p>
        </div>
      </div>
    </div>
  </div>
)
