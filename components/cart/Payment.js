// import Confirm from "./Confirm"
// import OrderForm from "./OrderForm"
// import PaymentForm from "./PaymentForm"
// import Breadcrumb from "./Breadcrumb"
// import CartBar from "./CartBar"
// import { useCart } from "../../utils/useCart.tsx"
// import { useState } from "react"

// const labels = [
//   {
//     label: "オンライン決済",
//     desc:
//       "各種クレジットカード, Apple Pay, Google Payが手数料無料でご利用いただけます.",
//   },
//   {
//     label: "代金引換",
//     desc:
//       "国内配送のみ. 代引手数料がかかります. 佐川急便の代引きサービスでお届けします.",
//   },
// ]
// export default function Payment(props) {
//   const { items, cartTotal } = useCart()

//   const [paymentMethod, setPaymentMethod] = useState(labels[0]["label"])
//   const initialData = {
//     id: "",
//     amount_off: 0,
//   }
//   const [coupon, setCoupon] = useState(initialData)
//   const locals = {
//     ...props,
//     items,
//     cartTotal,
//     coupon,
//     setCoupon,
//     initialData,
//     paymentMethod,
//     setPaymentMethod,
//     labels,
//   }
//   return (
//     <>
//       <CartBar {...locals} />
//       <Breadcrumb {...locals} />
//       <Conditional {...locals} />
//     </>
//   )
// }

// const Conditional = (props) => {
//   switch (props.form.key) {
//     // case "DONE":
//     //   return <Done {...props} />
//     case "CONFIRM":
//       return <Confirm {...props} />
//     case "ORDER":
//       return <OrderForm {...props} />
//     case "PAYMENT":
//       return <PaymentForm {...props} />
//   }
// }
