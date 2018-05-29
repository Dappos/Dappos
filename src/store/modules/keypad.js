let initialState = function () {
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
    }
  },
  actions:
  {
    tap ({state, getters, rootState, rootGetters, commit, dispatch},
    input) {
      console.log('state.input → ', state.input)
      const precisionCorrection = 10 ** rootGetters['settings/currency/config'].precision
      console.log('precisionCorrection → ', precisionCorrection)
      let oldVal = Math.floor(state.input * precisionCorrection)
      console.log('oldVal → ', oldVal)
      state.input = Number(oldVal.toString() + input.toString()) / precisionCorrection
      console.log('state.input → ', state.input)
    },
    clear ({state, getters, rootState, rootGetters, commit, dispatch}) {
      state.input = 0
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
