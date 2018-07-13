import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import web3 from '@config/web3'

function initialState () {
  return {
    subscription: null,
    transactions: {},
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
      const posAddress = rootState.settings.wallet.address
      const subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
        if (error) {
          return console.error('subscribe error:', error, result)
        }
      }).on('data', (txnHash) => {
        web3.eth.getTransaction(txnHash, (error, txn) => {
          if (error) console.error('getTransaction error:', error)
          if (!error && txn && txn.to === posAddress) {
            dispatch('foundTransaction', {
              id: txnHash,
              txn: txn.from,
              wei: txn.value,
              eth: web3.utils.fromWei(txn.value, 'ether')
            })
          }
          if (txn) console.log('txn → ', (txn.to === posAddress))
        })
      })
      dispatch('set/subscription', subscription)
    },
    unsubscribeAccount ({state, getters, rootState, rootGetters, commit, dispatch}) {
      state.subscription.unsubscribe((error, success) => {
        if (success) {
          console.log('Successfully unsubscribed!')
        } else {
          console.error(error)
        }
      })
    },
    foundTransaction ({state, getters, rootState, rootGetters, commit, dispatch}, txn) {
      console.log('found TXN! → ', txn)
      state.txn[txn.id] = txn
    },
  },
  getters:
  {
  }
}
