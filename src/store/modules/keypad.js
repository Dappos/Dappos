import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

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
      const newState = initialState()
      Object.assign(state, newState)
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    tap ({state, getters, rootState, rootGetters, commit, dispatch}, input) {
      // console.log('state.input → ', state.input)
      const precisionCorrection = 10 ** rootGetters['settings/currencyConfig'].precision
      // console.log('precisionCorrection → ', precisionCorrection)
      const oldVal = Math.floor(state.input * precisionCorrection)
      if (oldVal.toString().length >= 9) return
      // console.log('oldVal → ', oldVal)
      const newVal = Number(oldVal.toString() + input.toString()) / precisionCorrection
      dispatch('set/input', newVal)
      // console.log('state.input → ', state.input)
    },
    clear ({state, getters, rootState, rootGetters, commit, dispatch}) {
      dispatch('set/input', 0)
    },
    add ({state, getters, rootState, rootGetters, commit, dispatch}) {
      dispatch('cart/addItem', {
        prices: {[this.get('settings/currency')]: state.input}
      }, {root: true})
      dispatch('clear')
    },
  },
  getters:
  {
  }
}
