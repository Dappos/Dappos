// import components here
import { sync } from 'vuex-router-sync'
import money from 'v-money-plus'

export default ({ app, router, Vue, store }) => {

  // 'vuex-router-sync'
  store.unsyncRouter = sync(store, router)

  // 'v-money-plus
  Vue.use(money, {precision: 2})

}
