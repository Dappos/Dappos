<template>
<button class="menu-list-add" @click="dispatch('modals/toggle', 'menulist.adding')">
  <q-icon class="_plus" name="fas fa-plus" />
  <div class="_text">Add item</div>
</button>
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.menu-list-add
  reset-button()
  width 100%
  display flex
  justify-content center
  align-items center
  font-size 1em
  color $primary
  font-weight 600

._plus
  mr sm
  pb xxs
  font-size .7em

</style>
