import Vue from 'vue'
import { defaultMutations } from 'vuex-easy-access'

function initialState () {
  // ❗️ properties > 1 level deep are not reset with resetStateData()
  return {
    stateValue: null,
    '1': {'2': {'3': {'4': {'5': null}}}},
    o: {model:{path:{path:{to:{sub:{prop:1}}}}}},
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
      let newState = initialState()
      Object.assign(state, newState)
    },
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key])
      })
    },
    ...defaultMutations(initialState())
  },
  actions:
  {
    'setColors.primary': ({state, commit, dispatch}, newColor) => {

      // dispatch('patchToServer', state.colors.primary, {root: true})
      // console.log('patched')
      return commit('SET_COLORS.PRIMARY', newColor)
    },
    doIt (
      context,
      // {state, getters, rootState, rootGetters, commit, dispatch},
      {id} = {}
    ) {
      console.log('context → ', context)
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
    getIt: (state, getters, rootState, rootGetters) =>
    (id) => {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    }
  }
}
