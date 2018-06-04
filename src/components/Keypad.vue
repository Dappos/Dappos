<template>
<div class="keypad" :style="style">
  <keypad-input class="_keypad-input" />
  <keypad-keys class="_keypad-keys" />
  <q-icon class="_fly-icon js-keypad-fly hidden" name="ion-add" color="primary" />
</div>
</template>

<script>
import Vue from 'vue'
import KeypadKeys from './Keypad_Keys'
import KeypadInput from './Keypad_Input'

export default {
  components: { KeypadKeys, KeypadInput },
  props: [],
  mounted () {
    // let h = this.$el.clientHeight
    // console.log('height.clientHeight → ', this.$el.clientHeight, this)
    // Vue.nextTick(_ => {
    //   console.log('height.clientHeight → ', this.$el.clientHeight, this)
    // })
    // console.log('height.offsetHeight → ', this.$el.offsetHeight, this)
    // this.style = `height: ${h}px`
    // this.$el.setAttribute('style',`height: ${h}px`)
    // this.$el.style.width=`height: ${h}`
  },
  data () { return { style: '' } },
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

.keypad
  width 100%
  display flex
  flex-direction column
  position relative
  ._keypad-input
    border-top-left-radius $radius
    border-top-right-radius $radius
    // overflow hidden
    width 100%
  ._keypad-keys
    border-bottom-left-radius $radius
    border-bottom-right-radius $radius
    overflow hidden
    width 100%
    height 100%
    flex 1
    border-top 1px solid $bg-light
._fly-icon
  position absolute
  top 10%
  left 47%
  font-size 4em
  z-index 10000

</style>
