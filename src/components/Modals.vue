<template>
<div class="modals">
  <!-- APP MENU -->
  <q-modal
    v-model="state.menu.opened"
    @hide="state.menu.animating = false"
    @show="state.menu.animating = false"
    position="top" maximized
    :class="['app-menu-modal', {
      '_opened': state.menu.opened,
      '_closed': !state.menu.opened
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

  <!-- PAYMENT -->
  <modal-minimised
    :toggle="state.cart.payment"
    :show="_ => { return dispatch('cart/generateQr') }"
  >
    <payment />
  </modal-minimised>

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

// .modals

</style>
