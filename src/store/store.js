import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import cart from './modules/cart'
import user from './modules/user'
import settings from './modules/settings'
import keypad from './modules/keypad'

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
      keypad
    }
  }
}
