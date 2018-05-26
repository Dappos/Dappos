import initialState from './state.js'

export default {
  resetStateData (state) {
    let newState = initialState()
    console.log('resetting state data')
    Object.assign(state, newState)
  },
  updateState (state, payload) {
    let key = payload.field
    let val = payload.value
    if (!key && !val) {
      key = Object.keys(payload)[0]
      val = payload[key]
    }
    state[key] = val
  },
}
