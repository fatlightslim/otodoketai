import Layout from "../../components/admin/AdminLayout"
import OrderList from "../../components/admin/OrderList"

// stats, seo, orders,
export default function Admin({ data }) {
  return (
    <Layout>
      <OrderList orders={data} />
    </Layout>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/orders`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
