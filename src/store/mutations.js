import initialState from './state'
import { defaultMutations } from 'vuex-easy-access'

export default {
  resetStateData (state) {
    let newState = initialState()
    console.log('resetting state data')
    Object.assign(state, newState)
  },
  updateState (state, payload) {
    Object.keys(payload).forEach(key => {
      Vue.set(state, key, payload[key])
    })
  },
  ...defaultMutations(initialState())
}
