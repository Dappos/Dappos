import createEasyFirestore from 'vuex-easy-firestore'
import createEasyAccess from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
// store root
import initialState from './root/state'
import getters from './root/getters'
import mutations from './root/mutations'
import actions from './root/actions'
// modules
import cart from './modules/cart'
import user from './modules/user'
import keypad from './modules/keypad'
import animate from './modules/animate'
import wallet from './modules/wallet'
import ethEvents from './modules/ethEvents'
import conversion from './modules/conversion'
import history from './modules/history'
import _template from './modules/_template'
// easy firestore modules
import settings from './modules/settings'
import menulist from './modules/menulist'
const easyFirestores = createEasyFirestore([menulist, settings])
const easyAccess = createEasyAccess(easyAccessConf)

export default function () {
  return {
    state: initialState(),
    getters,
    mutations,
    actions,
    modules: {
      cart,
      user,
      keypad,
      animate,
      wallet,
      ethEvents,
      conversion,
      history,
      _template
      // 'menulist' and 'settings' are added as Vuex Easy Firestore!
    },
    plugins: [easyAccess, easyFirestores],
  }
}
