<template>
<div class="payment">
  <div class="_wrapper-top">
    <div class="_title">Payment Request</div>
    <div class="_price">{{ get('cart/value') | money(get('settings/currencyConfig')) }}</div>
    <div class="_eth">Ξ {{ get('cart/valueEth') }}</div>
  </div>
  <div class="_wrapper-bottom">
    <!-- Stage 1: Payment request (with QR) -->
    <div v-if="get('modals/cart.payment.stage') === 1" class="_inner-wrapper">
      <div class="_qr qr-code" id="js-qr"></div>
      <div class="_address">{{ get('settings/wallet.address') }}</div>
      <div class="_spinner"><q-spinner-oval color="primary" /></div>
    </div>
    <!-- Stage 2: Counting txn confirmations -->
    <div v-if="get('modals/cart.payment.stage') === 2">
      <div class="_confirmations">{{ confirmationCount }} confirmations</div>
      <div class="_emoji animation-flip-x">👀</div>
      <div class="_progress _watching">Watching transactions...</div>
      <div class="_spinner"><q-spinner-oval color="primary" /></div>
    </div>
    <!-- Stage 3: Success! -->
    <div v-if="get('modals/cart.payment.stage') === 3">
      <div class="_confirmations">{{ confirmationCount }} confirmations</div>
      <div class="_emoji animate-bounce">👍</div>
      <div class="_progress _success">Payment received 🎉</div>
    </div>
    <div class="_close">
      <button @click="dispatch('modals/toggle', 'cart.payment')">Close</button>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    confirmationCount () {
      return Object.values(this.get('cart/confirmedTransactions'))[0]
    },
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.payment
  font-size 1em
._wrapper-top, ._wrapper-bottom
  pa lg
._wrapper-top, ._wrapper-bottom, ._inner-wrapper
  display flex
  flex-direction column
  align-items center
  text-align center
  width 100%
._wrapper-top
  border-bottom 1px solid $gray-light
// ._wrapper-bottom
._title
  font-weight 600
._price
  font-weight 600
  font-size 1.5em
  mt md
._eth
  mt sm
  font-size .8em
  color $gray-dark
._qr
  height 150px
  width 150px
._address
  mt sm
  media-sm mt lg
  font-size .7em
  color $gray-dark
  width 100%
  word-wrap break-word
._spinner
  mt xs
  media-sm mt sm
._confirmations
  font-size .8em
  color $gray-light
._emoji
  font-size 5em
._progress
  mt -.5em
// ._watching
._success
  color $positive
  font-weight 600
._close
  mt md
  button
    reset-button()
    color $gray-light

</style>
