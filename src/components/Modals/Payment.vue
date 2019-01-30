<template>
<div class="payment">
  <!-- TOP -->
  <div class="_wrapper-top">
    <div class="_title">Awaiting payment</div>
    <div v-if="!halfPaid" class="_price">
      {{ get('cart/valueFiat') | money(get('settings/currencyConfig')) }}
    </div>
    <div v-if="halfPaid" class="_price">
      Received {{ get('ethEvents/transactionsTotalValueConverted') }} / {{ get('cart/valueToken') }} {{ get('settings/selectedToken').toUpperCase() }}
    </div>
      <!-- :value="state.settings.selectedToken" -->
      <!-- @change="token => { set('settings/selectedToken', token) }" -->
      <!-- :options="tokensDropdown" -->
    <q-btn-dropdown
      :disabled="halfPaid || state.modals.cart.payment.stage > 1"
      class="_eth"
      :label="`${get('cart/valueToken')} ${get('settings/selectedToken').toUpperCase()} `"
      dense rounded
    >
      <q-list link>
        <q-item
          v-for="(token, key) in tokensDropdown"
          @click.native="changeToken(token.value)"
          :key="`token-dd-${key}`"
          v-close-overlay
        >
          <q-item-main>
            <q-item-tile label class="flex items-baseline">
              <q-icon :name="token.icon" class="mr-sm" /> {{ token.label }}
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <!-- <q-icon name="" class="mr-sm" />{{ get('cart/valueEth') }} ETH -->
    </q-btn-dropdown>
    <div class="_cart-btn-wrapper" v-if="state.modals.cart.payment.stage > 1">
      <button
        @click="dispatch('modals/toggle', 'cart.cart')"
        class="_cart-btn"
      >Cart</button>
    </div>
  </div>

  <!-- MIDDLE -->
  <div class="_wrapper-middle">
    <!-- Stage 1: Payment request (with QR) -->
    <div v-if="state.modals.cart.payment.stage === 1" class="_middle-inner _qr-wrapper">
      <div class="_qr-loading" v-if="state.cart.paymentRequest.value === 0">
        <q-spinner-oval color="primary" />
      </div>
      <canvas
        id="js-qr"
        v-show="state.cart.paymentRequest.value > 0"
        class="_qr"
      ></canvas><!-- must be v-show for qr generation library -->
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
    <div class="_address">Merchant's address:<br>{{ get('settings/wallet.address') }}</div>
    <div
      v-if="state.modals.cart.payment.stage === 1"
      class="_spinner"
    >
      <q-spinner-oval color="white" size="26px" />
      <span class="pl-sm pt-xs">Scanning...</span>
    </div>
    <div
      v-if="(state.modals.cart.payment.stage !== 1 && !fullyPaidNoConf)"
      class="_close"
    >
      <button
        @click="dispatch('modals/toggle', 'cart.payment')"
      >Close</button>
    </div>
    <div
      v-if="halfPaid && !fullyPaidNoConf"
      class="_close"
    >
      <button
        @click="dispatch('modals/toggle', 'cart.reallyClosePayment')"
      >Close</button>
    </div>
    <div class="_manual-check-btn">
      <button @click="manualTransactionCheck">
        <q-icon name="fas fa-redo-alt" v-if="!manualScanning" />
        <div
         v-if="manualScanning"
         class="_manual-check-emoji animation-flip-x"
        >👀</div>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  props: ['halfPaid', 'fullyPaidNoConf'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return { manualScanning: false } },
  computed:
  {
    confirmationCount () {
      return this.get('ethEvents/watcherConfirmationCount')
    },
    tokensDropdown () {
      const tokens = this.get('settings/availableTokens')
      const tokensFormatted = Object.values(tokens)
        .map(token => {
          return {
            icon: token.icon,
            label: token.id.toUpperCase(),
            sublabel: token.sublabel,
            value: token.id
          }
        })
      return tokensFormatted
    },
  },
  methods:
  {
    changeToken (token) {
      this.set('settings/selectedToken', token)
      this.dispatch('modals/resetPaymentRequest')
      this.dispatch('modals/createPaymentRequest')
    },
    manualTransactionCheck () {
      const selectedToken = this.state.settings.selectedToken
      this.dispatch('ethEvents/manualTransactionCheck', selectedToken)
      this.manualScanning = true
      setTimeout(_ => { this.manualScanning = false }, 2400)
    },
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
  background-color rgba(255, 255, 255, 0.15)
  font-weight 450
  px md
  py 0
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

._qr-wrapper
  position relative
._qr
  width 100% !important
  height auto !important
  opacity .7
._qr-loading
  position absolute
  height 100%
  width 100%
  top 0
  left 0
  display flex
  align-items center
  justify-content center
  font-size 3em

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
  display flex
  align-items center
._close
  mt md
  button
    reset-button()
    color $white-light
._manual-check-btn
  mt md
  button
    o-txt-btn(white)
    display flex
    justify-content center
    align-items center
    &:focus
      outline none
  ._manual-check-emoji
    font-size 2rem
    margin-top -14px
    margin-bottom -15px

</style>
