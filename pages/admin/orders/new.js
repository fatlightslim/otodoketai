import Layout from "../../../components/admin/AdminLayout"
import OrderForm from "../../../components/cart/OrderForm"

export default function OrdersNew({ data }) {
return (
  <Layout>

  <Actions />
  </Layout>

)
}
  const Actions = () => (
    <div className="p-4 sticky top-0 bg-gray-50 bg-opacity-90 border-b">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setForm(null)}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          保存
        </button>
        {/* <button
          onClick={(e) => {
            if (window.confirm("削除しますか？")) {
              e.preventDefault()
              onDelete()
            }
          }}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          削除
        </button> */}
      </div>
    </div>
  )