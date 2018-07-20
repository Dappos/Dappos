import axios from 'axios'
import currencyDefaults from '@config/currencyDefaults'

export const ethTo = {
  wei: 1000000000000000000,
  kwei: 1000000000000000,
  mwei: 1000000000000,
  gwei: 1000000000,
  szabo: 1000000,
  finney: 1000,
  eth: 1,
}

function isFiat (currency) {
  currency = currency.toLowerCase()
  return (currencyDefaults[currency])
}

function isETH (currency) {
  currency = currency.toLowerCase()
  return (ethTo[currency])
}

/**
 * Gets the exchange rate of ETH ⇔ Fiat of a certain fiat currency
 *
 * @export
 * @param {*} currency Supports: jpy, usd, hkd, aud, twd, sgd, eur, gbp, krw
 * @returns The exchange rate
 */
export function getRate (currency) {
  if (!currency) return
  if (!currencyDefaults[currency.toLowerCase()]) return
  currency = currency.toUpperCase()
  const url = 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=' + currency
  return axios.get(url)
    .then(function (res) {
      const rate = res.data.data.quotes[currency].price
      if (isNaN(rate)) return
      return rate
    })
    .catch(function (error) {
      console.error(error)
      return false
    })
}
/**
 * Convert fiat ⇔ eth
 *
 * @export
 * @param {number} amount The amount to convert
 * @param {string} from
 * @param {string} to The amount
 * @returns {number|Promise} if (eth ⇔ eth) returns number | if (eth ⇔ fiat) returns a promise!
 */
export default function convert (amount, from, to) {
  // premise
  if (!from || !to || !amount || isNaN(amount)) return false
  from = from.toLowerCase()
  to = to.toLowerCase()
  if (isETH(from) && isETH(to)) {
    const rate = ethTo[from]
    let result = amount / rate
    result = result * ethTo[to]
    return result
  }
  return new Promise(async (resolve, reject) => {
    if (isFiat(from) && isETH(to)) {
      const rate = await getRate(from)
      if (!rate) return
      let result = amount / rate
      result = result * ethTo[to]
      return resolve(result)
    }
    if (isETH(from) && isFiat(to)) {
      const rate = ethTo[from]
      if (!rate) return
      let result = amount / rate
      const rate2 = await getRate(to)
      result = result * rate2
      return resolve(result)
    }
    reject(new Error('something bad happened'))
  })
}
