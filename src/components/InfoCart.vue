<template>
<div class="info-cart">
  <button
    @click="toggleCart"
    class="_link reset-button"
  >
    <div class="_cart">Cart</div>
    <div class="_count js-info-cart">{{ get('cart/totalCount') }}</div>
  </button>
  <!-- <router-link to="/cart" class="_link">
    <div class="_cart">Cart</div>
    <div class="_count">{{ get('cart/totalCount') }}</div>
  </router-link> -->
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

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
    toggleCart () {
      this.dispatch('modals/toggle', 'cart.cart')
      this.dispatch('modals/toggleMenu', false)
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

// .info-cart
._link
  reset-a()
  display flex
  align-items center
  color $gray-dark
  width 100%
  height 100%
  font-size .875em
._cart
  mr sm
  font-weight 500
._count
  font-weight 500
  height 1.7rem
  width 1.7rem
  border 2px solid $gray-dark
  border-radius $radius
  display flex
  text-align center
  align-items center
  justify-content center

</style>
