<template>
  <div id="q-app">
    <router-view class="_app-wrapper" />
    <q-window-resize-observable @resize="onResize" />
    <modals />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('web3/getAddress')
    this.$store.dispatch('ethEvents/observeAccount')
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

#q-app
  min-height 100vh
  display flex
  flex-direction column
  justify-content center
  background-color #f6f5f5
._app-wrapper
  box-shadow 0 0 100px -10px rgba(0,0,0,0.2)

</style>
