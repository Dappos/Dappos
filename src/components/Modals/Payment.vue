<template>
<div class="payment">
  <!-- TOP -->
  <div class="_wrapper-top">
    <div class="_title">Awaiting payment</div>
    <div class="_price">{{ get('cart/value') | money(get('settings/currencyConfig')) }}</div>
    <div class="_eth"><q-icon name="fab fa-ethereum" class="mr-sm" />{{ valueEth }} ETH</div>
    <div class="_cart-btn-wrapper">
      <button
        @click="dispatch('modals/toggle', 'cart.cart')"
        class="_cart-btn"
      >Cart</button>
    </div>
  </div>

  <!-- MIDDLE -->
  <div class="_wrapper-middle">
    <!-- Stage 1: Payment request (with QR) -->
    <div v-if="state.modals.cart.payment.stage === 1" class="_middle-inner">
      <canvas class="_qr" id="js-qr"></canvas>
    </div>
    <!-- Stage 2: Counting txn confirmations -->
    <div v-if="state.modals.cart.payment.stage === 2" class="_middle-inner">
      <div class="_confirmations">{{ confirmationCount }} confirmations</div>
      <div class="_emoji animation-flip-x">👀</div>
      <div class="_progress _watching">Watching transactions</div>
    </div>
    <!-- Stage 3: Success! -->
    <div v-if="state.modals.cart.payment.stage === 3" class="_middle-inner">
      <div class="_confirmations">{{ confirmationCount }} confirmations</div>
      <div class="_emoji animation-half-rotation">✌️</div>
      <div class="_progress animation-appear _success">Payment success</div>
    </div>
  </div>

  <!-- BOTTOM -->
  <div class="_wrapper-bottom">
    <div class="_address">{{ get('settings/wallet.address') }}</div>
    <div
      v-if="state.modals.cart.payment.stage === 1"
      class="_spinner"
    >
      <q-spinner-oval color="white" />
    </div>
    <div
      v-if="state.modals.cart.payment.stage !== 1"
      class="_close"
    >
      <button
        @click="dispatch('modals/toggle', 'cart.payment')"
      >Close</button>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'
import { floorDecimals } from '@helpers/roundNumberDown'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    valueEth () {
      const eth = this.get('cart/valueEth')
      return floorDecimals(eth, 5)
    },
    confirmationCount () {
      return this.get('ethEvents/watcherConfirmationCount')
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
  background-color $primary-light
  color white
  pa lg
  px 1.2em
._wrapper-top, ._wrapper-bottom, ._wrapper-middle
  display flex
  flex-direction column
  align-items center
  text-align center
  width 100%
// TOP
._wrapper-top
  position relative
  ._cart-btn-wrapper
    position absolute
    right 0
    top 0
    mr -.5em
    mt -.3em
    ._cart-btn
      reset-button()
      px md
      py xs
      font-size .75em
      border-radius 1em
      font-weight 500
      color $white-light
      background-color $white-extralight
._title
  font-weight 600
  font-size 0.75em
  color $white-light
._price
  font-weight 600
  font-size 1.5em
  mt sm
._eth
  mt xs
  font-size 0.875em
  color $white-light
  display flex
  align-items baseline
// MIDDLE
._wrapper-middle
  mt md
  color $gray-blueish
._middle-inner
  pa md
  height 12.125rem
  width 12.125rem
  background-color white
  border-radius $radius-big
  shadow-subtle()
  display flex
  flex-direction column
  justify-content space-between
._qr
  width 100% !important
  height auto !important
  opacity .7

._confirmations
  font-size .75em
._emoji
  font-size 5em
._progress
  mt -.5em
  font-weight 600
._watching
  font-size .9em
._success
  font-size 1.25em
  color $primary
// BOTTOM
._wrapper-bottom
  mt md
._address
  media-sm mt lg
  font-size .6875em
  color $white-light
  width 100%
  word-wrap break-word
._spinner
  mt md
._close
  mt md
  button
    reset-button()
    color $white-light

</style>
