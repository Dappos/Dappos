<template>
<button class="menu-list-add" @click="state.user.menulist.adding.state = true">
  <q-icon class="_plus" name="ion-add" />
  <div class="_text">Add item</div>
</button>
</template>

<script>
export default {
  components: {},
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
