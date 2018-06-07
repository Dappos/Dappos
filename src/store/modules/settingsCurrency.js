const defaults = {
  jpy: {
    decimal: '.',
    thousands: ',',
    prefix: '¥',
    suffix: '',
    precision: 0,
    masked: false
  },
  usd: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  }
}
function initialState () {
  return {
    defaults,
    currency: 'jpy',
    config: {
      // only set these if you want to overwrite defaults.
    }
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
    config: (state, getters, rootState, rootGetters) => {
      return Object.assign(
        state.defaults[state.currency],
        state.config
      )
    },
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
