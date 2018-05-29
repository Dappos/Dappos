<template>
  <q-page class="_index-wrapper">
    <div class="_info-total-wrapper"><info-total /></div>
    <div class="_navigation-tabs-wrapper"><navigation-tabs /></div>
    <div class="_sub-page-wrapper">
      <router-view />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'index'
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

._index-wrapper
  height calc(100vh - 50px) // important!
  display flex
  flex-direction column
  pa sm
._info-total-wrapper
  px sm
._navigation-tabs-wrapper
  py sm
._sub-page-wrapper
  flex 1
  display flex
  flex-direction column
.keypad
  flex 1

</style>
