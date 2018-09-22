import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import currencies from '@config/currencyDefaults'

function defaultPrices (usd, jpy) {
  return Object.keys(currencies)
    .reduce((carry, key) => {
      carry[key] = (usd && key === 'usd')
        ? usd
        : (jpy && key === 'jpy')
          ? jpy
          : 0
      return carry
    }, {})
}

export function defaultItem () {
  return {name: '', icon: null, prices: defaultPrices(), new: true}
}

function testItems () {
  return {
    '*': {name: '', icon: null, prices: defaultPrices(0, 0)},
    '_ice-coffee': {name: 'Ice Coffee', icon: null, id: '_ice-coffee', prices: defaultPrices(4, 400)},
    '_hot-coffee': {name: 'Hot Coffee', icon: '☕', id: '_hot-coffee', prices: defaultPrices(4, 400)},
    '_latte': {name: 'Latte', icon: null, id: '_latte', prices: defaultPrices(5, 500)},
    '_beer': {name: 'Beer', icon: null, id: '_beer', prices: defaultPrices(5, 500)},
  }
}

function initialState () {
  return {
    items: testItems(),
  }
}

export default {
  // vuex-easy-firestore config:
  firestorePath: 'users/{userId}/menulist',
  firestoreRefType: 'collection',
  moduleName: 'user/menulist',
  statePropName: 'items',
  serverChange: {
    defaultValues: {prices: defaultPrices()},
  },
  // module:
  state: initialState(),
  mutations:
  {
    ...defaultMutations(initialState(), easyAccessConf),
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    replaceMenulist (state, payload) {
      state.items = payload
    },
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        this._vm.$set(state, key, payload[key])
      })
    },
    clearTestItems (state) {
      state.items = {}
    },
  },
  actions:
  {
    addItem ({state, getters, rootState, rootGetters, commit, dispatch}) {
      const item = rootState.modals.menulist.adding.item
      delete item.new
      dispatch('insert', item)
      dispatch('modals/toggle', 'menulist.adding', {root: true})
      dispatch('modals/menulist.resetNewItem', null, {root: true})
    },
    setPrice ({state, getters, rootState, rootGetters, commit, dispatch}, {id, val}) {
      const curr = rootState.settings.currency
      const prices = {}
      prices[curr] = val
      dispatch('set', {prices, id})
    },
  },
  getters:
  {
    'items': (state, getters) => {
      return Object.keys(state.items)
        .filter(id => id !== '*')
        .reduce((carry, id) => {
          carry[id] = state.items[id]
          return carry
        }, {})
    }
  }
}
