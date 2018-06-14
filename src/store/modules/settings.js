import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import currency from './settingsCurrency'
import copyObj from '../../helpers/copyObj'

function initialState () {
  return {
    walletAddress: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gas: 42000,
    modal: {state: false}
  }
}

export default {
  namespaced: true,
  modules: {
    currency,
  },
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
    replaceSettings (state, payload) {
      // console.log('payload → ', payload)
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key])
      })
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.modal.state : toggleState
      commit('SET_MODAL.STATE', toggleState)
    },
  },
  getters:
  {
  }
}
