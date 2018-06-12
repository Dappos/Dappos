import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import web3 from '../../config/web3'

function initialState () {
  return {
    address: null,
    isMainnet: null
  }
}

async function isMainNetwork(web3) {
  if (!web3) return
  const networkID = await web3.eth.net.getId()
  return networkID === 1
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
    async getAddress ({state, getters, rootState, rootGetters, commit, dispatch},
    {id} = {}) {
      const accounts = await web3.eth.getAccounts()
      commit('SET_ADDRESS', accounts[0])
      commit('SET_ISMAINNET', await isMainNetwork(web3))
    }
  },
  getters:
  {
  }
}
