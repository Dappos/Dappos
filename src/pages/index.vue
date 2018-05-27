<template>
  <q-page class="_index-wrapper">
    <div class="pa-md"><info-total /></div>
    <navigation-tabs />
    <div class="_sub-page-wrapper"><keypad /></div>
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
  display flex
  flex-direction column

._sub-page-wrapper
  flex 1
  display flex
  flex-direction column
.keypad
  flex 1

</style>
