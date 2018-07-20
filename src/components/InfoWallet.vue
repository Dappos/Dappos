<template>
<div class="info-wallet">
  <div class="_wrapper">
    <div class="_title">Address</div>
    <div class="_address">
      <span>{{ addressStart }}</span>
      <span>...</span>
      <span>{{ addressEnd }}</span>
    </div>
  </div>
</div>
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
    addressStart () {
      return this.state.settings.wallet.address.slice(0, 8)
    },
    addressEnd () {
      return this.state.settings.wallet.address.substr(-6)
    },
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

// .info-wallet
// ._wrapper
._title
  color $gray-dark
  font-size .8em
._address
  color $gray-dark
  font-weight 500
  font-size .9em
  width 100%

</style>
