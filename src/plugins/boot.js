import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default ({ app, router, Vue, store }) => {
  // firebase.auth().getRedirectResult()
  // .then(result => store.dispatch('user/signInSuccess', {user: result}))
  // .catch(error => store.dispatch('apiError', {error, method: 'getRedirectResult()'}))

  // Register the Firebase authentication listener
  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Configure Firestore
      const firestore = Firebase.firestore()
      firestore.settings({timestampsInSnapshots: true})
      Vue.prototype.$firestore = firestore
      store.$db = firestore
      // Signed in. Let Vuex know.
      store.commit('user/menulist/SET_ITEMS', {})
      store.dispatch('user/userOnAuthListener', {user})
      store.dispatch('user/menulist/openDBChannel')
      store.dispatch('settings/openDBChannel')

      router.replace({name: 'home'})
      // eslint-disable-next-line
      new Vue(app)
    } else {
      // Signed out. Let Vuex know.
      // store.commit('auth/RESET_USER')
      console.log('no user found on authListener...')
      router.replace({ name: 'signin' })
      // eslint-disable-next-line
      new Vue(app)
    }
  })
}
