import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { uid } from 'quasar'
import copyObj from '@helpers/copyObj'
import CountUp from 'countup.js'
import { floorDecimals } from '@helpers/roundNumberDown'
import convert from '@helpers/conversion'
import { getQrDataEthPayment, generateQr } from '@helpers/QRcode'
import { defaultReceit } from '@modules/history'

function initialState () {
  return {
    valueFiatAnimation: {frameVal: 0},
    valueToken: 0,
    items: {},
    paymentRequest: defaultReceit(),
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
      state.valueToken = 0
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
      state.valueFiatAnimation = new CountUp(...config)
      if (!state.valueFiatAnimation.error) {
        state.valueFiatAnimation.start()
      } else {
        console.error(state.valueFiatAnimation.error)
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
      state.valueFiatAnimation.update(getters.valueFiat)
    },
    deleteItem ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      commit('deleteItem', item)
      state.valueFiatAnimation.update(getters.valueFiat)
    },
    increment ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      commit('addItem', item) // commit because item price is different
      state.valueFiatAnimation.update(getters.valueFiat)
    },
    decrement ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      commit('decrementItem', item)
      state.valueFiatAnimation.update(getters.valueFiat)
    },
    clearAll ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('clearAll')
      state.valueFiatAnimation.update(getters.valueFiat)
    },
    async createPaymentRequest ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const currency = rootState.settings.currency
      const selectedToken = rootState.settings.selectedToken
      const valueFiat = getters.valueFiat
      let valueToken = await convert(valueFiat, currency, selectedToken)
      valueToken = floorDecimals(valueToken, 5)
      dispatch('set/valueToken', valueToken)
      dispatch('set/paymentRequest', {
        fiat: valueFiat,
        fiatCurrency: currency,
        value: valueToken,
        symbol: selectedToken.toUpperCase(),
        items: state.items,
        wallet: rootState.settings.wallet.address,
        txn: null,
        confirmations: 0
      })
      dispatch('generateQr')
      return selectedToken
    },
    generateQr ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const valueToken = state.valueToken
      const to = rootState.settings.wallet.address
      const data = getQrDataEthPayment(to, valueToken)
      generateQr(data, '#js-qr')
    },
  },
  getters:
  {
    valueFiat: (state, getters, rootState, rootGetters) => {
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
  }
}
