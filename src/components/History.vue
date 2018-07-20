<template>
<div class="history">
  <div class="_wrapper">
    <history-receit-row
      v-for="receit in Object.values(state.history.receits)"
      :receit="receit"
      :key="receit.id"
    />
  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'
import HistoryReceitRow from './HistoryReceitRow'
export default {
  components: { HistoryReceitRow },
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

// .history

</style>
