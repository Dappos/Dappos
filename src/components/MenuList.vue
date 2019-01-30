<template>
<div class="menu-list" v-allow-touchscroll>
  <div class="_list">
      <item-row
        v-for="(item, key) in get('user/menulist/items')"
        :key="key"
        :item="item"
        class="_menu-list-row"
      />
  </div>
  <div class="_add">
    <add-btn class="_menu-list-row" />
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'
import ItemRow from './MenuList_ItemRow'
import AddBtn from './MenuList_AddBtn'

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

.menu-list
  width 100%
  height 100%
  background-color white
  border-radius $radius
  line-height 3
  overflow-y scroll
  -webkit-overflow-scrolling touch
  ._list
    width 100%
  ._add
    width 100%
    height 100%
    > *
      border-bottom 1px solid $bg-light

</style>
