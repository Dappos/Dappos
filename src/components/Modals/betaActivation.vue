<template>
<div class="component-name">
  <div class="_wrapper">
    <div>Dappos is currently in private Beta.</div>
    <div class="mt-lg">Please sign up at <a href="https://dappos.app">dappos.app</a> and wait for your invitation.</div>
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

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

// .component-name
._wrapper
  pa xl
  font-size 1.3em

</style>
