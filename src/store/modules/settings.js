import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import currencyDefaults from '@config/currencyDefaults'

const defaultNetworkProviders = {
  mainnetInfura: {url: 'wss://mainnet.infura.io/_ws', provider: 'Infura', blockchain: 'Ethereum', network: 'mainnet'},
  ropstenInfura: {url: 'wss://ropsten.infura.io/_ws', provider: 'Infura', blockchain: 'Ethereum', network: 'ropsten'},
  // rinkebyInfura: {url: 'wss://rinkeby.infura.io/ws', provider: 'Infura', blockchain: 'Ethereum', network: 'rinkeby'},
  // ropstenGetho: {url: 'wss://above-goat-651cb0b1dc67.getho.io/ws', provider: 'Getho.io', blockchain: 'Ethereum', network: 'ropsten'},
}

function initialState () {
  return {
    wallet: {address: null},
    gas: 42000,
    requiredConfirmationCount: 1,
    currency: 'jpy',
    selectedToken: 'eth',
    networkProvider: {
      selected: 'mainnetInfura',
      customRPCs: {
        '*': '', // 'name': 'url'
      }
    },
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
    fillables: ['wallet', 'gas', 'currency', 'selectedToken', 'config', 'requiredConfirmationCount', 'networkProvider']
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
    currency ({state, dispatch}, newVal) {
      dispatch('set', {currency: newVal})
      dispatch('cart/initializeTotalAmountAnimation', null, {root: true})
    }
  },
  getters:
  {
    availableNetworks: (state, getters) => {
      const defaultNetworks = Object.keys(defaultNetworkProviders).reduce((carry, key) => {
        const p = defaultNetworkProviders[key]
        carry[key] = {
          label: `${p.blockchain} (${p.network}) by ${p.provider}`,
          value: key
        }
        return carry
      }, {})
      const customNetworks = Object.keys(state.networkProvider.customRPCs).reduce((carry, key) => {
        if (key === '*') return carry
        carry[key] = {
          label: key,
          value: key
        }
        return carry
      }, {})
      return {...defaultNetworks, ...customNetworks, add: {label: 'add custom RPC', value: 'add'}}
    },
    selectedNetworkLabel: (state, getters) => {
      const net = state.networkProvider.selected
      const p = getters.availableNetworks[net]
      const customRPC = state.networkProvider.customRPCs[net]
      if (!p && !customRPC) return 'No network set'
      if (!p) return net
      return p.label
    },
    selectedNetworkURL: (state, getters) => {
      const net = state.networkProvider.selected
      const defaultProvider = defaultNetworkProviders[net]
      const customRPC = state.networkProvider.customRPCs[net]
      if (!defaultProvider && !customRPC) return null
      if (!defaultProvider) return customRPC
      return defaultProvider.url
    },
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
      return Object.keys(currencyDefaults).reduce((carry, key) => {
        carry[key] = {
          label: `${currencyDefaults[key].prefix} ${key.toUpperCase()}`,
          value: key
        }
        return carry
      }, {})
    },
  }
}
