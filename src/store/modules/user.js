import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import firebase from 'firebase'
import menulist from './userMenulist'

function initialState () {
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
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
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
  },
  getters:
  {
    isSignedIn: (state, getters, rootState, rootGetters) => {
      return (state.user) ? true : false
    },
    isSignedOut: (state, getters, rootState, rootGetters) => {
      return (!state.user) ? true : false
    },
    id: (state) => {
      return (state.user) ? state.user.uid : 0
    },
  }
}
