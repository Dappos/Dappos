<template>
<div class="menu-list-edit-all">
  <options-reveal
    v-for="(item, key) in get('user/menulist/items')"
    :key="key"
    :options="[{
      name: 'Delete',
      action () { return dispatch('user/menulist/delete', key) },
      style: 'background-color: red;',
    }]"
  >
    <item-row
      :item="item"
      class="_item-row"
    />
  </options-reveal>
  <row-wrapper class="_add">
    <add-btn class="_menu-list-row" />
  </row-wrapper>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'
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
@import '~styl/variables'

// .menu-list-edit-all
._menu-list-row
  py md

</style>
