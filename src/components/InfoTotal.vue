<template>
<button @click="pay" class="info-total o-btn">
  <div class="_text">Charge</div>
  <div class="_price">{{ get['cart/totalAmount'] | money(get['settings/currency/config']) }}</div>
</button>
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
    pay () {
      if (!this.get['cart/totalAmount']) return
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
