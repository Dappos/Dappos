<template>
<div class="_info-cart">
  <div class="_cart">Cart</div>
  <div class="_count">2</div>
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

._info-cart
  display flex
  align-items center
  color $text
._cart
  mr sm
._count
  font-weight 500
  px sm
  py xxs
  pb xs
  border 2px solid $text
  border-radius .4em

</style>
