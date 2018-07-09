<template>
<button @click="pay" class="info-total o-btn">
  <div class="_text">Charge</div>
  <div class="_price">
    <span>
      {{ get('cart/totalAmountAnimation.frameVal') | money(get('settings/currencyConfig')) }}
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
  mounted () {
    this.dispatch('cart/initializeTotalAmountAnimation')
  },
  computed:
  {
    watchCountup: {
      get () {
        return (!this.get('cart/totalAmountAnimation'))
          ? 0
          : this.get('cart/totalAmountAnimation.frameVal')
      },
      set () {}
    },
  },
  methods:
  {
    pay () {
      if (!this.get('cart/totalAmount')) return
      this.set('cart/payment.state', true)
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

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
