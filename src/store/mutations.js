import initialState from './state'
import { defaultMutations } from 'vuex-easy-access'

export default {
  resetStateData (state) {
    const newState = initialState()
    console.log('resetting state data')
    Object.assign(state, newState)
  },
  ...defaultMutations(initialState())
}
