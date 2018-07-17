<template>
<div class="overwrite-address">
  <div class="_wrapper-top">
    <div class="_title">Found new active wallet!</div>
    <div>
      <div>New wallet:</div>
      <div class="_address">{{ state.wallet.address }}</div>
      <div>Wallet saved in settings:</div>
      <div class="_address">
        <span v-show="overwritten" class="mr-sm">✅</span>
        {{ state.settings.wallet.address }}
      </div>
      <div>Do you want to update your settings and save the the new wallet?</div>
    </div>
  </div>
  <div class="_wrapper-bottom">
    <button @click="dispatch('modals/toggle', 'wallet.overwriteAddress')" class="_cancel">Cancel</button>
    <button @click="overwrite" class="_overwrite">Use new wallet</button>
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
    overwrite () {
      this.set('settings', {wallet: {address: this.state.wallet.address}})
      this.overwritten = true
      setTimeout(_ => {
        this.dispatch('modals/toggle', ['wallet.overwriteAddress', false])
      }, 800)
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.overwrite-address
  font-size 1.2em
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
._address
  px lg
  py md
  mb md
  background-color $bg-light
  word-break break-all
._wrapper-bottom
  display flex
  justify-content flex-end
._cancel, ._overwrite
  reset-button()
  color $primary
._overwrite
  ml lg

</style>
