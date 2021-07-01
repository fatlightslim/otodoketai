import Layout from "../../../components/admin/AdminLayout"
import OrderList from "../../../components/admin/OrderList"

export default function AdminOrders({ data }) {
  return (
    <Layout>
      <OrderList orders={data} />
    </Layout>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const url = process.env.URL || 'http://localhost:3000'
  const res = await fetch(`${url}/api/orders`)
  const data = await res.json()

  const filtered = data.filter(
    (v) => {
      const status = v.log.slice(-1)[0]["status"] 
      const blacklist = ['draft', 'cancel']
      return  !blacklist.includes(status)
    }
  )
  return {
    props: { data: filtered },
  }
}
