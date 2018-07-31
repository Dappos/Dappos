<template>
  <q-layout
    view="lhh Lpr lff"
    :class="`_layout js-page-offset page--${state.route.name}`"
    :style="{height: state.windowSize.height + 'px'}"
  >
    <q-layout-header :class="['_header', {'_elevate': elevateHeader}]">
      <q-toolbar
        :inverted="true"
        color="primary"
        class="_toolbar"
      >
        <button
          @click="dispatch('modals/toggleMenu')"
          flat dense
          aria-label="Menu"
          class="reset-button _menu-btn"
        >
          <img src="~assets/dappos-icon.svg" class="_logo" alt="menu">
          <div class="q-ml-sm">
            <q-icon
              :class="['_arrow', {rotated: state.modals.menu.opened}]"
              name="ion-arrow-down"
            />
          </div>
        </button>
        <info-cart v-if="!elevateHeader" />
        <info-wallet v-if="elevateHeader" />
      </q-toolbar>
    </q-layout-header>

    <q-page-container class="_page-wrapper">
      <router-view class="_page-wrapper" />
    </q-page-container>
  </q-layout>
</template>

<script>
import storeAccess from '@components/mixins/storeAccess'

export default {
  name: 'LayoutDefault',
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () {
    return {}
  },
  methods:
  {
  },
  computed:
  {
    elevateHeader () {
      return (!this.get('modals/cart.cart.opened') &&
        (this.get('modals/menu.opened') || this.get('modals/menu.animating')))
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

._layout
  background-color $bg-light
  margin 0 auto
  layout-app-size()
._page-wrapper
  height 100%
._header
  border none
._toolbar
  px xl
  mt sm
  mb xs
  background-color transparent
  border-bottom none
  justify-content space-between

._menu-btn
  display flex
  align-items center
  ._logo
    width 1.4em
._elevate
  z-index 5900
._arrow
  transition all .4s linear
  color $gray-medium
.rotated
  transform rotate(180deg)

// .page--signin
//   background url('~assets/auth-background.jpg') no-repeat center center fixed
//   background-size cover

</style>
