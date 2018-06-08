import defaults from '../../config/currencyDefaults'

function initialState () {
  return {
    defaults,
    currency: 'jpy',
    config: {
      // only set these if you want to overwrite defaults.
    },
    coinmarketcapCurrencies: [
      'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'
    ],
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
    setCurrency ({state, getters, rootState, rootGetters, commit, dispatch},
    {currency} = {}) {
      if (!getters.availableCurrencies[currency]) return
      state.currency = currency.toLowerCase()
    }
  },
  getters:
  {
    config: (state, getters, rootState, rootGetters) => {
      return Object.assign(
        state.defaults[state.currency],
        state.config
      )
    },
    availableCurrencies: (state, getters, rootState, rootGetters) => {
      return Object.keys(state.defaults)
        .reduce((carry, key) => {
          const info = {
            label: `${state.defaults[key].prefix} ${key.toUpperCase()}`,
            value: key
          }
          carry[key] = info
          return carry
        }, {})
    },
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
