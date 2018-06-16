<template>
<div class="menu-list-edit-all">
  <options-reveal
    v-for="(item, key) in get('user/menulist/items')"
    :key="key"
    :options="[{
      name: 'Delete',
      action () { return dispatch('user/menulist/deleteItem', key) },
      style: 'background-color: red;',
    }]"
  >
    <item-row
      :item="item"
      class="_item-row"
    />
  </options-reveal>
  <div class="_add">
    <add-btn class="_menu-list-row" />
  </div>

</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'
import ItemRow from './MenuListEditAll_ItemRow'
import AddBtn from '../MenuList_AddBtn'

export default {
  components: { ItemRow, AddBtn },
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/themes/common.variables'

// .menu-list-edit-all
._add
  px lg
  > *
    py md
    border-bottom 1px solid $bg-light

</style>
