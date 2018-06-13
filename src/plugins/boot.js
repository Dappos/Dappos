import Firebase from 'firebase/app'
import 'firebase/auth'

export default ({ app, router, Vue, store }) => {

  // firebase.auth().getRedirectResult()
  // .then(result => store.dispatch('user/signInSuccess', {user: result}))
  // .catch(error => store.dispatch('apiError', {error, method: 'getRedirectResult()'}))

  // Register the Firebase authentication listener
  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Signed in. Let Vuex know.
      store.dispatch('user/userOnAuthListener', {user})
      store.dispatch('settings/openDBChannel')
      router.replace({ name: 'home' })
      new Vue(app)
    } else {
      // Signed out. Let Vuex know.
      // store.commit('auth/RESET_USER')
      console.log('no user found on authListener...')
      router.replace({ name: 'signin' })
      new Vue(app)
    }
  })

}
