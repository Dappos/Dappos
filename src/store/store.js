import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import cart from './modules/cart'
import user from './modules/user'
import keypad from './modules/keypad'
import animate from './modules/animate'
import web3 from './modules/web3'
import ethEvents from './modules/ethEvents'
import conversion from './modules/conversion'
import history from './modules/history'
import firestore from './modules/firestore'
import _template from './modules/_template'
import settings from './modules/settings'
import createEasyFirestore from 'vuex-easy-firestore'
// import settings from './modules/settings'
// const settingsDB = createEasyFirestore([settings])
import menulist from './modules/menulist';
const menulistDB = createEasyFirestore([menulist])

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
      firestore,
      settings,
      _template
    },
    plugins: [
      // settingsDB,
      menulistDB
    ]
  }
}
