<template>
<div class="menu-list-add-edit-item">
  <q-input
    float-label="Item name"
    v-model.trim="item.name"
    type="text"
    autofocus
  />
  <q-input
    float-label="Price"
    v-model="item.prices[state.settings.currency.currency]"
    type="number"
    :prefix="get('settings/currency/config').prefix"
    :decimals="get('settings/currency/config').precision"
    numeric-keyboard-toggle
  />
  <button @click="addItem" class="o-btn _save">Save</button>
  <button
    v-if="state.user.menulist.editing.state"
    @click="deleteItem" class="o-btn _delete"
  >Delete</button>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'

export default {
  components: {},
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
  },
  methods:
  {
    addItem () {
      if (!this.item.prices[this.state.settings.currency.currency]) return
      this.dispatch('user/menulist/addItem')
    },
    deleteItem () {
      this.dispatch('user/menulist/deleteItem', this.item.id)
      this.state.user.menulist.editing.state = false
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/themes/common.variables'

.menu-list-add-edit-item
  px lg
  > *
    mt lg
._save
  mt xl
._save, ._delete
  width 100%
._delete
  background-color $negative

</style>
