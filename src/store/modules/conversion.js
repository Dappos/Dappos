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
      let newState = initialState()
      Object.assign(state, newState)
    },
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key])
      })
    }
  },
  actions:
  {
    getRate ({state, getters, rootState, rootGetters, commit, dispatch},
    {currency = null} = {}) {
      if (!rootGetters['settings/currency/availableCurrencies'][currency.toLowerCase()]) return
      currency = currency.toUpperCase()
      let url = 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=' + currency
      return axios.get(url)
      .then(function (res) {
        let rate = res.data.data.quotes[currency].price
        if (isNaN(rate)) return
        return rate
      })
      .catch(function (error) {
        console.error(error)
        return false
      })
    },
    async convert ({state, getters, rootState, rootGetters, commit, dispatch},
    {amount = 0, from = null, to = null} = {}) {
      // premise
      if (!from || !to || !amount || isNaN(amount)) return
      from = from.toLowerCase()
      to = to.toLowerCase()
      // check if eth value exists
      if (!state.ethTo[to]) return
      // start
      let rate = await dispatch('getRate', {currency: from})
      if (!rate) return
      let result = amount / rate
      result = result * state.ethTo[to]
      return result
    }
  },
  getters:
  {
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
