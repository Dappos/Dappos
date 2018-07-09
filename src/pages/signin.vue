<template>
<q-page class="page-signin">
  <firebase-ui />
</q-page>
</template>

<script>
import storeAccess from '../components/mixins/storeAccess'

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

<style lang="stylus">
@import '~styl/variables'

.page-signin
  pt 8rem

</style>
