import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

export function defaultReceit () {
  return {
    symbol: 'ETH',
    wei: 0, // 123123123123123
    token: 0,
    fiat: 0, // 123123
    fiatCurrency: null, // 'jpy'
    items: {},
    wallet: null,
    txn: null,
    confirmations: 0
  }
}

// const dummyReceit = Object.assign(defaultReceit(), {
//   fiat: 1200,
//   fiatCurrency: 'jpy',
//   wei: 80808080800808,
//   wallet: '0x20f201297e53f949e56e2dE5196Ea57f4E91DE0e',
//   items: JSON.parse(`{
//     "a6bf8482-02cb-cd35-ee50-224ba1c8d806":{"name":"Item","price":400,"id":"a6bf8482-02cb-cd35-ee50-224ba1c8d806","count":1},
//     "7HGW75P1JLJPAwTEHany":{"name":"HOT Coffee 😆","icon":"😎","id":"7HGW75P1JLJPAwTEHany","price":400,"count":2},
//     "JqXBBs9vHqEn53ZDN0OL":{"name":"Iced Coffee","icon":null,"id":"JqXBBs9vHqEn53ZDN0OL","price":400,"count":1}}
//   `),
//   txn: null,
//   confirmations: 0
// })

function initialState () {
  return {
    // receits: {'_dummy': dummyReceit},
    receits: {},
  }
}

export default {
  // vuex-easy-firestore config:
  firestorePath: 'users/{userId}/receits',
  firestoreRefType: 'collection',
  moduleName: 'history',
  statePropName: 'receits',
  sync: {
    insertHook: function (updateStore, doc, store) {
      updateStore(doc)
    },
  },
  serverChange: {
    defaultValues: defaultReceit()
  },
  // module:
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
  },
  getters:
  {
    receitByTxnHash: (state, getters) => {
      return Object.values(state.receits)
        .reduce((carry, receit) => {
          if (!receit.txn) return carry
          const txnHash = receit.txn.hash
          carry[txnHash] = receit
          return carry
        }, {})
    },
  }
}
