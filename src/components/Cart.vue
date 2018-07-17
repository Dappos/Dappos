<template>
<div class="cart">
  <transition-group
    leave-active-class="animated flipOutX"
  >
    <item-row
      v-for="(item, index) in state.cart.items"
      :item="item"
      :key="'c-' + index"
    />
  </transition-group>
  <div class="_clear">
    <button @click="dispatch('cart/clearAll')">Clear all</button>
  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'
import ItemRow from './Cart_ItemRow'

export default {
  components: { ItemRow },
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

// .cart
._clear
  px lg
  width 100%
  button
    reset-button()
    width 100%
    border-bottom 1px solid $bg-light
    font-size 1.2em
    color $gray-light
    py md

</style>
