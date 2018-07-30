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
import storeAccess from '@mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    addressStart () {
      const address = this.state.settings.wallet.address
      if (!address) return 'no wallet found...'
      return address.substring(0, 8)
    },
    addressEnd () {
      const address = this.state.settings.wallet.address
      if (!address) return ''
      return address.slice(-6)
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
  font-size .625em
._address
  color $gray-dark
  font-weight 600
  font-size .625em
  width 100%

</style>
