<template>
<div class="navigation-tabs">
  <q-tabs color="bg-light" text-color="gray-dark">
    <q-route-tab
      to="/keypad"
      icon="ion-calculator"
      default
      slot="title"
      class="_tab"
    />
    <q-route-tab
      to="/menulist"
      icon="ion-list"
      slot="title"
      class="_tab"
    />
  </q-tabs>
</div>
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

// .navigation-tabs
._tab
  font-size 3em

</style>
