import Vue from 'vue'
import Vuex from 'vuex'

import initStore from './store'

Vue.use(Vuex)

const store = new Vuex.Store(initStore())

export default store
