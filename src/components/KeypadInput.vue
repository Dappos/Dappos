<template>
<div class="keypad-input">
  <div class="_note">Item</div>
  <div class="_input">
    <money v-model="state.keypad.input" v-bind="get['settings/currency/config']" />
    <!-- <input v-model.lazy="state.keypad.input" v-money="get['settings/currency/config']" /> -->
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: [],
  data () { return {} },
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

.keypad-input
  display flex
  align-items baseline
  background-color white
  px md
  py lg
  ._note
    color $gray-dark
    font-size 2em
  ._input
    flex 1
    // height 100%
    input
      width 100%
      border none
      font-size 2.5em
      text-align right

</style>
