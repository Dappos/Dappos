import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { getAddress } from '@helpers/web3'

function initialState () {
  return {
    address: null,
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    async getAndSetAddress ({state, getters, rootState, rootGetters, commit, dispatch}, {id} = {}) {
      const address = await getAddress()
      if (!address) return
      dispatch('set/address', address)
      if (address !== rootState.settings.wallet.address) {
        if (rootGetters['user/isSignedIn']) {
          dispatch('modals/toggle', ['wallet.overwriteAddress', true], {root: true})
        } else {
          dispatch('settings/set/wallet.address', address, {root: true})
        }
      }
      return address
    }
  },
  getters:
  {
  }
}
