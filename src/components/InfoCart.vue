<template>
<div class="info-cart">
  <button
    @click="state.cart.opened.state = !state.cart.opened.state"
    class="_link reset-button"
  >
    <div class="_cart">Cart</div>
    <div class="_count js-info-cart">{{ get['cart/totalCount'] }}</div>
  </button>
  <!-- <router-link to="/cart" class="_link">
    <div class="_cart">Cart</div>
    <div class="_count">{{ get['cart/totalCount'] }}</div>
  </router-link> -->
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

// .info-cart
._link
  reset-a()
  display flex
  align-items center
  color $gray-dark
  width 100%
  height 100%
._cart
  mr sm
  font-weight 500
._count
  font-weight 500
  px sm
  py xxs
  // pb xs
  border 2px solid $gray-dark
  border-radius $radius

</style>
