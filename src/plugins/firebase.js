// import something here
import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '../config/config'

// leave the export, even if you don't use it
export default ({ app, router, Vue, store }) => {

  // Initialize Firebase from settings
  Firebase.initializeApp(config.firebase)

  // Configure Firestore
  const firestore = Firebase.firestore()
  firestore.settings({ timestampsInSnapshots: true })
  Vue.prototype.$firebase = Firebase
  Vue.prototype.$firestore = firestore
  store.$firebase = Firebase
  store.$db = firestore

}
