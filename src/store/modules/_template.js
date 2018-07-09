import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'

function initialState () {
  // ❗️ properties > 1 level deep are not reset with resetStateData()
  return {
    stateValue: null,
    '1': {'2': {'3': {'4': {'5': null}}}},
    colors: {primary: 'black'}
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mounted () {
    console.log('this → ', this)
  },
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
    'setColors.primary': ({state, commit, dispatch}, newColor) => {
      // dispatch('patchToServer', state.colors.primary, {root: true})
      // console.log('patched')
      return dispatch('set/colors.primary', newColor)
    },
    doIt (
      {state, getters, rootState, rootGetters, commit, dispatch},
      {id} = {}
    ) {
      // getters.someOtherGetter // -> 'foo/someOtherGetter'
      // rootGetters.someOtherGetter // -> 'someOtherGetter'

      dispatch('someOtherAction') // -> 'foo/someOtherAction'
      dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

      commit('someMutation') // -> 'foo/someMutation'
      commit('someMutation', null, { root: true }) // -> 'someMutation'
    }
  },
  getters:
  {
    'colors.primary': (state) => {
      // console.log('gotit! ')
      // return hexToReadableColor(state.colors.primary)
      return state.colors.primary + 'is the color bitchez'
    },
    getIt: (state, getters, rootState, rootGetters) => (id) => {
      // getters.someOtherGetter // -> 'foo/someOtherGetter'
      // rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
