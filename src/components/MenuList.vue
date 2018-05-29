<template>
<div class="menu-list">
  <div class="_list">
    <menu-list-item
      v-for="(item, key) in state.user.menuList"
      :item="item"
      :key="key"
      class="_menu-list-item"
    />
  </div>
  <div class="_add">
    <menu-list-add class="_menu-list-item" />
  </div>
</div>
</template>

<script>
import MenuListItem from './MenuListItem'
import MenuListAdd from './MenuListAdd'

export default {
  components: { MenuListItem, MenuListAdd },
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
    overflow hidden
    width 100%
  ._add
    overflow hidden
    width 100%
    height 100%
    flex 1

</style>
