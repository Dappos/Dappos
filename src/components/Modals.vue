<template>
<div class="modals">
  <!-- APP MENU -->
  <q-modal
    v-model="state.modals.menu.opened"
    @hide="set('modals/menu.animating', false)"
    @show="set('modals/menu.animating', false)"
    position="top"
    maximized
    :class="['app-menu-modal', {
      '--opened': state.modals.menu.opened,
      '--closed': !state.modals.menu.opened,
      'app-minimised': state.appMinimised
    }]"
  >
    <app-menu />
  </q-modal>

  <!-- CART -->
  <modal-fullscreen
    :toggle="state.modals.cart.cart"
    title="Cart"
  ><cart /></modal-fullscreen>
  <!-- [CART] EDIT ITEM -->
  <q-modal
    v-model="state.modals.cart.editing.opened"
    position="bottom"
    :class="{'app-minimised': get('appMinimised')}"
    @hide="deleteIf0"
  >
    <cart-editing-item
      v-if="state.modals.cart.editing.opened"
      :item="state.modals.cart.editing.item"
    />
  </q-modal>

  <!-- [MENU LIST] ADDING ITEM -->
  <modal-fullscreen
    :toggle="state.modals.menulist.adding"
    :hideFunc="_ => { dispatch('modals/menulist.resetNewItem') }"
    title="Add item"
  >
    <menu-list-add-edit-item :item="state.modals.menulist.adding.item"/>
  </modal-fullscreen>
  <!-- [MENU LIST] EDITING ITEM -->
  <modal-fullscreen
    :toggle="state.modals.menulist.editing"
    title="Edit item"
  >
    <menu-list-add-edit-item
      v-if="state.modals.menulist.editing.opened"
      :item="state.modals.menulist.editing.item"
    />
  </modal-fullscreen>
  <!-- [MENU LIST] EDIT ALL -->
  <modal-fullscreen
    :toggle="state.modals.menulist.editAll"
    title="Edit items"
  >
    <menu-list-edit-all
      v-if="state.modals.menulist.editAll.opened"
    />
  </modal-fullscreen>

  <!-- [HISTORY] -->
  <modal-fullscreen
    :toggle="state.modals.history"
    title="Transaction history"
  >
    <history />
  </modal-fullscreen>

  <!-- [SETTINGS] -->
  <modal-fullscreen
    :toggle="state.modals.settings"
    :title="get('user/isSignedIn') ? 'Settings' : 'Currency'"
  >
    <settings />
  </modal-fullscreen>

  <!-- PAYMENT -->
  <modal-minimised
    class="modal-payment"
    :toggle="state.modals.cart.payment"
    :noDismiss="(halfPaid || fullyPaidNoConf)"
    :showFunc="_ => { dispatch('modals/createPaymentRequest') }"
    :hideFunc="_ => { dispatch('modals/resetPaymentRequest') }"
  >
    <payment :halfPaid="halfPaid" :fullyPaidNoConf="fullyPaidNoConf" />
  </modal-minimised>

  <!-- UPDATE WALLET ADDRESS -->
  <modal-minimised
    :toggle="state.modals.wallet.overwriteAddress"
  >
    <overwrite-address />
  </modal-minimised>

  <!-- NO ADDRESS FOUND -->
  <modal-minimised
    :toggle="state.modals.wallet.noAddressFound"
  >
    <no-address-found />
  </modal-minimised>

  <!-- REALLY CLOSE MODAL? -->
  <modal-minimised
    :toggle="state.modals.cart.reallyClosePayment"
  >
    <really-close-payment v-if="state.modals.cart.reallyClosePayment.opened" />
  </modal-minimised>

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
    halfPaid () {
      return (Object.keys(this.state.ethEvents.transactions).filter(k => k !== '*').length > 0 &&
        this.state.modals.cart.payment.stage === 1)
    },
    fullyPaidNoConf () {
      return (this.get('ethEvents/watcherConfirmationCount') === 0 &&
        this.state.modals.cart.payment.stage === 2)
    },
  },
  methods:
  {
    deleteIf0 () {
      const item = this.get('modals/cart.editing.item')
      if (!item.count) this.dispatch('cart/deleteItem', item)
    },
  }
}
</script>

<style lang="stylus">
// Please note that the Modals.vue component is not and should not be scoped!
@import '~styl/variables'

.modal
  overflow hidden

.modal.maximized .modal-content
  width 100% !important
  height 100% !important
  max-width 100% !important
  max-height 100% !important
  border-radius 0 !important
  -webkit-overflow-scrolling touch

.app-menu-modal.q-modal-top-enter,
.app-menu-modal.q-modal-top-leave-active
  opacity 1
  .modal-content
    transform translateY(-100%)

.app-menu-modal.modal.--closed
  background rgba(0,0,0,0) !important
.app-menu-modal.modal.--opened
  background rgba(0,0,0,0) !important

.app-menu-modal.modal
  z-index 5800
  transition all .3s ease-in-out, background .4s linear
.app-menu-modal .modal-content
  transition all .3s ease-in-out

.app-minimised
  height 750px !important
  width 464px !important

// For layout app-size
.modal.minimized .modal-content
  max-width 80%
  max-height 80%
.fullscreen
  layout-app-size()
  top 0 !important
  left 0 !important
  margin auto

.modal-payment .modal-content
  background transparent !important

</style>
