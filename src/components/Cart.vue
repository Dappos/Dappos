<template>
<div class="cart">
  <div class="_wrapper">
    <div class="_top">
      <div class="_nav"></div>
      <div class="_title"><h2>Cart</h2></div>
    </div>
    <cart-item
      v-for="(item, index) in get['cart/itemsOverview']"
      :item="item"
      :key="'c-' + index"
    />
  </div>
</div>
</template>

<script>
import CartItem from './CartItem'

export default {
  components: { CartItem },
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

.cart
  background-color white
._top
  border-bottom 1px solid $bg-light
  pa lg

</style>
