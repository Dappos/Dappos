import firebase from 'firebase'
import menulist from './menulist'

let initialState = function () {
  return {
    user: null,
  }
}

export default {
  namespaced: true,
  modules: { menulist },
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
    }
  },
  actions:
  {
    doIt ({state, getters, rootState, rootGetters, commit, dispatch},
    {id} = {}) {
      // getters.someOtherGetter // -> 'foo/someOtherGetter'
      // rootGetters.someOtherGetter // -> 'someOtherGetter'

      dispatch('someOtherAction') // -> 'foo/someOtherAction'
      dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

      commit('someMutation') // -> 'foo/someMutation'
      commit('someMutation', null, { root: true }) // -> 'someMutation'
    },
    userOnAuthListener ({state, getters, rootState, rootGetters, commit, dispatch},
    {user}) {
      console.log('userOnAuthListener → ', user)
      state.user = Object.assign({}, user)
    },
    signInSuccess ({state, getters, rootState, rootGetters, commit, dispatch},
    {user}) {
      console.log('signInSuccess → ', user)
    },
    signOutSuccess ({state, getters, rootState, rootGetters, commit, dispatch}) {
      console.log('signOutSuccess')
      dispatch('resetStore', null, {root: true})
    },
    signOut ({state, getters, rootState, rootGetters, commit, dispatch}) {
      console.log('signOut')
      firebase.auth().signOut()
      dispatch('resetStore', null, {root: true})
    },
    authError ({state, getters, rootState, rootGetters, commit, dispatch},
    {error, method}) {

    },
  },
  getters:
  {
    isSignedIn: (state, getters, rootState, rootGetters) => {
      return (state.user) ? true : false
    },
    isSignedOut: (state, getters, rootState, rootGetters) => {
      return (!state.user) ? true : false
    },
  }
}
