<template>
<div class="navigation-tabs">
  <q-tabs color="black" inverted>
    <q-tab
      icon="ion-keypad"
      default
      slot="title"
      text-color="black"
    />
    <q-tab
      icon="ion-list"
      slot="title"
      text-color="black"
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