<template>
<div class="menu-list-add">
  <q-icon class="_plus" name="ion-add" />
  <div class="_text">Add item</div>
</div>
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
  display flex
  justify-content center
  align-items center
  font-size 1.3em
  color $primary
  border-bottom 1px solid $bg-light
._plus
  mr sm
  pb xxs
  font-size 1.2em

</style>
