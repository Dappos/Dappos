import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import Firebase from 'firebase/app'
import 'firebase/auth'

function initialState () {
  return {
    user: null,
    deactivated: true
  }
}

export default {
  // vuex-easy-firestore config:
  // firestorePath: 'users/{userId}/data/userProfile',
  // firestoreRefType: 'doc',
  // moduleName: 'user',
  // statePropName: '',
  // sync: {
  //   fillables: ['user', 'deactivated']
  // },
  // module
  namespaced: true,
  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    userOnAuthListener ({state, getters, rootState, rootGetters, commit, dispatch}, {user}) {
      console.log('userOnAuthListener → ', user)
      dispatch('set/user', user)
    },
    signInSuccess ({state, getters, rootState, rootGetters, commit, dispatch}, {user}) {
      console.log('signInSuccess → ', user)
    },
    signOutSuccess ({state, getters, rootState, rootGetters, commit, dispatch}) {
      console.log('signOutSuccess')
      dispatch('resetStore', null, {root: true})
    },
    signOut ({state, getters, rootState, rootGetters, commit, dispatch}) {
      console.log('signOut')
      Firebase.auth().signOut()
        .then(_ => {
          dispatch('resetStore', null, {root: true})
        })
    },
  },
  getters:
  {
    isSignedIn: (state, getters, rootState, rootGetters) => {
      return Boolean(state.user)
    },
    isSignedOut: (state, getters, rootState, rootGetters) => {
      return Boolean(!state.user)
    },
    id: (state) => {
      return (state.user) ? state.user.uid : 0
    },
  }
}
