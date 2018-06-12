<template>
<button @click="pay" class="info-total o-btn">
  <div class="_text">Charge</div>
  <div class="_price">
    <span>
      {{ state.cart.totalAmountAnimation.frameVal | money(get('settings/currency/config')) }}
    </span>
  </div>
</button>
</template>

<script>
import storeAccess from './mixins/storeAccess'

export default {
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () {
    return {
      startVal: 0,
      endVal: 0,
      decimals: 0,
      duration: 2.5,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  mounted () {
    this.dispatch('cart/initializeTotalAmountAnimation')
  },
  computed:
  {
    watchCountup: {
      get () {
        return (!this.state.cart.totalAmountAnimation)
          ? 0
          : this.state.cart.totalAmountAnimation.frameVal
      },
      set () {}
    },
  },
  methods:
  {
    pay () {
      if (!this.get('cart/totalAmount')) return
      this.state.cart.payment.state = true
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

.info-total
  width 100%
._price
  ml sm
  input
    background none
    border none
    outline none
    color white
    text-align right

</style>
