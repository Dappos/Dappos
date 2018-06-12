<template>
<button class="menu-list-add" @click="state.user.menulist.adding.state = true">
  <q-icon class="_plus" name="ion-add" />
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
@import '../css/themes/common.variables'

.menu-list-add
  reset-button()
  width 100%
  display flex
  justify-content center
  align-items center
  font-size 1.3em
  color $primary

._plus
  mr sm
  pb xxs
  font-size 1.2em

</style>
