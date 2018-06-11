import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import dagger from '../../config/dagger'

let initialState = function () {
  return {
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
    observeAccount ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const address = rootState.web3.address
      dagger.on('latest:addr/' + address + '/tx/in', function(result) {
        // tx received
        console.log("latest tx", result)
      })
    }
  },
  getters:
  {
  }
}
