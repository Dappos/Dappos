import { defaultMutations } from 'vuex-easy-access'
import merge from 'merge-anything'
import easyAccessConf from '@config/vuexEasyAccess'
import currencies from '../../config/currencyDefaults'

const defaultPrices = Object.keys(currencies)
  .reduce((carry, key) => {
    carry[key] = 0
    return carry
  }, {})

export function defaultItem () {
  return {name: '', icon: null, prices: defaultPrices, new: true}
}

function testItems () {
  return {
    '*': {name: '', icon: null, prices: merge(defaultPrices, {usd: 0, jpy: 0})},
    '_cookie': {name: 'Cookie', icon: '🍪', id: '_cookie', prices: merge(defaultPrices, {usd: 1, jpy: 100})},
    '_coffee': {name: 'Coffee', icon: '☕', id: '_coffee', prices: merge(defaultPrices, {usd: 3, jpy: 300})},
    '_latte': {name: 'Latte', icon: '☕', id: '_latte', prices: merge(defaultPrices, {usd: 5, jpy: 500})},
    '_beer': {name: 'Beer', icon: '🍺', id: '_beer', prices: merge(defaultPrices, {usd: 5, jpy: 500})},
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
    defaultValues: {prices: defaultPrices},
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
