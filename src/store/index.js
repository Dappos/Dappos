import Vue from 'vue'
import Vuex from 'vuex'
import copyObj from '../helpers/copyObj'

import initStore from './store'

Vue.use(Vuex)

const store = new Vuex.Store(initStore())
// store.initialStateCopy = copyObj(store.state)

export default store
