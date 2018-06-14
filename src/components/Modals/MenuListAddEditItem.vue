<template>
<div class="menu-list-add-edit-item">
  <form @submit.prevent="save">
    <div class="_row flex"
    >
      <button @click.prevent="togglePicker" v-if="!item.icon" class="_icon-btn">
        <q-icon name="ion-list" />
      </button>
      <button @click.prevent="togglePicker" v-else class="_icon-btn">
        <span>{{ item.icon }}</span>
      </button>
      <q-input
        float-label="Item name"
        v-model="item.name"
        type="text"
        autofocus
        required
        class="_name"
      />
    </div>
    <div v-show="pickerOpened" class="_emoji-picker _row animate-scale">
      <picker
        @select="addEmoji"
        :include="['foods']"
        :perLine="10"
        :emojiTooltip="true"
        :showPreview="false"
        :showSearch="false"
        :showCategories="false"
        :showSkinTones="false"
      />
    </div>
    <q-input
      float-label="Price"
      v-model="item.prices[state.settings.currency.currency]"
      type="number"
      :prefix="get('settings/currency/config').prefix"
      :decimals="get('settings/currency/config').precision"
      numeric-keyboard-toggle
      required
      class="_row"
    />
    <button type="submit" class="o-btn _save _row">Save</button>
    <button
      v-if="!item.new"
      @click="deleteItem" class="o-btn _delete _row"
    >Delete</button>
  </form>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'
import { Picker } from 'emoji-mart-vue'

export default {
  components: { Picker },
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return { pickerOpened: false } },
  computed:
  {
  },
  methods:
  {
    save () {
      if (!this.item.prices[this.state.settings.currency.currency]) return
      if (this.item.new) return this.dispatch('user/menulist/addItem')
      return this.dispatch('user/menulist/doneEdit', this.item.id)
    },
    deleteItem () {
      this.dispatch('user/menulist/deleteItem', this.item.id)
      this.state.user.menulist.editing.state = false
    },
    addEmoji (emoji) {
      // console.log('emoji → ', emoji)
      this.item.icon = emoji.native
      this.pickerOpened = false
    },
    togglePicker () {
      this.pickerOpened = !this.pickerOpened
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/themes/common.variables'

.menu-list-add-edit-item
  px lg
._row
  mt lg
  width 100%
._icon-btn
  reset-button()
  display flex
  mr md
  ml xs
._name
  flex 1
._emoji-picker
  display flex
  justify-content center
._save
  mt xl
._save, ._delete
  width 100%
._delete
  background-color $negative

</style>
