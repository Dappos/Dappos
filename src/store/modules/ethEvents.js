import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { countConfirmations } from '@helpers/web3'
import convert from '@helpers/conversion'
import startConfetti from '@helpers/Confetti'
import getWeb3 from '@config/web3'
import erc20Abi from '@config/erc20Abi'

function initialState () {
  return {
    subscription: null,
    firstConfetti: false,
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
    startConfetti (state) {
      if (!state.firstConfetti) {
        startConfetti(1250)
        state.firstConfetti = true
      }
    },
    // '-confirmationWatchers.*': (state) => {
    //   console.log('pzz → ')
    // },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    watchTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      dispatch('watchETHTransactions')
      dispatch('watchErc20Transactions')
    },
    watchETHTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const web3 = getters.web3
      const posAddress = rootState.settings.wallet.address
      const subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
        if (error) {
          return console.error('subscribe error:', error, result)
        }
      }).on('data', (txnHash) => {
        web3.eth.getTransaction(txnHash, (error, txn) => {
          // txn fields are:
          // blockHash, blockNumber, from, gas, gasPrice, hash, input, nonce, r, s, to, transactionIndex, v, val
          if (error) console.error('getTransaction error:', error)
          if (!error && txn && txn.to === posAddress) dispatch('foundTxn', txn)
          if (txn) console.log('txn → ', (txn.to === posAddress))
        })
      })
      dispatch('set/subscription', subscription)
    },
    watchErc20Transactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const web3 = getters.web3
      const posAddress = rootState.settings.wallet.address
      const erc20Address = '0xa8e9fa8f91e5ae138c74648c9c304f1c75003a8d' // Ropsten ZRX
      const erc20Contract = new web3.eth.Contract(erc20Abi, erc20Address)
      erc20Contract.events.Transfer({fromBlock: 'latest', filter: {_to: posAddress}})
        .on('data', event => {
          const txn = {
            blockNumber: event.blockNumber,
            hash: event.transactionHash,
            from: event.returnValues.from,
            to: event.returnValues.to,
            value: event.returnValues.value
          }
          if (event && txn.to === posAddress) dispatch('foundTxn', txn)
          if (txn) console.log('txn → ', (txn.to === posAddress), 'event → ', event, 'txn → ', txn)
        })
    },
    unwatchTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
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
        countConfirmations(getters.web3, txnHash).then(count => {
          if (count && count > txnRef.confirmations) {
            dispatch('history/patch', {id: receits[txnHash].id, confirmations: count}, {root: true})
            if (count >= rootState.settings.requiredConfirmationCount) {
              dispatch('modals/set/cart.payment.stage', 3, {root: true})
              commit('startConfetti')
            }
          }
        })
      }, 1500)
      dispatch('set/confirmationWatchers.*', {[txnHash]: confirmationWatcher})
    },
    unwatchConfirmations ({state, getters, rootState, rootGetters, commit, dispatch}) {
      dispatch('set/firstConfetti', false)
      Object.keys(state.confirmationWatchers)
        .forEach(w => {
          clearInterval(state.confirmationWatchers[w])
          dispatch('delete/confirmationWatchers.*', w)
        })
    },
    foundTxn ({state, getters, rootState, rootGetters, commit, dispatch}, txn) {
      console.log('found TXN! → ', txn)
      dispatch('set/transactions.*', {[txn.hash]: txn})
      const paymentRequest = rootState.cart.paymentRequest
      const txnValue = convert(txn.value, 'wei', 'eth')
      if (paymentRequest.symbol.toLowerCase() === 'dai') console.log('txn → ', txn)
      const txnValueEnough = (Number(txnValue) >= Number(paymentRequest.value))
      if (txnValueEnough) {
        dispatch('history/insert', Object.assign(paymentRequest, {txn}), {root: true})
        dispatch('watchConfirmations', txn.hash)
        dispatch('modals/set/cart.payment.stage', 2, {root: true})
      }
    },
  },
  getters:
  {
    web3: (state, getters, rootState, rootGetters) => {
      const networkProvider = rootGetters['settings/selectedNetworkURL']
      return getWeb3(networkProvider)
    },
    watcherConfirmationCount (state, getters, rootState, rootGetters) {
      const txnHash = Object.keys(state.confirmationWatchers).filter(k => k !== '*')[0]
      const receits = rootGetters['history/receitByTxnHash']
      const txnRef = receits[txnHash]
      if (!txnRef) return 0
      return txnRef.confirmations
    }
  }
}
