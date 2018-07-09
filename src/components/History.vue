<template>
<div class="history">
  <div class="_wrapper">

  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'
const testHistory = {

}

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return testHistory },
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

// .history

</style>
