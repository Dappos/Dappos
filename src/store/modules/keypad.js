import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'

function initialState () {
  return {
    input: 0,
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
    tap ({state, getters, rootState, rootGetters, commit, dispatch},
    input) {
      // console.log('state.input → ', state.input)
      const precisionCorrection = 10 ** rootGetters['settings/currencyConfig'].precision
      // console.log('precisionCorrection → ', precisionCorrection)
      const oldVal = Math.floor(state.input * precisionCorrection)
      // console.log('oldVal → ', oldVal)
      const newVal = Number(oldVal.toString() + input.toString()) / precisionCorrection
      commit('SET_INPUT', newVal)
      // console.log('state.input → ', state.input)
    },
    clear ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('SET_INPUT', 0)
    },
    add ({state, getters, rootState, rootGetters, commit, dispatch}) {
      dispatch('cart/addItem', {price: state.input}, {root: true})
      dispatch('clear')
    },
  },
  getters:
  {
  }
}
