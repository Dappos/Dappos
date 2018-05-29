<template>
<button class="menu-list-item" @click="dispatch('cart/addItem', item)">
  <div class="_wrapper">
    <div class="_name">{{ item.name }}</div>
    <div class="_price">{{ item.prices[state.settings.currency.currency] | money(get['settings/currency/config']) }}</div>
  </div>
</button>
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

.menu-list-item
  pa 0
  ma 0
  background none
  border none
  outline none
  width 100%
  border-bottom 1px solid $bg-light
  &:active
    box-shadow inset 2px 2px $bg-light
    padding-top 2px
    padding-left 2px
    margin-bottom -2px
    margin-right -2px
    z-index 1
._wrapper
  display flex
  justify-content space-between
  align-items baseline
  px xl
._name
  font-size 1.3em
._price
  font-size 1.2em


</style>
