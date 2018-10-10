<template>
  <div id="q-app" :style="{'min-height': $store.state.windowSize.height + 'px'}">
    <router-view class="_app-wrapper" />
    <q-window-resize-observable @resize="onResize" />
    <modals />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // change arrow in q-btn-dropdown
    this.$q.icon.input.dropdown = 'ion-arrow-down'
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
