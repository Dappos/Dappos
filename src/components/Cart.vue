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
  <row-wrapper class="_clear" v-if="state.modals.cart.payment.stage === 1">
    <button @click="dispatch('cart/clearAll')">Clear all</button>
  </row-wrapper>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'
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
  width 100%
  button
    reset-button()
    width 100%
    color $gray-light
    py sm
    font-weight 500

</style>
