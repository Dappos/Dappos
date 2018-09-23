import createEasyFirestore from 'vuex-easy-firestore'
import createEasyAccess from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
// store root
import initialState from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// modules
import cart from '@modules/cart'
import keypad from '@modules/keypad'
import wallet from '@modules/wallet'
import ethEvents from '@modules/ethEvents'
import modals from '@modules/modals'
import user from '@modules/user'
// import _template from '@modules/_template'
// easy firestore modules
import menulist from '@modules/menulist'
import settings from '@modules/settings'
import history from '@modules/history'
const easyFirestores = createEasyFirestore([menulist, settings, history], {logging: true})
const easyAccess = createEasyAccess(easyAccessConf)

export default function () {
  return {
    state: initialState(),
    getters,
    mutations,
    actions,
    modules: {
      user,
      cart,
      keypad,
      wallet,
      ethEvents,
      modals,
      // _template
      // 'menulist' and 'settings' are added as Vuex Easy Firestore!
    },
    plugins: [easyFirestores, easyAccess],
  }
}
