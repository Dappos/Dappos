// import components here
import money from 'v-money-plus'
// import { VMoney } from 'v-money'

export default ({ app, router, Vue }) => {
  // register the components here
  Vue.use(money, {precision: 2})
  // Vue.directive('money', VMoney)
}
