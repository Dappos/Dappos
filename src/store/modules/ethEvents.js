import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { countConfirmations, instanciateWeb3 } from '@helpers/web3'
// import convert from '@helpers/conversion'
import startConfetti from '@helpers/Confetti'
import erc20Abi from '@config/erc20Abi'

function initialState () {
  return {
    subscription: null,
    confirmationWatcher: null,
    confirmationWatcherTxnHash: null,
    firstConfetti: false,
    startBlock: null,
    manuallyCheckedUntil: null,
    erc20Contract: null,
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
      if (selectedToken === 'eth' || selectedToken === 'xDai') return dispatch('watchETHTransactions')
      return dispatch('watchErc20Transactions', selectedToken)
    },
    watchETHTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const web3 = getters.web3
      web3.eth.getBlockNumber()
        .then(blockNr => {
          dispatch('set/startBlock', blockNr)
        })
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
      web3.eth.getBlockNumber()
        .then(blockNr => {
          dispatch('set/startBlock', blockNr)
        })
      const posAddress = rootState.settings.wallet.address
      const tokenInfo = rootGetters['settings/selectedTokenObject']
      const selectedNetwork = rootGetters['settings/selectedNetworkObject'].name
      if (!tokenInfo || !tokenInfo.networks) throw Error('something went wrong')
      const erc20ContractAddress = tokenInfo.networks[selectedNetwork].address
      if (!erc20ContractAddress) throw Error('something went wrong. Erc20 address not found...')
      const erc20Contract = new web3.eth.Contract(erc20Abi, erc20ContractAddress)
      dispatch('set/erc20Contract', erc20Contract)
      const subscription = erc20Contract.events.Transfer({fromBlock: 'latest', filter: {_to: posAddress}})
        .on('data', event => {
          const txn = getters.parseEventIntoTxn(event)
          if (event && txn.to === posAddress) dispatch('foundTxn', txn)
          // if (txn) console.log('txn → ', (txn.to === posAddress), 'event → ', event, 'txn → ', txn)
        })
      dispatch('set/subscription', subscription)
    },
    unwatchTransactions ({state, getters, rootState, rootGetters, commit, dispatch}) {
      if (!state.subscription || !state.subscription.unsubscribe) return
      state.subscription.unsubscribe((error, success) => {
        if (success) return console.log('Successfully unsubscribed!')
        console.error(error)
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
    async manualTransactionCheck ({dispatch, state, getters}, selectedToken) {
      const web3 = getters.web3
      const manuallyCheckedUntil = state.manuallyCheckedUntil || state.startBlock
      const currentBlock = await web3.eth.getBlockNumber()
      const checkRange = {
        from: manuallyCheckedUntil,
        to: currentBlock
      }
      if (selectedToken === 'eth' || selectedToken === 'xDai') return dispatch('manualETHTransactionCheck', checkRange)
      return dispatch('manualErc20TransactionCheck', checkRange)
    },
    async manualETHTransactionCheck ({state, dispatch, getters, rootState}, {from, to}) {
      const web3 = getters.web3
      const posAddress = rootState.settings.wallet.address
      const returnTransactionObjects = true
      while (from <= to) {
        web3.eth.getBlock(from, returnTransactionObjects)
          .then(block => {
            block.transactions.forEach(txn => {
              if (txn && txn.to === posAddress) dispatch('foundTxn', txn)
            })
          })
        from++
      }
      dispatch('set/manuallyCheckedUntil', from)
    },
    async manualErc20TransactionCheck ({state, dispatch, getters, rootState}, {from, to}) {
      const posAddress = rootState.settings.wallet.address
      if (!state.erc20Contract) return console.error('no erc20Contract')
      state.erc20Contract.getPastEvents('Transfer', {
        fromBlock: from,
        toBlock: to
      }).then(events => {
        events.forEach(event => {
          const txn = getters.parseEventIntoTxn(event)
          if (event && txn.to === posAddress) dispatch('foundTxn', txn)
        })
      })
      dispatch('set/manuallyCheckedUntil', to)
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
        dispatch('history/insert', Object.assign(paymentRequest, {
          txns,
          id: lastTransaction,
          startBlock: state.startBlock,
          endBlock: state.transactions[lastTransaction].blockNumber,
        }), {root: true})
        dispatch('watchConfirmations', lastTransaction)
        dispatch('modals/set/cart.payment.stage', 2, {root: true})
      }
    },
  },
  getters:
  {
    transactionsArray: (state, getters, rootState, rootGetters) => {
      return Object.keys(state.transactions)
        .filter(k => k !== '*')
        .map(k => state.transactions[k])
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
      const decimals = rootGetters['settings/selectedTokenObject'].decimals
      if (!decimals) console.error('Erc20 token decimals are not set! Please delete and re-add the erc20 token in Settings.')
      const rate = 10 ** Number(decimals)
      const result = txnsTotal / rate
      return result
    },
    web3: (state, getters, rootState, rootGetters) => {
      const networkProvider = rootGetters['settings/selectedNetworkObject'].url
      return instanciateWeb3(networkProvider)
    },
    watcherConfirmationCount (state, getters, rootState, rootGetters) {
      const txnHash = state.confirmationWatcherTxnHash
      const receits = rootState.history.receits
      const txnRef = receits[txnHash]
      if (!txnRef) return 0
      return txnRef.confirmations
    },
    parseEventIntoTxn: () => (event) => {
      return {
        blockNumber: event.blockNumber,
        hash: event.transactionHash,
        from: event.returnValues.from,
        to: event.returnValues.to,
        value: event.returnValues.value
      }
    },
  }
}
