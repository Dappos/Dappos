import { defaultMutations } from 'vuex-easy-access'
import axios from 'axios'

function initialState () {
  return {
    ethTo: {
      wei: 1000000000000000000,
      kwei: 1000000000000000,
      mwei: 1000000000000,
      gwei: 1000000000,
      szabo: 1000000,
      finney: 1000,
      eth: 1,
    }
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
    getRate ({state, getters, rootState, rootGetters, commit, dispatch}, {currency = null} = {}) {
      if (!rootGetters['settings/availableCurrencies'][currency.toLowerCase()]) return
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
    },
    async convert ({state, getters, rootState, rootGetters, commit, dispatch}, {amount = 0, from = null, to = null} = {}) {
      // premise
      if (!from || !to || !amount || isNaN(amount)) return
      from = from.toLowerCase()
      to = to.toLowerCase()
      // check if eth value exists
      if (!state.ethTo[to]) return
      // start
      const rate = await dispatch('getRate', {currency: from})
      if (!rate) return
      let result = amount / rate
      result = result * state.ethTo[to]
      return result
    }
  },
  getters:
  {
  }
}
