import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'

export default {
  firebase: {
    apiKey: 'AIzaSyBF5fv0Tu_EpYsTLf2JpthlBZjoTKByMxY',
    authDomain: 'dappos-web.firebaseapp.com',
    databaseURL: 'https://dappos-web.firebaseio.com',
    projectId: 'dappos-web',
    storageBucket: 'dappos-web.appspot.com',
    // messagingSenderId: '59424549286'
  },
  firebaseUI: {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Terms of service url.
    tosUrl: 'localhost'
  }
}
