import createEasyFirestore from 'vuex-easy-firestore'
import createEasyAccess from 'vuex-easy-access'
// store root
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// modules
import cart from './modules/cart'
import user from './modules/user'
import keypad from './modules/keypad'
import animate from './modules/animate'
import web3 from './modules/web3'
import ethEvents from './modules/ethEvents'
import conversion from './modules/conversion'
import history from './modules/history'
import _template from './modules/_template'
// easy firestore modules
import settings from './modules/settings'
import menulist from './modules/menulist'
const easyFirestores = createEasyFirestore([menulist, settings])
const easyAccess = createEasyAccess({vuexEasyFirestore: true})

export default function () {
  return {
    state: state(),
    getters,
    mutations,
    actions,
    modules: {
      cart,
      user,
      keypad,
      animate,
      web3,
      ethEvents,
      conversion,
      history,
      _template
      // ,menulist, settings
    },
    plugins: [easyAccess, easyFirestores],
  }
}
