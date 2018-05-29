let testItems = {
  'ice-coffee': {name: 'Ice Coffee', id: 'ice-coffee', prices: {jpy: 400, usd: 4}},
  'hot-coffee': {name: 'Hot Coffee', id: 'hot-coffee', prices: {jpy: 400, usd: 4}},
  'latte': {name: 'Latte', id: 'latte', prices: {jpy: 500, usd: 5}}
}

let initialState = function () {
  return {
    user: null,
    menuList: testItems,
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
    doIt ({state, getters, rootState, rootGetters, commit, dispatch},
    {id} = {}) {
      // getters.someOtherGetter // -> 'foo/someOtherGetter'
      // rootGetters.someOtherGetter // -> 'someOtherGetter'

      dispatch('someOtherAction') // -> 'foo/someOtherAction'
      dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

      commit('someMutation') // -> 'foo/someMutation'
      commit('someMutation', null, { root: true }) // -> 'someMutation'
    }
  },
  getters:
  {
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
