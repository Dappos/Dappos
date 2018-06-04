<template>
<div class="payment">
  <div class="_wrapper-top">
    <div class="_title">Payment Request</div>
    <div class="_price">{{ get['cart/totalAmount'] | money(get['settings/currency/config']) }}</div>
    <div class="_eth">Ξ 0.0421</div>
  </div>
  <div class="_wrapper-bottom">
    <div v-if="state.cart.payment.stage === 1" class="_inner-wrapper">
      <div class="_qr qr-code" id="js-qr"></div>
      <div class="_address">{{ state.settings.walletAddress }}</div>
      <div class="_spinner"><q-spinner-oval color="primary" /></div>
    </div>
    <div v-if="state.cart.payment.stage === 2">
      <div class="_confirmations">0 confirmations</div>
      <div class="_emoji animation-flip-x">👀</div>
      <div class="_progress _watching">Watching transactions...</div>
      <div class="_spinner"><q-spinner-oval color="primary" /></div>
    </div>
    <div v-if="state.cart.payment.stage === 3">
      <div class="_confirmations">1 confirmations</div>
      <div class="_emoji animate-bounce">👍</div>
      <div class="_progress _success">Payment received 🎉</div>
    </div>
    <div class="_close">
      <button @click="state.cart.payment.state = false">Close</button>
    </div>
  </div>
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

.payment
  font-size 1.2em
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
  height 200px
  width 200px
._address
  mt lg
  font-size .7em
  color $gray-dark
  width 100%
  word-wrap break-word
._spinner
  mt sm
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
