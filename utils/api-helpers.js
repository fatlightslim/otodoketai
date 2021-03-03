export async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message)
  }
}

export function cleanUp(items) {
  return items.map((v) => {
    const { id, price, itemTotal, ...rest } = v
    return {
      ...rest,
    }
  })
}

export function calcFee(cartTotal) {
  let fee = 300
  if (cartTotal > 10000 && cartTotal <= 30000) {
    fee = 400
  } else if (cartTotal > 30000 && cartTotal <= 100000) {
    fee = 600
  } else if (cartTotal > 100000 && cartTotal <= 300000) {
    fee = 1000
  } else if (cartTotal > 300000 && cartTotal <= 500000) {
    fee = 2000
  } else if (cartTotal > 500000 && cartTotal <= 600000) {
    fee = 6000
  } else if (cartTotal > 600000) {
    fee = Math.round(cartTotal/100000)*1000
  }
  return fee * 1.1
}
