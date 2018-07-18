import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { uid } from 'quasar'
import copyObj from '@helpers/copyObj'
import EthereumQRPlugin from 'ethereum-qr-code'
import CountUp from 'countup.js'
import roundNumberDown from '@helpers/roundNumberDown'

function initialState () {
  return {
    totalAmountAnimation: {frameVal: 0},
    totalAmountWei: 0,
    items: {},
    paymentRequest: {
      wei: 0,
      amount: 0,
      currency: null,
      items: {},
      wallet: null,
      txn: null,
      confirmations: 0
    },
    foundTransactions: {
      '*': null // txnHash: new Date()
    }
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
    addItem (state, item) {
      item = copyObj(item)
      Object.keys(item).forEach(k => {
        if (!['count', 'icon', 'id', 'name', 'price'].includes(k)) {
          delete item[k]
        }
      })
      if (!state.items[item.id]) {
        this._vm.$set(
          state.items,
          item.id,
          Object.assign({name: 'Item'}, item, {count: 0})
        )
      }
      state.items[item.id].count++
    },
    decrementItem (state, item) {
      if (!state.items[item.id]) return
      if (!state.items[item.id].count) return
      state.items[item.id].count--
    },
    deleteItem (state, item) {
      this._vm.$delete(state.items, item.id)
    },
    clearAll (state) {
      Object.values(state.items).forEach(item => {
        // item.count = 0
        this._vm.$delete(state.items, item.id)
      })
    },
    clearEmpty (state) {
      Object.values(state.items).forEach(item => {
        if (!item.count) {
          this._vm.$delete(state.items, item.id)
        }
      })
    },
    resetQR (state) {
      state.totalAmountWei = 0
      if (!document.getElementById('js-qr')) return
      document.getElementById('js-qr').innerHTML = ''
    },
    resetPaymentRequest (state) {
      state.paymentRequest = initialState().paymentRequest
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    initializeTotalAmountAnimation ({state, rootGetters}) {
      const config = [
        document.createElement('div'), // el
        0, // initial start count
        0, // initial end count
        rootGetters['settings/currencyConfig'].precision, // decimal amount
        0.4 // duration
      ]
      state.totalAmountAnimation = new CountUp(...config)
      if (!state.totalAmountAnimation.error) {
        state.totalAmountAnimation.start()
      } else {
        console.error(state.totalAmountAnimation.error)
      }
    },
    addItem ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      item.price = (item.price === undefined)
        ? item.prices[rootState.settings.currency]
        : item.price
      if (!item.id) {
        item.id = uid()
        item.nonListed = true
      }
      commit('addItem', item)
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    increment ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      dispatch('addItem', item)
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    decrement ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      commit('decrementItem', item)
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    clearAll ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('clearAll')
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    async createPaymentRequest ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const currency = rootState.settings.currency
      const amount = getters.totalAmount
      let wei = await dispatch('conversion/convert', {
        amount,
        from: currency,
        to: 'wei'
      }, {root: true})
      wei = roundNumberDown(wei, 15)
      dispatch('set/totalAmountWei', wei)
      dispatch('set/paymentRequest', {
        amount,
        currency,
        wei,
        items: state.items,
        wallet: rootState.settings.wallet.address,
        txn: null,
        confirmations: 0
      })
      dispatch('generateQr')
    },
    generateQr ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const qr = new EthereumQRPlugin()
      const sendDetails = {
        value: state.totalAmountWei,
        to: rootState.settings.wallet.address,
        gas: rootState.settings.gas,
      }
      const domConfig = {
        // size: '100%',
        selector: '#js-qr',
        options: {
          margin: 0,
          padding: 0,
        }
      }
      // eslint-disable-next-line
      const qrCode = qr.toCanvas(sendDetails, domConfig)
    },
  },
  getters:
  {
    totalAmount: (state, getters, rootState, rootGetters) => {
      return Object.values(state.items).reduce((carry, item) => { return carry + (item.count * item.price) }, 0)
    },
    totalCount: (state, getters, rootState, rootGetters) => {
      return Object.values(state.items).reduce((carry, item) => { return carry + item.count }, 0)
    },
    totalAmountEth: (state, getters, rootState, rootGetters) => {
      return state.totalAmountWei / rootState.conversion.ethTo['wei']
    },
    confirmedTransactions: (state, getters, rootState, rootGetters) => {
      const receits = rootGetters['history/receitByTxnHash']
      return Object.keys(state.foundTransactions)
        .reduce((carry, txnHash) => {
          if (!receits[txnHash]) return carry
          carry[txnHash] = receits[txnHash].confirmations
          return carry
        }, {})
    }
  }
}
