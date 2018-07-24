import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { uid } from 'quasar'
import copyObj from '@helpers/copyObj'
import EthereumQRPlugin from '@dri/ethereum-qr-code'
import CountUp from 'countup.js'
import roundNumberDown from '@helpers/roundNumberDown'
import convert from '@helpers/conversion'
import { defaultReceit } from '@modules/history'

function initialState () {
  return {
    valueAnimation: {frameVal: 0},
    valueWei: 0,
    items: {},
    paymentRequest: defaultReceit(),
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
      state.valueWei = 0
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
      state.valueAnimation = new CountUp(...config)
      if (!state.valueAnimation.error) {
        state.valueAnimation.start()
      } else {
        console.error(state.valueAnimation.error)
      }
    },
    addItem ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      const currentPrice = (item.prices[this.get('settings/currency')])
      const price = (!currentPrice)
        ? 0
        : currentPrice
      item.price = price
      if (!item.id) {
        item.id = uid()
        item.nonListed = true
      }
      commit('addItem', item)
      state.valueAnimation.update(getters.value)
    },
    increment ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      dispatch('addItem', item)
      state.valueAnimation.update(getters.value)
    },
    decrement ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      commit('decrementItem', item)
      state.valueAnimation.update(getters.value)
    },
    clearAll ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('clearAll')
      state.valueAnimation.update(getters.value)
    },
    async createPaymentRequest ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const currency = rootState.settings.currency
      const amount = getters.value
      let wei = await convert(amount, currency, 'wei')
      wei = roundNumberDown(wei, 15)
      dispatch('set/valueWei', wei)
      dispatch('set/paymentRequest', {
        fiat: amount,
        fiatCurrency: currency,
        wei,
        symbol: 'ETH',
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
        amount: state.valueWei,
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
    value: (state, getters, rootState, rootGetters) => {
      return Object.values(state.items).reduce((carry, item) => {
        const price = (item.price) ? item.price : 0
        return carry + (item.count * price)
      }, 0)
    },
    totalCount: (state, getters, rootState, rootGetters) => {
      return Object.values(state.items).reduce((carry, item) => {
        return carry + item.count
      }, 0)
    },
    valueEth: (state, getters, rootState, rootGetters) => {
      return convert(state.valueWei, 'wei', 'eth')
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
