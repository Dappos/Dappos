<template>
<div class="keypad-input">
  <div class="_note">Item</div>
  <div class="_input">
    <money v-model="state.keypad.input" v-bind="get('settings/currency/config')" />
    <!-- <input v-model.lazy="state.keypad.input" v-money="get('settings/currency/config')" /> -->
  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
  },
  methods:
  {
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
    px sm
  ._input
    flex 1
    // height 100%
    input
      px sm
      width 100%
      border none
      font-size 2.5em
      text-align right

</style>
