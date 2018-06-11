<template>
<div class="modals">
  <!-- APP MENU -->
  <q-modal
    v-model="state.menu.opened"
    @hide="state.menu.animating = false"
    @show="state.menu.animating = false"
    position="top"
    maximized
    :class="['app-menu-modal', {
      '--opened': state.menu.opened,
      '--closed': !state.menu.opened,
      'app-minimised': get.appMinimised
    }]"
  >
    <app-menu />
  </q-modal>

  <!-- CART -->
  <modal-fullscreen
    :toggle="state.cart.opened"
    title="Cart"
  ><cart /></modal-fullscreen>
  <!-- [CART] EDIT ITEM -->
  <q-modal
    v-model="state.cart.editing.state"
    position="bottom"
    :class="{'app-minimised': get.appMinimised}"
    @hide="deleteIf0"
  >
    <cart-editing-item
      v-if="state.cart.editing.state"
      :item="state.cart.editing.item"
    />
  </q-modal>

  <!-- [MENU LIST] ADDING ITEM -->
  <modal-fullscreen
    :toggle="state.user.menulist.adding"
    title="Add item"
  >
    <menu-list-add-edit-item :item="state.user.menulist.adding.item"/>
  </modal-fullscreen>
  <!-- [MENU LIST] EDITING ITEM -->
  <modal-fullscreen
    :toggle="state.user.menulist.editing"
    title="Edit item"
  >
    <menu-list-add-edit-item
      v-if="state.user.menulist.editing.state"
      :item="state.user.menulist.editing.item"
    />
  </modal-fullscreen>
  <!-- [MENU LIST] EDIT ALL -->
  <modal-fullscreen
    :toggle="state.user.menulist.editAll"
    title="Edit items"
  >
    <menu-list-edit-all
      v-if="state.user.menulist.editAll.state"
    />
  </modal-fullscreen>

  <!-- [HISTORY] -->
  <modal-fullscreen
    :toggle="state.history.modal"
    title="History"
  >
    <history />
  </modal-fullscreen>

  <!-- [SETTINGS] -->
  <modal-fullscreen
    :toggle="state.settings.modal"
    :title="get('user/isSignedIn') ? 'Settings' : 'Currency'"
  >
    <settings />
  </modal-fullscreen>

  <!-- PAYMENT -->
  <modal-minimised
    :toggle="state.cart.payment"
    :showFunc="_ => { return dispatch('cart/generateQr') }"
    :hideFunc="_ => { return commit('cart/resetQR') }"
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
      const item = this.state.cart.editing.item
      if (!item.count) this.commit('cart/deleteItem', item)
    },
  }
}
</script>

<style lang="stylus">
@import '../css/themes/common.variables'

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
