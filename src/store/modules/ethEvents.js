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
    confirmationWatcher: null,
    confirmationWatcherTxnHash: null,
    firstConfetti: false,
    transactions: {
      '*': {
        from: null,
        to: null,
        value: 0,
      },
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
    watchTransactions ({state, getters, rootState, rootGetters, commit, dispatch}, selectedToken) {
      if (selectedToken === 'eth') return dispatch('watchETHTransactions')
      if (selectedToken === 'dai') return dispatch('watchErc20Transactions', selectedToken)
      return Error('something went wrong')
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
    watchErc20Transactions ({state, getters, rootState, rootGetters, commit, dispatch}, selectedToken) {
      const web3 = getters.web3
      const posAddress = rootState.settings.wallet.address
      const tokens = rootGetters['settings/availableTokensOnlyErc20']
      const tokenInfo = tokens[selectedToken]
      const selectedNetwork = rootGetters['settings/selectedNetworkObject'].name
      if (!tokenInfo || !tokenInfo.networks) throw Error('something went wrong')
      const erc20ContractAddress = tokenInfo.networks[selectedNetwork].address
      if (!erc20ContractAddress) throw Error('something went wrong. Erc20 address not found...')
      const erc20Contract = new web3.eth.Contract(erc20Abi, erc20ContractAddress)
      const subscription = erc20Contract.events.Transfer({fromBlock: 'latest', filter: {_to: posAddress}})
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
      dispatch('set/subscription', subscription)
    },
    unwatchTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      if (!state.subscription || !state.subscription.unsubscribe) return
      state.subscription.unsubscribe((error, success) => {
        if (success) {
          console.log('Successfully unsubscribed!')
        } else {
          console.error(error)
        }
      })
    },
    watchConfirmations ({state, getters, rootState, rootGetters, commit, dispatch}, txnHash) {
      const receits = rootState.history.receits
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
      dispatch('set/confirmationWatcher', confirmationWatcher)
      dispatch('set/confirmationWatcherTxnHash', txnHash)
    },
    unwatchConfirmations ({state, getters, rootState, rootGetters, commit, dispatch}) {
      clearInterval(state.confirmationWatcher)
      dispatch('set/confirmationWatcher', null)
      dispatch('set/confirmationWatcherTxnHash', null)
    },
    unwatch ({state, getters, rootState, rootGetters, commit, dispatch}) {
      console.log('unwatch')
      dispatch('unwatchTransactions')
      dispatch('unwatchConfirmations')
      commit('resetStateData')
    },
    foundTxn ({state, getters, rootState, rootGetters, commit, dispatch}, txn) {
      console.log('found TXN! → ', txn)
      dispatch('set/transactions.*', {[txn.hash]: txn})
      const lastTransaction = txn.hash
      dispatch('sumTxns', lastTransaction)
    },
    sumTxns ({state, getters, rootState, rootGetters, commit, dispatch}, lastTransaction) {
      const paymentRequest = rootState.cart.paymentRequest
      // const paidInDai = (paymentRequest.symbol.toLowerCase() === 'dai')
      // if (paidInDai) console.log('txn → ', txn)
      const txns = getters.transactionsArray
      const txnTotalValue = getters.transactionsTotalValueConverted
      const txnValueEnough = (Number(txnTotalValue) >= Number(paymentRequest.value))
      if (txnValueEnough) {
        dispatch('history/insert', Object.assign(paymentRequest, {txns, id: lastTransaction}), {root: true})
        dispatch('watchConfirmations', lastTransaction)
        dispatch('modals/set/cart.payment.stage', 2, {root: true})
      }
    },
  },
  getters:
  {
    transactionsArray: (state, getters, rootState, rootGetters) => {
      return Object.keys(state.transactions).filter(k => k !== '*').map(k => state.transactions[k])
    },
    transactionsTotalValue: (state, getters, rootState, rootGetters) => {
      const txns = getters.transactionsArray
      return txns.reduce((carry, txn) => {
        const value = Number(txn.value)
        if (!value) return carry
        return carry + value
      }, 0)
    },
    transactionsTotalValueConverted: (state, getters, rootState, rootGetters) => {
      const txnsTotal = getters.transactionsTotalValue
      return convert(txnsTotal, 'wei', 'eth') // DAI also needs same decimal conversion
    },
    web3: (state, getters, rootState, rootGetters) => {
      const networkProvider = rootGetters['settings/selectedNetworkObject'].url
      return getWeb3(networkProvider)
    },
    watcherConfirmationCount (state, getters, rootState, rootGetters) {
      const txnHash = state.confirmationWatcherTxnHash
      const receits = rootState.history.receits
      const txnRef = receits[txnHash]
      if (!txnRef) return 0
      return txnRef.confirmations
    }
  }
}
