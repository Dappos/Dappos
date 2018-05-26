import { sync } from 'vuex-router-sync'

export default {
  resetStore ({commit, state, dispatch}) {
    window.unsyncRouter()
    window.store.replaceState(JSON.parse(JSON.stringify(window.initialStateCopy)))
    window.unsyncRouter = sync(window.store, window.Router)
  },
}
