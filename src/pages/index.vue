<template>
<q-page class="page-index" :style-fn="fixLayoutCSS">
  <div class="_info-total-wrapper"><info-total /></div>
  <div class="_navigation-tabs-wrapper"><navigation-tabs /></div>
  <div class="_bottom-part-wrapper">
    <keypad v-if="state.navigationTab === 'keypad'" class="_bottom-part" />
    <menu-list v-if="state.navigationTab === 'menulist'" class="_bottom-part" />
  </div>
</q-page>
</template>

<script>
import storeAccess from '@components/mixins/storeAccess'

export default {
  name: 'index',
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  computed:
  {
  },
  methods:
  {
    fixLayoutCSS (offset) {
      return ``
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.page-index
  display flex
  flex-direction column
  pa sm
._info-total-wrapper
  px sm
._navigation-tabs-wrapper
  pt sm
._bottom-part-wrapper
  flex 1
  display flex
._bottom-part
  flex 1

</style>
