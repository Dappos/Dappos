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
          // easing: 'easeInEaseOut',
          elasticity: 0,
          autoplay: false,
        })
        window.sp = state.pop[id]
      }
      state.pop[id].restart()
    },
    fly (
      {state, getters, rootState, rootGetters, commit, dispatch},
      {el, target, hidden, clone, hideAfter, innerHTML, startOffsetX = 0, startOffsetY = 0, addShadow = true}
    ) {
      const animationDuration = 500
      return new Promise((resolve, reject) => {
        const top = el.getBoundingClientRect().top + window.scrollY + startOffsetY
        const left = el.getBoundingClientRect().left + window.scrollX + startOffsetX
        if (clone) {
          el = el.cloneNode()
          el.style['font-size'] = '4em'
          el.style.position = 'fixed'
          el.style.top = top + 'px'
          el.style.left = left + 'px'
          el.style['pointer-events'] = 'none'
          el.style['z-index'] = 1000
          document.body.appendChild(el)
        }
        if (innerHTML) {
          el.className = (hidden) ? 'hidden' : ''
          el.innerHTML = innerHTML
        }
        if (hidden) removeClass(el, 'hidden')
        // console.log('el → ', el)
        // console.log('target → ', target)
        const offsetEl = offset(el)
        const offsetTarget = offset(target)
        const Yend = offsetTarget.top - offsetEl.top - 25
        const Xend = offsetTarget.left - offsetEl.left - 25
        // const Ymid = Yend / 2 - 100
        // const Xmid = Xend / 2 + 100
        const els = [el]
        const shadowOffsetX = 100
        if (addShadow) {
          const elShadow = document.createElement('div')
          // elShadow.style.width = '30px'
          // elShadow.style.height = '22px'
          elShadow.innerHTML = el.innerHTML
          elShadow.style['font-size'] = '4em'
          elShadow.style.position = 'fixed'
          elShadow.style.top = top + 'px'
          elShadow.style.left = left + shadowOffsetX + 'px'
          elShadow.style['pointer-events'] = 'none'
          elShadow.style['z-index'] = 990
          // elShadow.style['object-fit'] = 'contain'
          // elShadow.style['box-shadow'] = '0 0 10px 0 rgba(0, 0, 0, 0.25)'
          elShadow.style.color = 'transparent'
          elShadow.style['text-shadow'] = '0 0 8px rgb(0, 0, 0, .1), 4px 2px 10px rgb(0, 0, 0, .1), -4px 2px 10px rgb(0, 0, 0, .1), 4px -2px 10px rgb(0, 0, 0, .1), -4px -2px 10px rgb(0, 0, 0, .1)'
          document.body.appendChild(elShadow)
          els.push(elShadow)
        }
        els.forEach((_el, index) => {
          const shadow = (index === 1)
          const id = uid()
          if (!state.fly[id]) {
            const animation = anime({
              targets: _el,
              translateX: (shadow) ? Xend - shadowOffsetX : Xend,
              translateY: (shadow) ? Yend : Yend,
              scale: (shadow)
                ? [1, 1.1, 1.1, 0.8, 0.4]
                : [1, 1.1, 1.1, 0.8, 0.4],
              duration: animationDuration,
              easing: 'easeOutQuad',
              elasticity: 0,
              autoplay: false
            })
            commit('setAnimation', {type: 'fly', id, animation})
          }
          commit('resetAnimation', {type: 'fly', id})
          setTimeout(_ => {
            if (hidden) addClass(_el, 'hidden')
            if (hideAfter) addClass(_el, 'hidden')
            if (clone && hideAfter) _el.remove()
            resolve()
          }, animationDuration)
        })
        // state.fly[id].complete = (anim) => {
        //   if (hidden) addClass(el, 'hidden')
        //   resolve()
        // }
      })
    },
  },
  getters:
  {
  }
}
