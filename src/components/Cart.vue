<template>
<div class="cart">
  <item-row
    v-for="(item, index) in state.cart.items"
    :item="item"
    :key="'c-' + index"
  />
  <div class="_clear">
    <button @click="dispatch('cart/clearAll')">Clear all</button>
  </div>
</div>
</template>

<script>
import ItemRow from './Cart_ItemRow'

export default {
  components: { ItemRow },
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
