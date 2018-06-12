<template>
  <q-page class="_index-wrapper">
    <div class="_info-total-wrapper"><info-total /></div>
    <div class="_navigation-tabs-wrapper"><navigation-tabs /></div>
    <div class="_router-view-wrapper">
      <router-view class="_router-view" />
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
    // let self = this
    // this.$nextTick(_ => {
    //   let elH = style(self.$el, 'min-height')
    //   console.log('elH → ', elH)
    //   let elH2 = height(self.$el)
    //   console.log('elH2 → ', elH2)
    //   console.log('self.$el.offsetHeight → ', self.$el.offsetHeight)
    //   console.log('this style → ', self.$el.style.minHeight)
    // })
  },
  computed:
  {
    state () { return this.$store.state },
  },
  methods:
  {
    get (path) { return this.$store.get(path) },
    set (path, val) { return this.$store.set(path, val) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

._index-wrapper
  display flex
  flex-direction column
  pa sm
._info-total-wrapper
  px sm
._navigation-tabs-wrapper
  py sm
._router-view-wrapper
  flex 1
  display flex
._router-view
  flex 1

</style>
