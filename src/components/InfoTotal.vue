<template>
<div class="info-total">
  <div class="_text">Charge</div>
  <div class="_price">{{ get['cart/totalAmount'] | money(get['settings/currency/config']) }}</div>
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

.info-total
  pa md
  font-size 1.4em
  width 100%
  background-color $primary
  color white
  font-weight 500
  display flex
  justify-content center
  border-radius $radius
._price
  ml sm
  input
    background none
    border none
    outline none
    color white
    text-align right

</style>
