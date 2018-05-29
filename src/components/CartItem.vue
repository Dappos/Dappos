<template>
<div class="cart-item">
  <div class="_wrapper">
    <div class="_identity">
      <div class="_name">{{ item.name }}</div>
      <div class="_count">x {{ item.count }}</div>
    </div>
    <div class="_nav">
      <button class="_delete">delete</button>
    </div>

    <!-- {{ item.prices[state.settings.currency.currency] | money(get['settings/currency/config']) }} -->
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: ['item'],
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

.cart-item
  px lg

._wrapper
  line-height 2.4
  font-size 1.2em
  display flex
  justify-content space-between
  border-bottom 1px solid $bg-light
._identity
  display flex
// ._name
._count
  ml md
  color $gray-light
._delete
  reset-button()
  color $gray-light

</style>
