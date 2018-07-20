import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

function initialState () {
  return {
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mounted () {},
  mutations:
  {
    ...defaultMutations(initialState(), easyAccessConf),
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
  },
  actions:
  {
  },
  getters:
  {
  }
}
