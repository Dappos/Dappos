// import components here
import LayoutSideMenu from '../components/LayoutSideMenu.vue'
import InfoCart from '../components/InfoCart.vue'
import InfoTotal from '../components/InfoTotal.vue'
import NavigationTabs from '../components/NavigationTabs.vue'
import Keypad from '../components/Keypad.vue'

export default ({ app, router, Vue }) => {
  // register the components here
  Vue.component('layout-side-menu', LayoutSideMenu)
  Vue.component('info-cart', InfoCart)
  Vue.component('info-total', InfoTotal)
  Vue.component('navigation-tabs', NavigationTabs)
  Vue.component('keypad', Keypad)
}
