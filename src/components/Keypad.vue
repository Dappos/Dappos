<template>
<div class="keypad">
  <div class="_1">1</div>
  <div class="_2">2</div>
  <div class="_3">3</div>
  <div class="_4">4</div>
  <div class="_5">5</div>
  <div class="_6">6</div>
  <div class="_7">7</div>
  <div class="_8">8</div>
  <div class="_9">9</div>
  <div class="_C">C</div>
  <div class="_0">0</div>
  <div class="_add">add</div>
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

.keypad
  display grid
  width 100%
  height 100%
  grid-template-rows 1fr 1fr 1fr 1frs
  grid-template-columns 1fr 1fr 1fr
// ._1
// ._2
// ._3
// ._4
// ._5
// ._6
// ._7
// ._8
// ._9
// ._0
// ._C
// ._add

</style>
