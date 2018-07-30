<template>
  <div id="q-app" :style="{'min-height': $store.state.windowSize.height + 'px'}">
    <router-view class="_app-wrapper" />
    <q-window-resize-observable @resize="onResize" />
    <modals />
  </div>
</template>

<script>
import notify from '@helpers/NotifyHelper'

export default {
  name: 'App',
  mounted () {
    notify({
      preset: 'toast',
      textColor: 'white',
      color: 'blue',
      timeout: 80000,
      message: `💬 Dear beta testers,

・ETH transfer is recommended for Trust wallet
・You can also choose Ropsten from the settings. It is recommended for testing.

Over the next couple of days we're going to make sure it's compatible with other wallets like BRD wallet, cipher etc!!👨🏻‍💻`})
  },
  methods:
  {
    onResize (size) {
      this.$store.set('windowSize', size)
    },
  }
}
</script>

<style lang="stylus">
.q-alert-content div
  white-space pre-line
#q-app
  display flex
  flex-direction column
  justify-content center
  background-color #f6f5f5
._app-wrapper
  box-shadow 0 0 100px -10px rgba(0,0,0,0.2)

</style>
