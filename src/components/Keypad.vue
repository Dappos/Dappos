<template>
<div class="keypad">
  <keypad-input class="_keypad-input" />
  <keypad-keys class="_keypad-keys" />
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'
import KeypadKeys from './Keypad_Keys'
import KeypadInput from './Keypad_Input'

export default {
  components: { KeypadKeys, KeypadInput },
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

.keypad
  width 100%
  display flex
  flex-direction column
  border-radius $radius
  ._keypad-input
    border-top-left-radius $radius
    border-top-right-radius $radius
    width 100%
  ._keypad-keys
    border-bottom-left-radius $radius
    border-bottom-right-radius $radius
    overflow hidden
    width 100%
    height 100%
    flex 1
    border-top 1px solid $bg-light

</style>
