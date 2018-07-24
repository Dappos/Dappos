<template>
<div class="navigation-tabs">
  <q-tabs
    v-model="state.navigationTab"
    color="bg-light" text-color="gray-dark"
  >
    <q-tab
      name="keypad"
      icon="fas fa-calculator"
      default
      slot="title"
      class="_tab"
    />
    <q-tab
      name="menulist"
      icon="fas fa-list-ul"
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
  font-size 1.2em
  pb md

</style>
