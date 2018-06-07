import Web3 from 'web3'

function initialState () {
  let myWeb3 = new Web3()
  if (typeof web3 !== 'undefined') {
    myWeb3 = new Web3(web3.currentProvider)
  } else {
    // MetaMask is not enabled
    // Should show an alert
    myWeb3 = new Web3("ws://localhost:7545")
  }

  return {
    stateValue: null,
    web3: myWeb3,
    address: null,
    isMainnet: null
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
    async getAddress ({state, getters, rootState, rootGetters, commit, dispatch},
    {id} = {}) {
      var accounts = await state.web3.eth.getAccounts()
      state.address = accounts[0]
      state.isMainnet = await isMainNetwork(state.web3)
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

async function isMainNetwork(web3) {
  const networkID = await web3.eth.net.getId()
  return networkID === 1
}