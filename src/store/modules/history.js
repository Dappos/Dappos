import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

function initialState () {
  return {
    modal: {state: false},
    testVal: null,
  }
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
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch}, toggleState) {
      toggleState = (toggleState === undefined) ? !state.modal.state : toggleState
      dispatch('set/modal.state', toggleState)
    },
  },
  getters:
  {
  }
}
