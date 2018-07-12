import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import web3 from '@config/web3'

function initialState () {
  return {
    subscription: null
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
    subscribeAccount ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const address = rootState.settings.wallet.address
      console.log('wallet address:' + address)
      const subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
        if (error) {
          console.log('subscribe error:', error, result)
        }
      }).on('data', (transactionHash) => {
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
      dispatch('set/subscription', subscription)
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
