import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import template from './modules/_template'

export default function () {
  return {
    state: state(),
    getters,
    mutations,
    actions,
    modules: {
      template,
    }
  }
}
