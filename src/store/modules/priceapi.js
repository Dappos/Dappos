import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

function initialState () {
  return {
    '*': 0
  }
}

export default {
  // vuex-easy-firestore config:
  firestorePath: 'priceapi/priceapi',
  firestoreRefType: 'doc',
  moduleName: 'priceapi',
  statePropName: '',
  // module:
  namespaced: true,
  state: initialState(),
  mutations:
  {
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
  },
  getters:
  {
  }
}
