<template>
<div class="no-address-found">
  <div class="_wrapper-top">
    <div class="_title">No wallet found!</div>
    <div>
      There was no wallet detected. Possible reasons:
      <ul>
        <li>Your browser does not support a wallet.</li>
        <li>Your browser's wallet is locked. (eg. MetaMask)</li>
      </ul>
      Please try again.
    </div>
  </div>
  <div class="_wrapper-bottom">
    <button @click="dispatch('modals/toggle', 'wallet.noAddressFound')" class="_close">Close</button>
  </div>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return { overwritten: false } },
  computed:
  {
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.no-address-found
  font-size 1em
._wrapper-top, ._wrapper-bottom
  pa lg
._wrapper-top
  display flex
  flex-direction column
  align-items center
  text-align center
  width 100%
._wrapper-top
  border-bottom 1px solid $gray-light
._title
  font-weight 600
  mb lg
._wrapper-bottom
  display flex
  justify-content flex-end
._close
  reset-button()
  color $primary

</style>
