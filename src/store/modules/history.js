import { defaultMutations } from 'vuex-easy-access'

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
    ...defaultMutations(initialState())
  },
  actions:
  {
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch}, toggleState) {
      toggleState = (toggleState === undefined) ? !state.modal.state : toggleState
      commit('SET_MODAL.STATE', toggleState)
    },
  },
  getters:
  {
  }
}
