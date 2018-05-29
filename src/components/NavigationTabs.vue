<template>
<div class="navigation-tabs">

  <q-tabs color="bg-light" text-color="gray-dark">
    <q-route-tab
      to="/keypad"
      icon="ion-calculator"
      default
      slot="title"
    />
    <q-route-tab
      to="/menulist"
      icon="ion-list"
      slot="title"
    />
  </q-tabs>
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

// .navigation-tabs

</style>