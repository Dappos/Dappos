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
          : null
      return carry
    }, {})
}

export function defaultItem () {
  return {name: '', icon: null, prices: defaultPrices(), new: true}
}

function testItems () {
  return {
    'ice-coffee': {name: 'Ice Coffee', icon: null, id: 'ice-coffee', prices: defaultPrices(4, 400)},
    'hot-coffee': {name: 'Hot Coffee', icon: '☕', id: 'hot-coffee', prices: defaultPrices(4, 400)},
    'latte': {name: 'Latte', icon: null, id: 'latte', prices: defaultPrices(5, 500)},
    'beer': {name: 'Beer', icon: null, id: 'beer', prices: defaultPrices(5, 500)},
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
      const id = item.name.toLowerCase().replace(' ', '-')
      item.id = id
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
  }
}
