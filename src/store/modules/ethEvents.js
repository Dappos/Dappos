import Dagger from 'eth-dagger'

let initialState = function () {
  const dagger = new Dagger('wss://kovan.dagger.matic.network')

  return {
    dagger
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
    observeAccount ({state, getters, rootState, rootGetters, commit, dispatch},
    {id} = {}) {
      const address = rootState.web3.address
      state.dagger.on('latest:addr/' + address + '/tx/in', function(result) {
        // tx received
        console.log("latest tx", result)
      })
    }
  },
  getters:
  {
    convert: (state, getters, rootState, rootGetters) =>
    ({amount, from, to}) => {
      return amount
    }
  }
}