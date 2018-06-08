import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import cart from './modules/cart'
import user from './modules/user'
import settings from './modules/settings'
import keypad from './modules/keypad'
import animate from './modules/animate'
import web3 from './modules/web3'
import ethEvents from './modules/ethEvents'
import conversion from './modules/conversion'

export default function () {
  return {
    state: state(),
    getters,
    mutations,
    actions,
    modules: {
      cart,
      user,
      settings,
      keypad,
      animate,
      web3,
      ethEvents,
      conversion,
    }
  }
}
