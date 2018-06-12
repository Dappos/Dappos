<template>
<div class="firebase-ui-wrapper">
  <div id="firebaseui-auth-container"></div>
</div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import config from '../config/config'
const uiConfig = config.firebaseUI

export default {
  components: {},
  props: [],
  data () { return {} },
  mounted () {
    this.startUi()
  },
  computed:
  {
  },
  methods:
  {
    startUi () {
      // Initialize the FirebaseUI Widget using Firebase.
      let ui = firebaseui.auth.AuthUI.getInstance()
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth())
      }
      // The start method will wait until the DOM is loaded.
      console.log('isPendingRedirect() → ', ui.isPendingRedirect())
      // if (ui.isPendingRedirect()) {
      //   ui.start('#firebaseui-auth-container', uiConfig);
      // }
      ui.start('#firebaseui-auth-container', uiConfig)
    },
  }
}
</script>

<style lang="stylus">
@import '../css/themes/common.variables'

.firebase-ui-wrapper
  button
    border-radius $radius
  .firebaseui-idp-password
    background-color $primary

</style>
