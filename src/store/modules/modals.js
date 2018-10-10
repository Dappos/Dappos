import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import { defaultItem } from '@modules/menulist'
import copyObj from '@helpers/copyObj'
import store from '@store'
import { isArray } from 'is-what'
import { dom } from 'quasar'
const { offset, css } = dom

function initialState () {
  return {
    menu: {opened: false, animating: false},
    settings: {opened: false},
    wallet: {
      overwriteAddress: {opened: false},
      noAddressFound: {opened: false},
    },
    history: {opened: false},
    menulist: {
      adding: {opened: false, item: defaultItem()},
      editing: {opened: false, item: null},
      editAll: {opened: false},
    },
    cart: {
      cart: {opened: false},
      editing: {opened: false, item: null},
      payment: {opened: false, stage: 1},
      reallyClosePayment: {opened: false},
    },
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
    toggle ({state, commit, dispatch}, array) {
      let modalPath
      let toggleState
      if (!isArray(array)) {
        modalPath = array
      } else {
        modalPath = array[0]
        toggleState = array[1]
      }
      const opened = store.get(`modals/${modalPath}.opened`)
      toggleState = (toggleState === undefined) ? !opened : toggleState
      dispatch(`set/${modalPath}.opened`, toggleState)
    },
    cartMore ({state, getters, rootState, rootGetters, commit, dispatch}, item) {
      dispatch('set/cart.editing.opened', true)
      dispatch('set/cart.editing.item', item)
    },
    menulistEdit ({state, getters, rootState, rootGetters, commit, dispatch}, id) {
      dispatch('set/menulist.editing.opened', true)
      dispatch('set/menulist.editing.item', copyObj(rootState.user.menulist.items[id]))
    },
    'menulist.resetNewItem': ({state}) => {
      state.menulist.adding.item = defaultItem()
    },
    createPaymentRequest: ({state, dispatch, commit}) => {
      dispatch('cart/createPaymentRequest', null, {root: true})
        .then(selectedToken => dispatch('ethEvents/watchTransactions', selectedToken, {root: true}))
    },
    resetPaymentRequest: ({state, dispatch, commit}) => {
      dispatch('set/cart.payment.stage', 1)
      commit('cart/resetPaymentRequest', null, {root: true})
      commit('cart/resetQR', null, {root: true})
      dispatch('ethEvents/unwatch', null, {root: true})
    },
    toggleMenu ({state, dispatch, rootGetters}, toggleState) {
      let top = 0
      let left = 0
      if (rootGetters.appMinimised) {
        const pageEl = document.querySelector('.js-page-offset')
        const pageOffset = offset(pageEl)
        top = pageOffset.top
        left = pageOffset.left
      }
      document.querySelectorAll('.modal')
        .forEach(node => {
          css(node, {
            top: top + 'px',
            left: left + 'px'
          })
        })
      const prevState = state.menu.opened
      if (toggleState === undefined) {
        toggleState = !state.menu.opened
      }
      dispatch('set/menu.opened', toggleState)
      if (prevState !== state.menu.opened) {
        dispatch('set/menu.animating', true)
      }
    },
  },
  getters:
  {
  }
}
