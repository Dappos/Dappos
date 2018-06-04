import Vue from 'vue'
import { uid } from 'quasar'
import copyObj from '../../helpers/copyObj'
import EthereumQRPlugin from 'ethereum-qr-code'

let initialState = function () {
  return {
    totalAmount: 0,
    totalCount: 0,
    items: {},
    opened: {state: false},
    editing: {
      state: false,
      item: null
    },
    payment: {
      state: false,
      stage: 3
    }
  }
}

export default {
  namespaced: true,
  // modules: {  },
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
    removeItem (state, item) {
      if (!state.items[item.id]) return
      if (!state.items[item.id].count) return
      state.items[item.id].count--
    },
    clearAll (state) {
      Object.values(state.items).forEach(item => {
        item.count = 0
      })
    },
  },
  actions:
  {
    addItem ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      item.price = (item.price === undefined)
        ? item.prices[rootState.settings.currency.currency]
        : item.price
      commit('addItem', item)
    },
    openMore ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      state.editing.state = true
      state.editing.item = item
    },
    increment ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      dispatch('addItem', item)
    },
    decrement ({state, getters, rootState, rootGetters, commit, dispatch},
    item) {
      commit('removeItem', item)
    },
    clearAll ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('clearAll')
    },
    generateQr ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const qr = new EthereumQRPlugin()
      const sendDetails = {
        to: rootState.settings.walletAddress,
        value: getters.totalAmountWei,
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
    totalAmountWei: (state, getters, rootState, rootGetters) => {
      return rootGetters['web3/convert']({
        amount: getters.totalAmount,
        from: 'jpy',
        to: 'wei'
      })
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
