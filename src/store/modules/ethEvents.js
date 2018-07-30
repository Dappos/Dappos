import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { countConfirmations } from '@helpers/web3'
import startConfetti from '@helpers/Confetti'
import web3 from '@config/web3'
import erc20Abi from '@helpers/erc20Abi'

function initialState () {
  return {
    subscription: null,
    transactions: {
      '*': {
        from: null,
        to: null,
        value: null,
      },
    },
    confirmationWatchers: {
      '*': null // setInterval
    },
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
    '-confirmationWatchers.*': (state) => {
      console.log('pzz → ')
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
            txn.id = txnHash
            // txn fields are:
            // blockHash, blockNumber, from, gas, gasPrice, hash, input, nonce, r, s, to, transactionIndex, v, val
            dispatch('foundTxn', txn)
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
    watchConfirmations ({state, getters, rootState, rootGetters, commit, dispatch}, txnHash) {
      const receits = rootGetters['history/receitByTxnHash']
      const confirmationWatcher = setInterval(_ => {
        const txnRef = receits[txnHash]
        countConfirmations(txnHash).then(count => {
          if (count && count > txnRef.confirmations) {
            dispatch('history/patch', {id: receits[txnHash].id, confirmations: count}, {root: true})
            if (count >= rootState.settings.requiredConfirmationCount) {
              dispatch('modals/set/cart.payment.stage', 3, {root: true})
              clearInterval(state.confirmationWatchers[txnHash])
              dispatch('delete/confirmationWatchers.*', txnHash)
              startConfetti(1250)
            }
          }
        })
      }, 1500)
      dispatch('set/confirmationWatchers.*', {[txnHash]: confirmationWatcher})
    },
    foundTxn ({state, getters, rootState, rootGetters, commit, dispatch}, txn) {
      console.log('found TXN! → ', txn)
      dispatch('set/transactions.*', txn)
      const paymentRequest = rootState.cart.paymentRequest
      console.log('Number(txn.value) → ', Number(txn.value))
      console.log('Number(paymentRequest.wei) → ', Number(paymentRequest.wei))
      const txnValueEnough = (Number(txn.value) >= Number(paymentRequest.wei))
      console.log('txnValueEnough → ', txnValueEnough)
      if (Number(txn.value) >= Number(paymentRequest.wei)) {
        dispatch('cart/set/foundTransactions.*', {[txn.hash]: new Date()}, {root: true})
        dispatch('history/insert', Object.assign(paymentRequest, {txn}), {root: true})
        dispatch('modals/set/cart.payment.stage', 2, {root: true})
        dispatch('watchConfirmations', txn.hash)
      }
    },
    subscribeERC20 ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const posAddress = rootState.settings.wallet.address
      const erc20Address = '0xa8e9fa8f91e5ae138c74648c9c304f1c75003a8d' // Ropsten ZRX
      const erc20Contract = new web3.eth.Contract(erc20Abi, erc20Address)
      erc20Contract.events.Transfer({fromBlock: 'latest', filter: {_to: posAddress}})
        .on('data', event => {
          console.log('ERC20 token transfer', {
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            from: event.returnValues.from,
            to: event.returnValues.to,
            value: event.returnValues.value / Math.pow(10, 6),
          })
        })
    },
  },
  getters:
  {
  }
}
