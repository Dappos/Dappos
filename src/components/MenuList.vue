<template>
<div class="menu-list">
  <div class="_list">
    <!-- <options-reveal
      v-for="(item, key) in state.user.menulist.items"
      :key="key"
      :options="[{
        name: 'Delete',
        action () { return dispatch('user/menulist/deleteItem', key) },
        style: 'background-color: red;',
      }]"
    > -->
      <item-row
        v-for="(item, key) in state.user.menulist.items"
        :key="key"
        :item="item"
        class="_menu-list-row"
      />
    <!-- </options-reveal> -->
  </div>
  <div class="_add">
    <add-btn class="_menu-list-row" />
  </div>
</div>
</template>

<script>
import ItemRow from './MenuList_ItemRow'
import AddBtn from './MenuList_AddBtn'

export default {
  components: { ItemRow, AddBtn },
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

.menu-list
  width 100%
  height 100%
  display flex
  flex-direction column
  background-color white
  border-radius $radius
  line-height 3
  ._list
    width 100%
    > *:first-child
      border-radius $radius
  ._add
    width 100%
    height 100%
    flex 1
    > *
      border-bottom 1px solid $bg-light

</style>
