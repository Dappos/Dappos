// import something here
import Firebase from 'firebase/app'
import config from '../config/config'

// leave the export, even if you don't use it
export default ({ app, router, Vue, store }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(config.firebase)

  Vue.prototype.$firebase = Firebase
  store.$firebase = Firebase
}
