import { uid } from 'quasar'

let initialState = function () {
  return {
    totalAmount: 0,
    totalCount: 0,
    items: []
  }
}

export default {
  namespaced: true,
  // modules: {  },
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
    addItem ({state, getters, rootState, rootGetters, commit, dispatch},
    payload) {
      payload.price = (payload.price === undefined)
        ? payload.prices[rootState.settings.currency.currency]
        : payload.price
      state.items.push(payload)
    }
  },
  getters:
  {
    totalAmount: (state, getters, rootState, rootGetters) => {
      return state.items.reduce((carry, item) => { return carry + item.price }, 0)
    },
    itemsOverview: (state, getters, rootState, rootGetters) => {
      let items = state.items.reduce((carry, item) => {
        let id = (!item.id) ? uid() : item.id
        if (!carry[id]) carry[id] = {count: 0}
        Object.assign(carry[id], item)
        carry[id].count++
        return carry
      }, {})
      return items
    },
  }
}
