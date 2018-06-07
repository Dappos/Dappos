// import something here
import firebase from 'firebase'
import config from '../config/config'

// leave the export, even if you don't use it
export default ({ app, router, Vue, store }) => {

  firebase.initializeApp(config.firebase)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return store.dispatch('user/userOnAuthListener', {user})
    }
    // return store.dispatch('user/signOutSuccess')
    console.log('no user found during authListener!')
  })
  window.firebase = firebase
  firebase.auth().getRedirectResult()
  .then(result => store.dispatch('user/signInSuccess', {user: result}))
  .catch(error => store.dispatch('user/authError', {error, method: 'getRedirectResult()'}))
}
