<template>
<div class="modals">
  <!-- APP MENU -->
  <q-modal
    v-model="state.menu.opened"
    @hide="set('menu.animating', false)"
    @show="set('menu.animating', false)"
    position="top"
    maximized
    :class="['app-menu-modal', {
      '--opened': get('menu.opened'),
      '--closed': !get('menu.opened'),
      'app-minimised': get('appMinimised')
    }]"
  >
    <app-menu />
  </q-modal>

  <!-- CART -->
  <modal-fullscreen
    :toggle="get('cart/opened')"
    title="Cart"
  ><cart /></modal-fullscreen>
  <!-- [CART] EDIT ITEM -->
  <q-modal
    v-model="state.cart.editing.state"
    position="bottom"
    :class="{'app-minimised': get('appMinimised')}"
    @hide="deleteIf0"
  >
    <cart-editing-item
      v-if="get('cart/editing.state')"
      :item="get('cart/editing.item')"
    />
  </q-modal>

  <!-- [MENU LIST] ADDING ITEM -->
  <modal-fullscreen
    :toggle="get('user/menulist/adding')"
    title="Add item"
    :hideFunc="_ => { commit('user/menulist/resetNewItem') }"
  >
    <menu-list-add-edit-item :item="get('user/menulist/adding.item')"/>
  </modal-fullscreen>
  <!-- [MENU LIST] EDITING ITEM -->
  <modal-fullscreen
    :toggle="get('user/menulist/editing')"
    title="Edit item"
  >
    <menu-list-add-edit-item
      v-if="get('user/menulist/editing.state')"
      :item="get('user/menulist/editing.item')"
    />
  </modal-fullscreen>
  <!-- [MENU LIST] EDIT ALL -->
  <modal-fullscreen
    :toggle="get('user/menulist/editAll')"
    title="Edit items"
  >
    <menu-list-edit-all
      v-if="get('user/menulist/editAll.state')"
    />
  </modal-fullscreen>

  <!-- [HISTORY] -->
  <modal-fullscreen
    :toggle="get('history/modal')"
    title="History"
  >
    <history />
  </modal-fullscreen>

  <!-- [SETTINGS] -->
  <modal-fullscreen
    :toggle="get('settings/modal')"
    :title="get('user/isSignedIn') ? 'Settings' : 'Currency'"
  >
    <settings />
  </modal-fullscreen>

  <!-- PAYMENT -->
  <modal-minimised
    :toggle="get('cart/payment')"
    :showFunc="_ => { showPaymentModal() }"
    :hideFunc="_ => { hidePaymentModal() }"
  >
    <payment />
  </modal-minimised>

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
  },
  methods:
  {
    deleteIf0 () {
      const item = this.get('cart/editing.item')
      if (!item.count) this.commit('cart/deleteItem', item)
    },
    showPaymentModal () {
      this.dispatch('ethEvents/subscribeAccount')
      this.dispatch('cart/generateQr')
    },
    hidePaymentModal () {
      this.dispatch('ethEvents/unsubscribeAccount')
      this.commit('cart/resetQR')
    }
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

.app-menu-modal.q-modal-top-enter, .app-menu-modal.q-modal-top-leave-active
  opacity 1
  .modal-content
    transform translateY(-100%)

.app-menu-modal.modal.--closed
  background rgba(0,0,0,0) !important
.app-menu-modal.modal.--opened
  background rgba(0,0,0,0.3) !important

.app-menu-modal.modal
  z-index 5800
  transition all .3s ease-in-out, background .4s linear
.app-menu-modal .modal-content
  transition all .3s ease-in-out

.app-minimised
  height 750px !important
  width 464px !important

</style>
