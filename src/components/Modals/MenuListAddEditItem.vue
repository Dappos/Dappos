<template>
<div :class="['menu-list-add-edit-item', {editing: !item.new, adding: item.new}]">
  <form @submit.prevent="save">
    <div class="_row flex">
      <!-- <button @click.prevent="togglePicker" v-if="!item.icon" class="_icon-btn">
        <q-icon name="ion-list" />
      </button> -->
      <button @click.prevent="togglePicker" v-if="item.icon" class="_icon-btn">
        <span>{{ item.icon }}</span>
      </button>
      <q-input
        float-label="Item name"
        :value="item.name"
        @input="checkIcon"
        @keydown.enter-strict.prevent="focusPrice"
        type="text"
        autofocus
        required
        class="_name js-name"
      />
    </div>
    <div v-show="pickerOpened" class="_emoji-picker _row animate-scale">
      <button @click.prevent="removeEmoji" class="o-txt-btn _remove-icon">Remove icon</button>
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
      v-model="item.prices[state.settings.currency]"
      type="number"
      :prefix="get('settings/currencyConfig').prefix"
      :decimals="get('settings/currencyConfig').precision"
      numeric-keyboard-toggle
      required
      class="_row _price js-price"
    />
    <button type="submit" class="o-btn _save _row">Save</button>
    <button
      v-if="!item.new"
      @click.prevent="deleteItem" class="o-btn _delete _row"
    >Delete</button>
  </form>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'
import { Picker } from 'emoji-mart-vue'
import { findEmoji, indexOfEmoji } from '@helpers/emojiUtils'

export default {
  components: { Picker },
  props: ['item'], // this item is a copy when editing.
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return { pickerOpened: false } },
  computed:
  {
  },
  watch: {
    // whenever question changes, this function will run
    // item: {
    //   handler (val) {
    //     if (val.icon) {
    //       this.item.name = val.name.replace(new RegExp('^' + val.icon, 'g'), '')
    //     }
    //   },
    //   deep: true
    // }
  },
  methods:
  {
    checkIcon (nameInput) {
      this.item.name = nameInput
      if (this.item.icon) {
        return
      }
      const emoji = findEmoji(nameInput)[0]
      if (indexOfEmoji(nameInput, emoji) === 0) {
        this.$nextTick(_ => {
          this.item.icon = emoji
          this.item.name = this.item.name.replace(new RegExp('^' + emoji, 'g'), '')
        })
        return
      }
      this.item.icon = null
    },
    changeName (newVal) {
      // if (this.item.new) return this.set('user/menulist/adding.item.name', newVal)
      return this.dispatch('user/menulist/set', {name: newVal, id: this.item.id})
    },
    changePrice (newVal) {
      // const curr = this.state.settings.currency
      // if (this.item.new) return this.set(`user/menulist/adding.item.prices.${curr}`, newVal)
      return this.dispatch('user/menulist/setPrice', {id: this.item.id, val: newVal})
    },
    save () {
      if (!this.item.prices[this.state.settings.currency]) return
      if (this.item.new) return this.dispatch('user/menulist/addItem')
      // in the case of editing
      this.changeName(this.item.name)
      this.changePrice(this.item.prices[this.state.settings.currency])
      this.dispatch('user/menulist/set', {icon: this.item.icon, id: this.item.id})
      this.set('user/menulist/editing.state', false)
    },
    deleteItem () {
      this.dispatch('user/menulist/delete', this.item.id)
      this.set('user/menulist/editing.state', false)
    },
    addEmoji (emoji) {
      // console.log('emoji → ', emoji)
      this.item.icon = emoji.native
      this.pickerOpened = false
      this.focusPrice()
    },
    removeEmoji () {
      this.item.icon = null
      this.pickerOpened = false
      this.focusName()
    },
    togglePicker () {
      this.pickerOpened = !this.pickerOpened
    },
    focusName () {
      const selector = (this.item.new) ? 'adding' : 'editing'
      document.querySelector(`.menu-list-add-edit-item.${selector} .js-name input`).focus()
    },
    focusPrice () {
      const selector = (this.item.new) ? 'adding' : 'editing'
      document.querySelector(`.menu-list-add-edit-item.${selector} .js-price input`).focus()
    },
  },
  beforeDestroy () {
    this.pickerOpened = false
  }
}
</script>
<style lang="stylus" scoped>
@import '~styl/variables'

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
  flex-direction column
  align-items center
  justify-content center
  ._remove-icon
    mb sm
._save
  mt xl
._save, ._delete
  width 100%
._delete
  background-color $negative

</style>
