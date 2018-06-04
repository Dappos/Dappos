import { sync } from 'vuex-router-sync'

export default {
  resetStore ({commit, state, dispatch}) {
    window.unsyncRouter()
    window.store.replaceState(JSON.parse(JSON.stringify(window.initialStateCopy)))
    window.unsyncRouter = sync(window.store, window.Router)
  },
  toggleMenu ({state}) {
    state.menu.opened = !state.menu.opened
    state.menu.animating = true
  },
}
