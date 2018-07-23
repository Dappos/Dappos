<template>
<div class="keypad-input">
  <div class="_note">Item</div>
  <div class="_input">
    <money v-model="state.keypad.input" v-bind="get('settings/currencyConfig')" />
    <!-- <input v-model.lazy="state.keypad.input" v-money="get('settings/currencyConfig')" /> -->
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
@import '~styl/variables'

.keypad-input
  display flex
  align-items baseline
  background-color white
  font-weight 500
  px md
  py md
  media-lg py xl
  ._note
    color $gray-dark
    font-size .875em
    px sm
  ._input
    flex 1
    font-size 1.5em
    input
      px sm
      width 100%
      border none
      text-align right

</style>
