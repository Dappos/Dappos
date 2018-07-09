import { defaultMutations } from 'vuex-easy-access'
import wallet from '@config/wallet'

function initialState () {
  return {
    address: null,
    isMainnet: null,
    wallet
  }
}

async function isMainNetwork (wallet) {
  if (!wallet) return
  const networkID = await wallet.eth.net.getId()
  return networkID === 1
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
    async getAddress ({state, getters, rootState, rootGetters, commit, dispatch}, {id} = {}) {
      const accounts = await wallet.eth.getAccounts()
      commit('SET_ADDRESS', accounts[0])
      commit('SET_ISMAINNET', await isMainNetwork(wallet))
    }
  },
  getters:
  {
  }
}
