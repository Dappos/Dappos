import Vue from 'vue'
// const emojiRegex = require('emoji-regex')
// const regex = emojiRegex()
import { defaultMutations } from 'vuex-easy-access'
import copyObj from '../../helpers/copyObj'

function defaultItem () {
  return {name: '', icon: null, id: '', prices: {jpy: 0, usd: 0}, new: true}
}
function testItems () {
  return {
    'ice-coffee': {name: 'Ice Coffee', icon: null, id: 'ice-coffee', prices: {jpy: 400, usd: 4}},
    'hot-coffee': {name: 'Hot Coffee', icon: '☕', id: 'hot-coffee', prices: {jpy: 400, usd: 4}},
    'latte': {name: 'Latte', icon: null, id: 'latte', prices: {jpy: 500, usd: 5}},
    'beer': {name: 'Beer', icon: null, id: 'beer', prices: {jpy: 500, usd: 5}},
  }
}
function initialState () {
  return {
    items: testItems(),
    adding: {state: false, item: defaultItem()},
    editing: {state: false, item: null},
    editAll: {state: false},
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
    replaceMenulist (state, payload) {
      state.items = payload
    },
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key])
      })
    },
    addItem (state) {
      const id = state.adding.item.name.toLowerCase().replace(' ', '-')
      state.adding.item.id = id
      delete state.adding.item.new
      Vue.set(state.items, id, state.adding.item)
      state.adding.state = false
      state.adding.item = defaultItem()
    },
    resetNewItem (state) {
      state.adding.item = defaultItem()
    },
    openEditModal (state, id) {
      if (!id) return
      state.editing.item = state.items[id]
      state.editing.state = true
    },
    doneEdit (state, id) {
      state.editing.state = false
      return
    },
    deleteItem (state, id) {
      Vue.delete(state.items, id)
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
    addItem ({state, getters, rootState, rootGetters, commit, dispatch}) {
      commit('addItem')
      dispatch('firestore/patch', 'userMenulistDoc', {root: true})
    },
    openEditModal ({state, getters, rootState, rootGetters, commit, dispatch},
    id) {
      commit('openEditModal', id)
    },
    doneEdit ({state, getters, rootState, rootGetters, commit, dispatch},
    id) {
      commit('doneEdit', id)
      dispatch('firestore/patch', 'userMenulistDoc', {root: true})
    },
    deleteItem ({state, getters, rootState, rootGetters, commit, dispatch},
    id) {
      commit('deleteItem', id)
      dispatch('firestore/patch', 'userMenulistDoc', {root: true})
    },
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.editAll.state : toggleState
      commit('SET_EDITALL.STATE', toggleState)
    },
  },
  getters:
  {
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    },
    // emoji: (state, getters) =>
    // (item) => {
    //   // if (!id) return null
    //   // const item = state.items[id]
    //   if (!item) return null
    //   let result = item.name.match(regex)
    //   return (!result) ? null : result[0]
    // },
    // hasIcon: (state, getters) =>
    // (item) => {
    //   // if (!id) return false
    //   // const item = state.items[id]
    //   if (!item) return false
    //   return (!getters.emoji(item)) ? false : item.name.startsWith(getters.emoji(item))
    // },
    // nameNoEmoji: (state, getters) =>
    // (item) => {
    //   // if (!id) return null
    //   // const item = state.items[id]
    //   if (!item) return null
    //   if (!getters.hasIcon(item)) return item.name
    //   const firstEmoji = new RegExp('^' + getters.emoji(item))
    //   return item.name.replace(firstEmoji, '')
    // },
  }
}
