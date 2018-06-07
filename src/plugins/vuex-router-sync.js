// import something here
import { sync } from 'vuex-router-sync'

// leave the export, even if you don't use it
export default ({ app, router, Vue, store }) => {
  store.unsyncRouter = sync(store, router)
}
