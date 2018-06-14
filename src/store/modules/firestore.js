import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'
import copyObj from '../../helpers/copyObj'

window.patchQueueing = {}
window.sendingPatchesToServer = {}

function initialState () {
  // ❗️ properties > 1 level deep are not reset with resetStateData()
  return {
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mounted () {
    console.log('this → ', this)
  },
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
    openDBChannels ({state, getters, rootState, rootGetters, commit, dispatch}) {
      function openChannel (docGetter) {
        getters[docGetter].onSnapshot(doc => {
          if (!doc.exists) { return }
          let source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
          console.log(`Retrieved ${docGetter} from `, source, ' data: ', doc && doc.data())
          if (source === 'Server') {
            if (docGetter === 'userSettingsDoc') {
              commit('settings/replaceSettings', doc.data(), {root: true})
            }
            if (docGetter === 'userMenulistDoc') {
              commit('user/menulist/replaceMenulist', doc.data().items, {root: true})
            }
          }
        }, error => {
          let message = rootGetters.text.api.connectionError
          notify({message, preset: 'error'})
        })
      }
      const docs = ['userSettingsDoc', 'userMenulistDoc']
      docs.forEach(docGetter => openChannel(docGetter))
    },
    patch ({dispatch, getters, state, rootState, rootGetters, commit}, docGetter = '') {
      if (!docGetter) return
      if (!rootGetters['user/isSignedIn']) return
      // dispatch('startPatching')
      if (window.patchQueueing[docGetter]) { clearTimeout(window.patchQueueing[docGetter]) }
      function startPatchQueue () {
        const newPatchQueue = setTimeout(_ => {
          if (window.sendingPatchesToServer[docGetter]) {
            return startPatchQueue()
          }
          // Hard copy the syncStack
          const payload = (docGetter === 'userSettingsDoc')
            ? copyObj(rootState.settings)
            : (docGetter === 'userMenulistDoc')
              ? copyObj(rootState.user.menulist)
              : null
          if (!payload) return
          delete payload.modal // refactor somewhere with fillables
          delete payload.adding // refactor somewhere with fillables
          delete payload.editing // refactor somewhere with fillables
          delete payload.editAll // refactor somewhere with fillables
          console.log('payload → ', payload)
          // Set sending status for next patchQueue invokes during it's being sent.
          window.sendingPatchesToServer[docGetter] = true
          getters[docGetter].set(payload, {merge: true})
          .then(_ => {
            // dispatch('stopPatching')
            console.log(`patched ${docGetter}!`)
            window.sendingPatchesToServer[docGetter] = false
          })
          .catch(error => dispatch('apiError', {error, note: `Error during ${docGetter} patch`}, {root: true}))
        }, 750)
        window.patchQueueing[docGetter] = newPatchQueue
      }
      startPatchQueue()
    },
  },
  getters:
  {
    userSettingsDoc: (state, getters, rootState, rootGetters) => {
      if (!rootGetters['user/isSignedIn'] || !rootGetters.db) return
      return rootGetters.db
        .collection('users').doc(rootGetters['user/id'])
        .collection('data').doc('settings')
    },
    userMenulistDoc: (state, getters, rootState, rootGetters) => {
      if (!rootGetters['user/isSignedIn'] || !rootGetters.db) return
      return rootGetters.db
        .collection('users').doc(rootGetters['user/id'])
        .collection('data').doc('menulist')
    }
  }
}
