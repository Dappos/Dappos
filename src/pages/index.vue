<template>
  <q-page class="_index-wrapper">
    <modals />
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
import { dom } from 'quasar'
const { style, height } = dom

export default {
  name: 'index',
  mounted () {
      // let elH = style(this.$el, 'min-height')
      // console.log('elH → ', elH)
      // let elH2 = height(this.$el)
      // console.log('elH2 → ', elH2)
      // console.log('this.$el.offsetHeight → ', this.$el.offsetHeight)
      // console.log('this style → ', this.$el.style.minHeight)
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
