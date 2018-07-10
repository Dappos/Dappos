import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import anime from 'animejs'
import { addClass, removeClass } from '@helpers/DOMClassHelpers'
import { dom, uid } from 'quasar'
const { offset } = dom

function initialState () {
  return {
    pop: {},
    fly: {},
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
    setAnimation (state, {type, id, animation}) {
      this._vm.$set(state[type], id, animation)
    },
    resetAnimation (state, {type, id}) {
      state[type][id].restart()
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    pop (
      {state, getters, rootState, rootGetters, commit, dispatch},
      {el, id = 'main'} = {}
    ) {
      // console.log('state.pop → ', state.pop)
      if (!state.pop[id]) {
        state.pop[id] = anime({
          targets: el,
          scale: [1, 1.5, 1],
          duration: 300,
          easing: 'easeOutQuad',
          elasticity: 0,
          autoplay: false,
        })
        window.sp = state.pop[id]
      }
      state.pop[id].restart()
    },
    fly (
      {state, getters, rootState, rootGetters, commit, dispatch},
      {el, target, id, hidden, clone, hideAfter, innerHTML} = {}
    ) {
      const animationDuration = 500
      return new Promise((resolve, reject) => {
        if (clone) {
          const top = el.getBoundingClientRect().top + window.scrollY
          const left = el.getBoundingClientRect().left + window.scrollX
          el = el.cloneNode()
          el.style.position = 'fixed'
          el.style.top = top + 'px'
          el.style.left = left + 'px'
          el.style['z-index'] = 1000
          document.body.appendChild(el)
        }
        if (!id) id = uid()
        if (innerHTML) {
          el.className = (hidden) ? 'hidden' : ''
          el.innerHTML = innerHTML
        }
        if (hidden) removeClass(el, 'hidden')
        // console.log('el → ', el)
        // console.log('target → ', target)
        const offsetEl = offset(el)
        const offsetTarget = offset(target)
        const Yend = offsetTarget.top - offsetEl.top
        const Xend = offsetTarget.left - offsetEl.left
        // const Ymid = Yend / 2 - 100
        // const Xmid = Xend / 2 + 100
        if (!state.fly[id]) {
          const animation = anime({
            targets: el,
            translateX: Xend,
            translateY: Yend,
            scale: [6, 1],
            duration: animationDuration,
            easing: 'easeOutQuad',
            elasticity: 0,
            autoplay: false
          })
          commit('setAnimation', {type: 'fly', id, animation})
        }
        // state.fly[id].complete = (anim) => {
        //   if (hidden) addClass(el, 'hidden')
        //   resolve()
        // }
        commit('resetAnimation', {type: 'fly', id})
        setTimeout(_ => {
          if (hidden) addClass(el, 'hidden')
          if (hideAfter) addClass(el, 'hidden')
          if (clone && hideAfter) el.remove()
          resolve()
        }, animationDuration)
      })
    },
  },
  getters:
  {
  }
}
