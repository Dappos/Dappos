<template>
<button @click="pay" class="info-total o-btn">
  <div class="_text">Charge</div>
  <div class="_price">{{ get('cart/totalAmount') | money(get('settings/currency/config')) }}</div>
</button>
</template>

<script>
import storeAccess from './mixins/storeAccess'

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
