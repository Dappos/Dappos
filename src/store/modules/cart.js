import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import { uid } from 'quasar'
import copyObj from '../../helpers/copyObj'
import EthereumQRPlugin from 'ethereum-qr-code'
import CountUp from 'countup.js'
import roundNumberDown from '../../helpers/roundNumberDown'

function initialState () {
  return {
    totalAmountAnimation: {frameVal: 0},
    totalAmountWei: 0,
    items: {},
    opened: {state: false},
    editing: {
      state: false,
      item: null
    },
    payment: {
      state: false,
      stage: 1
    },
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
    addItem (state, item) {
      item = copyObj(item)
      if (!state.items[item.id]) {
        Vue.set(state.items, item.id, Object.assign({name: 'Item'}, item, {count: 0}))
      }
      state.items[item.id].count++
    },
    decrementItem (state, item) {
      if (!state.items[item.id]) return
      if (!state.items[item.id].count) return
      state.items[item.id].count--
    },
    deleteItem (state, item) {
      Vue.delete(state.items, item.id)
    },
    clearAll (state) {
      Object.values(state.items).forEach(item => {
        // item.count = 0
        Vue.delete(state.items, item.id)
      })
    },
    clearEmpty (state) {
      Object.values(state.items).forEach(item => {
        if (!item.count) {
          Vue.delete(state.items, item.id)
        }
      })
    },
    resetQR (state) {
      state.totalAmountWei = 0
      document.getElementById('js-qr').innerHTML = ''
    },
    ...defaultMutations(initialState())
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
    addItem ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
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
    toggleCart ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.opened.state : toggleState
      commit('SET_OPENED.STATE', toggleState)
    },
    openMore ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      commit('SET_EDITING.STATE', true)
      commit('SET_EDITING.ITEM', item)
    },
    increment ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      dispatch('addItem', item)
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    decrement ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      commit('decrementItem', item)
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    clearAll ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('clearAll')
      state.totalAmountAnimation.update(getters.totalAmount)
    },
    async generateQr ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const qr = new EthereumQRPlugin()
      const currency = rootState.settings.currency
      const amount = getters.totalAmount
      let value = await dispatch('conversion/convert', {
        amount,
        from: currency,
        to: 'wei'
      }, {root: true})
      value = roundNumberDown(value, 15)
      commit('SET_TOTALAMOUNTWEI', value)
      const sendDetails = {
        value,
        to: rootState.settings.walletAddress,
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
    // itemsOverview: (state, getters, rootState, rootGetters) => {
    //   let items = state.items.reduce((carry, item) => {
    //     let id = (!item.id) ? uid() : item.id
    //     if (!carry[id]) carry[id] = {count: 0}
    //     Object.assign(carry[id], item)
    //     carry[id].count++
    //     return carry
    //   }, {})
    //   return items
    // },
  }
}
