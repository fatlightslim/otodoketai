import Confirm from "../../components/cart/Confirm"
import OrderForm from "../../components/cart/OrderForm"
import PaymentForm from "../../components/cart/PaymentForm"
import Breadcrumb from "../../components/cart/Breadcrumb"
import CartBar from "../../components/cart/CartBar"
import { useCart } from "react-use-cart"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { isToday, getDay} from "date-fns"
import { tr } from "date-fns/locale"

const labels = [
  {
    key: "online",
    label: "オンライン決済",
    desc: "各種クレジットカード, Apple Pay, Google Payが手数料無料でご利用いただけます.",
  },
  {
    key: "cod",
    label: "代金引換",
    desc: "ご自宅までお届けの際に、配達のスタッフへ直接お支払いください.",
  },
]
export default function Payment(props) {
  const router = useRouter()
  const { cartTotal, items } = useCart()
  const [delivery, setDelivery] = useState(150)
  const [pay, setPay] = useState("online")
  const [coupon, setCoupon] = useState({ id: "" })
  const [form, setForm] = useState({ key: "ORDER", value: {} })
  const [charge, setCharge] = useState(getCharge())
  const [dateNumber, setDateNumber] = useState(getDay(new Date()))
  const [selDate, setSelDate] = useState(new Date())

  const [hasHoliday, setHasHoliday] = useState(false)
  const [hasCantDeliverToday, setHasCantDeliverToday] = useState(false)

  // const [countError, setCountError] = useState(false)

  function getCharge() {
    const discount = 0
    const total = cartTotal + delivery - discount
    return {
      delivery: delivery || 150,
      discount,
      total,
      subTotal: cartTotal,
      tax: total - parseInt(total / 1.1),
    }
  }

  useEffect(() => {
    
    console.log("items")
    console.log(items)
    
    const holidayList = items.filter(v => v.holidays ? v.holidays.includes(dateNumber) : [])
    holidayList.length > 0 ? setHasHoliday(true) : setHasHoliday(false)

    console.log("hasHoliday=" + hasHoliday)

    // if (hasHoliday === true){
      //味よしチェック
      console.log("味よしチェック")
      var hasAjiyosi = false
      items.map((v) => {
        const shop = v.shopName
      console.log("shop=" + shop)
        if (shop === '郷土の味 味良'){
          hasAjiyosi = true
        }
      })
      
      console.log("hasAjiyosi=" + hasAjiyosi)
      console.log("isToday(selDate)=" + isToday(selDate))

      if (hasAjiyosi === true){
        if ( isToday(selDate) === true){
          setHasCantDeliverToday(true)
        } else {
          setHasCantDeliverToday(false)          
        }
      }

    // }
 
  
  }, [dateNumber, items, selDate])

  useEffect(() => {
    setCharge(getCharge())
  }, [cartTotal, coupon, pay, delivery])

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/")
    }
  }, [items])

  
  // useEffect(() => {
  //   document.body.scrollTop = 0 // For Safari
  //   document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  // }, [form])

  const locals = {
    ...props,
    items,
    cartTotal,
    labels,
    coupon,
    setCoupon,
    pay,
    setPay,
    form,
    setForm,
    charge,
    setDelivery,
    dateNumber,
    setDateNumber,
    selDate, 
    setSelDate,
    hasHoliday,
    hasCantDeliverToday,
  }

  return (
    items.length > 0 && (
      <div className="pb-8">
        <CartBar {...locals} />
        <Breadcrumb {...locals} />
        <Conditional {...locals} />
      </div>
    )
  )
}

const Conditional = (props) => {
  switch (props.form.key) {
    case "CONFIRM":
      return <Confirm {...props} />
    case "ORDER":
      return <OrderForm {...props} />
    case "PAYMENT":
      return <PaymentForm {...props} />
  }
}
