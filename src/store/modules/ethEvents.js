import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import web3 from '../../config/web3'

let initialState = function () {
  const subscription = null
  return {
    subscription
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
    subscribeAccount ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const wallet = rootState.wallet
      const address = wallet.address
      console.log('wallet address:' + address)
      
      state.subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
        if (error) {
          console.log('subscribe error:', error, result)
        }
      }).on("data", (transactionHash) => {
          web3.eth.getTransaction(transactionHash, (error, tx) => {
            if (!error) {
              if (tx !== null) {
                console.log(transactionHash, tx.from, tx.to, web3.utils.fromWei(tx.value, 'ether'))
              } else {
                console.log('tx is null:', transactionHash)
              }
            } else {
              console.log('getTransaction error:', error)
            }
          })
      })
    },
    unsubscribeAccount ({state, getters, rootState, rootGetters, commit, dispatch}) {
      state.subscription.unsubscribe((error, success) => {
        if (success) {
          console.log('Successfully unsubscribed!')
        } else {
          console.log(error)
        }
      })
    }
  },
  getters:
  {
  }
}
