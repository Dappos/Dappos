<template>
<q-page class="page-index">
  <div class="_info-total-wrapper"><info-total /></div>
  <div class="_navigation-tabs-wrapper"><navigation-tabs /></div>
  <div class="_router-view-wrapper">
    <router-view class="_router-view" />
  </div>
</q-page>
</template>

<style>
</style>

<script>
import storeAccess from '@components/mixins/storeAccess'
import { dom } from 'quasar'
const { css } = dom

export default {
  name: 'index',
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  mounted () {
    const h = window.innerHeight
    css(
      document.querySelector('main'),
      {
        'min-height': h - 74 + 'px',
        'max-height': h - 74 + 'px'
      }
    )
  },
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

.page-index
  display flex
  flex-direction column
  pa sm
._info-total-wrapper
  px sm
._navigation-tabs-wrapper
  pt sm
._router-view-wrapper
  flex 1
  display flex
._router-view
  flex 1

</style>
