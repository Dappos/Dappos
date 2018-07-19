import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import currencyDefaults from '@config/currencyDefaults'

function initialState () {
  return {
    wallet: {address: null},
    gas: 42000,
    requiredConfirmationCount: 1,
    currency: 'jpy',
    config: {
      // only set these if you want to overwrite defaults.
    },
  }
}

export default {
  // vuex-easy-firestore config:
  firestorePath: 'users/{userId}/data/settings',
  firestoreRefType: 'doc',
  moduleName: 'settings',
  statePropName: '',
  sync: {
    fillables: ['wallet', 'gas', 'currency', 'config', 'requiredConfirmationCount']
  },
  // module:
  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    replaceSettings (state, payload) {
      // console.log('payload → ', payload)
      Object.keys(payload).forEach(key => {
        this._vm.$set(state, key, payload[key])
      })
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
  },
  getters:
  {
    currencyLabel: (state, getters) => {
      return getters.availableCurrencies[state.currency].label
    },
    currencyConfig: (state, getters, rootState, rootGetters) => {
      return Object.assign(
        {},
        currencyDefaults[state.currency],
        state.config
      )
    },
    availableCurrencies: (state, getters, rootState, rootGetters) => {
      return Object.keys(currencyDefaults)
        .reduce((carry, key) => {
          const info = {
            label: `${currencyDefaults[key].prefix} ${key.toUpperCase()}`,
            value: key
          }
          carry[key] = info
          return carry
        }, {})
    },
  }
}
