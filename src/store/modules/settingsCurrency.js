import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import defaults from '../../config/currencyDefaults'
// let coinmarketcapCurrencies = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR']

function initialState () {
  return {
    currency: 'jpy',
    config: {
      // only set these if you want to overwrite defaults.
    },
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
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
    'setCurrency': ({commit, dispatch}, choice) => {
      commit('SET_CURRENCY', choice)
      dispatch('firestore/patch', 'userSettingsDoc', {root: true})
    },
  },
  getters:
  {
    currency: (state, getters) => {
      return getters.availableCurrencies[state.currency].label
    },
    config: (state, getters, rootState, rootGetters) => {
      return Object.assign(
        defaults[state.currency],
        state.config
      )
    },
    availableCurrencies: (state, getters, rootState, rootGetters) => {
      return Object.keys(defaults)
        .reduce((carry, key) => {
          const info = {
            label: `${defaults[key].prefix} ${key.toUpperCase()}`,
            value: key
          }
          carry[key] = info
          return carry
        }, {})
    },
  }
}
