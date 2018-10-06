<template>
<div class="really-close-payment">
  <div class="_wrapper-top">
    <div class="_title">Received {{ get('ethEvents/transactionsTotalValueConverted') }} / {{ get('cart/valueToken') }} {{ get('settings/selectedToken').toUpperCase() }}</div>
    <div>
      You might need to refund the partial payment of {{ get('ethEvents/transactionsTotalValueConverted') }} {{ get('settings/selectedToken').toUpperCase() }}.<br><br>
      Really close payment?
    </div>
  </div>
  <div class="_wrapper-bottom">
    <button @click="dispatch('modals/toggle', 'cart.reallyClosePayment')" class="_stay">Cancel</button>
    <button @click="dispatch('modals/toggle', 'cart.reallyClosePayment'), dispatch('modals/toggle', 'cart.payment')" class="_close">Close payment</button>
  </div>
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.really-close-payment
  font-size 1em
._wrapper-top, ._wrapper-bottom
  pa lg
._wrapper-top
  display flex
  flex-direction column
  align-items center
  text-align center
  width 100%
._wrapper-top
  border-bottom 1px solid $gray-light
._title
  font-weight 600
  mb lg
._wrapper-bottom
  display flex
  justify-content flex-end
._close
  reset-button()
  ml md
  color $negative
._stay
  reset-button()
  color $primary

</style>
