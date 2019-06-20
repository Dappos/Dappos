import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import currencyDefaults from '@config/currencyDefaults'
import defaultNetworkProviders from '@config/networkProviders'
import defaultSelectableTokens from '@config/selectableTokens'

function initialState () {
  return {
    wallet: {address: null},
    gas: 42000,
    requiredConfirmationCount: 1,
    currency: 'jpy',
    selectedToken: 'eth',
    tokens: {
      customTokens: {
        '*': {
          id: '*', // id should be symbol
          decimals: 18,
          erc20: true,
          fiatConversion: true, // if disabled will charge customer the amount filled in.
          coingeckoId: '', // obtainable at https://www.coingecko.com/api/docs/v3#/coins/get_coins_list
          networks: {
            '*': {address: ''}, // id should be networkProvider name
          },
          icon: '', // eg. 'fab fa-dai-icon'
          sublabel: '' // eg. 'USD stabletoken by MakerDAO'
        }
      },
    },
    networkProvider: {
      selected: 'Ethereum (mainnet) by Infura', // 'name' used as ID
      customRPCs: {
        '*': {name: '*', url: ''} // name === id
      },
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
    fillables: [
      'wallet',
      'gas',
      'currency',
      'selectedToken',
      'config',
      'requiredConfirmationCount',
      'networkProvider',
      'tokens'
    ],
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
      const networks = Object.assign({}, defaultNetworkProviders, state.networkProvider.customRPCs)
      return Object.values(networks)
        .reduce((carry, network) => {
          if (network.name === '*') return carry
          carry[network.name] = network
          return carry
        }, {})
    },
    selectedNetworkObject: (state, getters) => {
      const networks = getters.availableNetworks
      const selected = state.networkProvider.selected
      return networks[selected]
    },
    availableTokens: (state, getters) => {
      const tokens = Object.assign({}, defaultSelectableTokens, state.tokens.customTokens)
      return Object.values(tokens)
        .reduce((carry, token) => {
          if (token.id === '*' || !token.networks[state.networkProvider.selected]) {
            return carry
          }
          carry[token.id] = token
          return carry
        }, {})
    },
    availableTokensOnlyErc20: (state, getters) => {
      const tokens = getters.availableTokens
      return Object.values(tokens)
        .reduce((carry, token) => {
          if (!token.erc20) return carry
          carry[token.id] = token
          return carry
        }, {})
    },
    selectedTokenObject: (state, getters) => {
      return getters.availableTokens[state.selectedToken]
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
