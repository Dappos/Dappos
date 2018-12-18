import axios from 'axios'
import currencyDefaults from '../config/currencyDefaults'

export const ethTo = {
  wei: 1000000000000000000,
  kwei: 1000000000000000,
  mwei: 1000000000000,
  gwei: 1000000000,
  szabo: 1000000,
  finney: 1000,
  eth: 1,
}

const isFiat = currency => (currencyDefaults[currency.toLowerCase()])
const isETH = currency => (ethTo[currency.toLowerCase()])
// const isDAI = currency => (currency.toLowerCase() === 'dai')

/**
 * Gets the exchange rate of ETH ⇔ Fiat of a certain fiat currency
 *
 * @export
 * @param {string} currency Supports: jpy, usd, hkd, aud, twd, sgd, eur, gbp, krw
 * @param {string} [coingeckoId='ethereum'] id from coingecko (obtainable at https://www.coingecko.com/api/docs/v3#/coins/get_coins_list)
 * @returns The exchange rate
 */
export function getRate (currency, coingeckoId = 'ethereum') {
  if (!currency) return
  if (!currencyDefaults[currency.toLowerCase()]) return
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId.toLowerCase()}&vs_currencies=${currency.toLowerCase()}`
  return axios.get(url)
    .then(function (res) {
      const rate = res.data[coingeckoId.toLowerCase()][currency.toLowerCase()]
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
 * @param {string} from currency or token name as coingeckoId (eg. jpy, ethereum, ...)
 * @param {string} to currency or token name as coingeckoId (eg. jpy, ethereum, ...)
 * @returns {(number|Promise)} if (eth ⇔ eth) returns number | if (eth ⇔ fiat) returns a promise!
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
  if (isFiat(from) && isFiat(to)) return false
  return new Promise(async (resolve, reject) => {
    if (isFiat(from)) {
      const rate = await getRate(from, to)
      if (!rate) return
      let result = amount / rate
      if (isETH(to)) result = result * ethTo[to]
      return resolve(result)
    }
    if (isFiat(to)) {
      const rate = (isETH(to)) ? ethTo[from] : 1
      if (!rate) return
      let result = amount / rate
      const rate2 = await getRate(to, from)
      result = result * rate2
      return resolve(result)
    }
    reject(new Error('something bad happened'))
  })
}
