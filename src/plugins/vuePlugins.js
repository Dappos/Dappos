// import components here
import { sync } from 'vuex-router-sync'
import { defaultSetter, defaultGetter } from 'vuex-easy-access'
import money from 'v-money-plus'

export default ({ app, router, Vue, store }) => {

  // 'vuex-router-sync'
  store.unsyncRouter = sync(store, router)

  // 'vuex-easy-access'
  store.set = (path, payload) => { return defaultSetter(path, payload, store) }
  store.get = (path) => { return defaultGetter(path, store) }

  // 'v-money-plus
  Vue.use(money, {precision: 2})

}
