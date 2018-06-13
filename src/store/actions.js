import { sync } from 'vuex-router-sync'
import store from './index'
import copyObj from '../helpers/copyObj'
import Router from '../router'
import { dom } from 'quasar'
const { offset, css } = dom

export default {
  resetStore ({commit, state, dispatch}) {
    store.unsyncRouter()
    // store.replaceState(copyObj(store.initialStateCopy))
    Object.keys(store._modulesNamespaceMap).forEach(ns => {
      let mutation = ns + 'resetStateData'
      commit(mutation)
    })
    store.unsyncRouter = sync(store, Router)
    console.log('reset store complete!')
  },
  toggleMenu ({state, getters, commit},
  toggleState) {
    let top = 0
    let left = 0
    if (getters.appMinimised) {
      let pageEl = document.querySelector('.js-page-offset')
      let pageOffset = offset(pageEl)
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
    commit('SET_MENU.OPENED', toggleState)
    if (prevState !== state.menu.opened) {
      state.menu.animating = true
    }
  },
  apiError ({state, getters},
  {error, method}) {
    console.error('error → ', error, ' on method → ', method)
  },
}
