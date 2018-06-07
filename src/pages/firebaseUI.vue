<template>
<q-page class="page-firebase-ui">
  <div id="firebaseui-auth-container"></div>
</q-page>
</div>
</template>

<script>
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import config from '../config/config'
const uiConfig = config.firebaseUI

export default {
  components: {},
  props: [],
  data () { return {} },
  mounted () {
    // Initialize the FirebaseUI Widget using Firebase.
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    // The start method will wait until the DOM is loaded.
    // console.log('isPendingRedirect → ', ui.isPendingRedirect)
    // console.log('isPendingRedirect() → ', ui.isPendingRedirect())
    // if (ui.isPendingRedirect()) {
    //   ui.start('#firebaseui-auth-container', uiConfig);
    // }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  computed:
  {
    get () { return this.$store.getters },
    state () { return this.$store.state },
  },
  methods:
  {
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
</script>

<style lang="stylus">
@import '../css/themes/common.variables'

.page-firebase-ui
  button
    border-radius $radius
  .firebaseui-idp-password
    background-color $primary

</style>
