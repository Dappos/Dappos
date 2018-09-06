<template>
<button @click="pay" class="info-total o-btn">
  <div class="_text">Charge</div>
  <div class="_price">
    <span>
      {{ get('cart/valueFiatAnimation.frameVal') | money(get('settings/currencyConfig')) }}
    </span>
  </div>
</button>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  mounted () {
    this.dispatch('cart/initializeTotalAmountAnimation')
  },
  computed:
  {
    watchCountup: {
      get () {
        return (!this.get('cart/valueFiatAnimation'))
          ? 0
          : this.get('cart/valueFiatAnimation.frameVal')
      },
      set () {}
    },
  },
  methods:
  {
    pay () {
      if (!this.get('cart/valueFiat')) return
      if (!this.state.settings.wallet.address) return this.dispatch('modals/toggle', 'wallet.noAddressFound')
      this.dispatch('modals/toggle', 'cart.payment')
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.info-total
  width 100%
  font-weight 600
._price
  ml sm
  input
    background none
    border none
    outline none
    color white
    text-align right

</style>
