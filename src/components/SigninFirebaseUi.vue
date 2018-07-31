<template>
<div class="firebase-ui-wrapper">
  <div class="_private-beta-msg">
    <div>Dappos is currently in private Beta.</div>
    <div class="mt-lg">Please sign up at <a href="https://dappos.app">dappos.app</a> and wait for your invitation.</div>
  </div>
  <div id="firebaseui-auth-container"></div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import config from '@config/config'
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
      console.log('isPendingRedirect() → ', ui.isPendingRedirect())
      // The start method will wait until the DOM is loaded.
      // if (ui.isPendingRedirect()) {
      //   ui.start('#firebaseui-auth-container', uiConfig);
      // }
      const el = document.getElementById('firebaseui-auth-container')
      if (!el) return
      ui.start('#firebaseui-auth-container', uiConfig)
    },
  }
}
</script>

<style lang="stylus">
@import '~styl/variables'

.firebase-ui-wrapper
  button
    border-radius $radius
  .firebaseui-idp-password
    background-color $primary
.firebaseui-container
  fonts()
  box-shadow none
.firebaseui-card-header
  pt xl
  border-bottom none
.firebaseui-label
  color $gray-light
.firebaseui-label::after
  background-color $primary !important
.firebaseui-button
  text-transform capitalize !important
  border none !important
  background-color $primary !important
  color white !important
  font-weight 500 !important
  border-radius $radius !important
  white-space nowrap !important
  text-decoration none !important
  text-align center !important
  shadow-subtle()
._private-beta-msg
  pa xl
  pt 0
  font-size 1.1em

</style>
