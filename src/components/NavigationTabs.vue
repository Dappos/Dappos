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

// .navigation-tabs

</style>