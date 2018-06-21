import copyObj from '../../helpers/copyObj'

function defaultItem () {
  return {name: '', icon: null, prices: {jpy: 0, usd: 0}, new: true}
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
  moduleNameSpace: 'user/menulist', // must be relative to rootState
  // docsStateProp: 'user/menulist/items', // must be relative to rootState
  docsStateProp: 'items', // must be relative to rootState
  firestorePath: 'users/{userId}/menulist', // you can write `{userId}` which will be replaced with `Firebase.auth().uid`

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
        this._vm.$set(state, key, payload[key])
      })
    },
    addItem (state) {
      const id = state.adding.item.name.toLowerCase().replace(' ', '-')
      state.adding.item.id = id
      delete state.adding.item.new
      this._vm.$set(state.items, id, state.adding.item)
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
    },
  },
  actions:
  {
    addItem ({state, getters, rootState, rootGetters, commit, dispatch}) {
      delete state.adding.item.new
      dispatch('insert', state.adding.item)
      state.adding.state = false
      state.adding.item = defaultItem()
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
    setPrice ({state, getters, rootState, rootGetters, commit, dispatch},
    {id, val}) {
      const curr = rootState.settings.currency
      const prices = {}
      prices[curr] = val
      dispatch('set', {prices, id})
    },
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.editAll.state : toggleState
      commit('SET_EDITALL.STATE', toggleState)
    },
  },
  getters:
  {
  }
}
