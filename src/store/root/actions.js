import { sync } from 'vuex-router-sync'
import store from '@store'
import Router from '@router'

export default {
  resetStore ({commit, state, dispatch}) {
    store.unsyncRouter()
    // store.replaceState(copyObj(store.initialStateCopy))
    Object.keys(store._modulesNamespaceMap).forEach(ns => {
      const mutation = ns + 'resetStateData'
      if (!this._mutations[mutation]) return
      commit(mutation)
    })
    store.unsyncRouter = sync(store, Router)
    console.log('reset store complete!')
  },
  apiError ({state, getters}, {error, method}) {
    console.error('error → ', error, ' on method → ', method)
  },
}
