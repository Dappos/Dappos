// import components here
// generic
import ModalFullscreen from '@components/generic/ModalFullscreen'
import ModalMinimised from '@components/generic/ModalMinimised'
import RowWrapper from '@components/generic/RowWrapper'
import QuasarOptionsReveal from '@components/generic/QuasarOptionsReveal'
import FirebaseUi from '@components/SigninFirebaseUi'
// modals
import Modals from '@components/Modals'
import MenuListAddEditItem from '@components/Modals/MenuListAddEditItem'
import MenuListEditAll from '@components/Modals/MenuListEditAll'
import CartEditingItem from '@components/Modals/CartEditingItem'
import Payment from '@components/Modals/Payment'
import OverwriteAddress from '@components/Modals/OverwriteAddress'
import NoAddressFound from '@components/Modals/NoAddressFound'
import ReallyClosePayment from '@components/Modals/ReallyClosePayment'
// other
import AppMenu from '@components/AppMenu'
import InfoCart from '@components/InfoCart'
import InfoWallet from '@components/InfoWallet'
import InfoTotal from '@components/InfoTotal'
import NavigationTabs from '@components/NavigationTabs'
import Keypad from '@components/Keypad'
import MenuList from '@components/MenuList'
import Cart from '@components/Cart'
import txnHistory from '@components/History'
import Settings from '@components/Settings'

export default ({ app, router, Vue }) => {
  // register the components here
  Vue.component('modal-fullscreen', ModalFullscreen)
  Vue.component('modal-minimised', ModalMinimised)
  Vue.component('row-wrapper', RowWrapper)
  Vue.component('options-reveal', QuasarOptionsReveal)
  Vue.component('firebase-ui', FirebaseUi)

  Vue.component('modals', Modals)
  Vue.component('menu-list-add-edit-item', MenuListAddEditItem)
  Vue.component('menu-list-edit-all', MenuListEditAll)
  Vue.component('cart-editing-item', CartEditingItem)
  Vue.component('payment', Payment)
  Vue.component('overwrite-address', OverwriteAddress)
  Vue.component('no-address-found', NoAddressFound)
  Vue.component('really-close-payment', ReallyClosePayment)

  Vue.component('app-menu', AppMenu)
  Vue.component('info-cart', InfoCart)
  Vue.component('info-wallet', InfoWallet)
  Vue.component('info-total', InfoTotal)
  Vue.component('navigation-tabs', NavigationTabs)
  Vue.component('keypad', Keypad)
  Vue.component('menu-list', MenuList)
  Vue.component('cart', Cart)
  Vue.component('history', txnHistory)
  Vue.component('settings', Settings)
}
