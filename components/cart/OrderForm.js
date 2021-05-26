import Link from "next/link"
import { fetchPostJSON, cleanUp } from "../../utils/api-helpers"

import {
  extraDeliveryFee,
  outOfScope,
  inScope99,
} from "../../utils/delivery-area"
import { useForm, Controller } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { ExCircle, ChevRight } from "../Svg"
import CartDetail from "./CartDetail"
import { useCart } from "react-use-cart"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { isTomorrow, getDay, isToday, getHours } from "date-fns"
import ja from "date-fns/locale/ja"
registerLocale("ja", ja)

function isEmpty(obj) {
  return !Object.keys(obj).length
}

export default function OrderForm(props) {
  const { items } = useCart()
  const {
    setForm,
    form,
    charge,
    setDelivery,
    setDateNumber,
    dateNumber,
    hasHoliday,
  } = props
  const { handleSubmit, errors, control, register, setValue, getValues } =
    useForm()
  const [startDate, setStartDate] = useState(new Date())
  const [outArea, setOutArea] = useState(false)
  const [hours, setHours] = useState(["11:00 ~ 12:00", "17:00 ~ 18:00"])
  const [disableButton, setDisableButton] = useState(false)
  const [closeToday, setCloseToday] = useState(false)

  useEffect(() => {
    const { customer } = form.value
    if (customer) {
      Object.keys(customer).forEach((v) => {
        setValue(v, customer[v])
      })
    }

    setStartDate(new Date())
  }, [])

  useEffect(() => {
    setDisableButton(hasHoliday)
  }, [hasHoliday])

  useEffect(() => {
    getTime()
  }, [dateNumber])

  const getFilterDate = (date) => {
    const now = new Date()

    return closeToday
      ? getDay(date) !== 1 && now <= date
      : getDay(date) !== 1 &&
          date > new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  }

  const getTime = () => {
    const hour = getHours(new Date())
    if (isToday(getValues("date"))) {
      if (hour <= 11) {
        setHours(["17:00 ~ 18:00"])
      } else {
        setCloseToday(true)
      }
    } else if (isTomorrow(getValues("date"))) {
      if (hour >= 16) {
        setHours(["17:00 ~ 18:00"])
      } else {
        setHours(["11:00 ~ 12:00", "17:00 ~ 18:00"])
      }
    } else {
      setHours(["11:00 ~ 12:00", "17:00 ~ 18:00"])
    }
  }

  const onSubmit = (customer) => {
    fetchPostJSON("/api/orders", {
      _id: form.value._id,
      customer,
      items: cleanUp(items),
      status: "draft",
      charge,
    }).then((r) => {
      setForm({ key: "PAYMENT", value: r })
    })
  }

  const onError = (errors, e) => {
    console.log(errors)
    // Object.keys(values).forEach((v) => {
    //   console.log(values[v]);
    //   setValue(v, values[v])
    // })
  }

  const getZip = async (value) => {
    const left3 = value.replace("-", "").slice(0, 3)
    const right4 = value.replace("-", "").slice(3)
    const o = outOfScope.map((v) => v.zip)

    if (left3 === "283" && !o.includes(value) && right4.length === 4) {
      setOutArea(false)
      // let r = await fetch("http://api.zipaddress.net/?zipcode=" + value)
      let r = await fetch(
        `https://madefor.github.io/postal-code-api/api/v1/${left3}/${right4}.json`
      )
      r = await r.json()
      const data = r.data[0].ja
      if (r.data) {
        setValue("zip", value)
        setValue("pref", data["prefecture"])
        setValue("addr1", data["address1"] + data["address2"])

        const e = extraDeliveryFee.map((v) => v.zip)
        const i = inScope99.map((v) => v.zip)
        if (e.includes(value) || i.includes(value)) {
          setDelivery(250)
        }
      }
    } else {
      setValue("pref", "")
      setValue("addr1", "")
      setOutArea(true)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 ">
      <div className="relative hidden sm:block border-r p-8">
        <CartDetail {...props} />
      </div>

      <div className="px-4 max-w-xl mx-auto">
        {outArea ? (
          <h3 className="text-center pt-12 pb-6 font-bold text-red-500">
            配達対象エリア外の地域です
          </h3>
        ) : (
          <h3
            className={`${
              isEmpty(errors) ? "text-gray-600" : "text-red-500"
            } text-center pt-12 pb-6 font-bold`}
            children="配送情報を入力してください。"
          />
        )}

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <fieldset className="mt-6">
            <legend
              className="block text-sm font-medium text-gray-700"
              children="お届け先情報"
            />

            <div className="mt-1 rounded-md shadow-sm -space-y-px">
              <div className="flex -space-x-px">
                <div className="w-1/2 flex-1 min-w-0">
                  <Field
                    name="zip"
                    label="郵便番号"
                    round="rounded-tl-md"
                    onChange={(e) =>
                      e.target.value.length > 6 && getZip(e.target.value)
                    }
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^\d{3}-?\d{4}$/,
                        message: "正しい郵便番号を入力してください。",
                      },
                    })}
                    onBlur={(e) => getZip(e.target.value)}
                  />
                </div>
                <div className="w-1/2 flex-1 min-w-0">
                  <Field
                    name="pref"
                    label="都道府県"
                    round="rounded-tr-md"
                    ref={register({ required: true })}
                  />
                </div>
              </div>

              <Field
                name="addr1"
                label="住所"
                ref={register({ required: true })}
              />
              <Field
                name="addr2"
                label="建物名・部屋番号"
                round="rounded-b-md"
                ref={register}
              />
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend
              className="block text-sm font-medium text-gray-700"
              children="お届け先情報"
            />
            <div className="mt-1 rounded-md shadow-sm -space-y-px">
              <Field
                name="email"
                label="メールアドレス"
                round="rounded-t-md"
                ref={register({
                  required: "必須項目",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "正しいメールアドレスを入力してください",
                  },
                })}
              />
              <Field
                name="name"
                label="氏名"
                ref={register({ required: true })}
              />
              <Field
                name="tel"
                label="電話番号"
                round="rounded-b-md"
                ref={register({ required: true })}
              />
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend
              className="block text-sm font-medium text-gray-700"
              children={
                hasHoliday ? (
                  <p>
                    お届け日時{" "}
                    <span className="text-red-400">
                      ご指定の曜日に定休日の店舗があります
                    </span>
                  </p>
                ) : (
                  <p>
                    お届け日時{" "}
                    <span className="text-gray-400">
                      当日配達は夕方のお届けになります
                    </span>
                  </p>
                )
              }
            />
            <div className="mt-1 rounded-md shadow-sm -space-y-px">
              <Controller
                name={"date"}
                control={control}
                defaultValue={startDate}
                render={({ onChange, value }) => (
                  <DatePicker
                    locale="ja"
                    className={`rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 relative block w-full   bg-transparent focus:z-10 sm:text-sm`}
                    selected={new Date(value)}
                    onChange={(date) => {
                      setDateNumber(getDay(date))
                      onChange(date)
                    }}
                    filterDate={getFilterDate}
                  />
                )}
              />
              <select
                ref={register({ required: true })}
                name="time"
                className={`rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 relative block w-full rounded-none  bg-transparent focus:z-10 sm:text-sm`}
              >
                {hours.map((v) => {
                  return <option key={v}>{v}</option>
                })}
              </select>
            </div>
          </fieldset>

          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                disabled={outArea || disableButton}
                type="submit"
                className="disabled:opacity-50 text-white bg-indigo-600 hover:bg-indigo-700 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
              >
                支払情報確認 <ChevRight />
              </button>
            </div>

            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/">
                <a
                  className="text-indigo-600 bg-white hover:bg-gray-50 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
                  children="戻る"
                />
              </Link>
            </div>
          </div>
          {/* <DevTool control={control} /> */}
        </form>
      </div>
    </div>
  )
}

const Field = React.forwardRef(
  ({ name, label, register, round = "rounded-none", ...rest }, ref) => {
    const { errors } = useForm()
    return (
      <div>
        <label htmlFor="tel" className="sr-only">
          {label}
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            name={name}
            id={name}
            ref={ref}
            className={`${round} focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 relative block w-full rounded-none  bg-transparent focus:z-10 sm:text-sm`}
            // className={`${
            //   errors.tel
            //     ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
            //     : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            // } relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm`}
            placeholder={label}
            {...rest}
          />
          {errors.tel && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
      </div>
    )
  }
)
