// import something here
import { sync } from 'vuex-router-sync'

// leave the export, even if you don't use it
export default ({ app, router, Vue, store }) => {
  window.unsyncRouter = sync(store, router)
}
