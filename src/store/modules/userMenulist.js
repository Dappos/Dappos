import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import copyObj from '../../helpers/copyObj'

function defaultItem () {
  return {name: '', id: '', prices: {jpy: 0, usd: 0}}
}
function testItems () {
  return {
    'ice-coffee': {name: 'Ice Coffee', id: 'ice-coffee', prices: {jpy: 400, usd: 4}},
    'hot-coffee': {name: 'Hot Coffee', id: 'hot-coffee', prices: {jpy: 400, usd: 4}},
    'latte': {name: 'Latte', id: 'latte', prices: {jpy: 500, usd: 5}}
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
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key])
      })
    },
    addItem (state) {
      const id = state.adding.item.name.toLowerCase().replace(' ', '-')
      state.adding.item.id = id
      Vue.set(state.items, id, state.adding.item)
      state.adding.item = defaultItem()
      state.adding.state = false
    },
    editItem (state, id) {
      if (!id) return
      state.editing.item = state.items[id]
      state.editing.state = true
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
    },
    editItem ({state, getters, rootState, rootGetters, commit, dispatch},
    id) {
      commit('editItem', id)
    },
    deleteItem ({state, getters, rootState, rootGetters, commit, dispatch},
    id) {
      commit('deleteItem', id)
    },
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.editAll.state : toggleState
      state.editAll.state = toggleState
    },
  },
  getters:
  {
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
