<template>
  <q-layout
    view="lhh Lpr lff"
    :class="`_layout js-page-offset page--${state.route.name}`"
  >
    <q-layout-header :class="['_header', {'_elevate': elevateHeader}]">
      <q-toolbar
        :inverted="true"
        color="primary"
        class="_toolbar"
      >
        <button
          @click="dispatch('toggleMenu')"
          flat dense
          aria-label="Menu"
          class="reset-button _menu-btn"
        >
          <img src="~assets/dappos-icon.svg" class="_img" alt="menu">
          <div class="q-ml-sm">
            <q-icon
              :class="['_arrow', {rotated: get('menu.opened')}]"
              name="ion-arrow-down"
            />
          </div>
        </button>
        <info-cart />
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view class="_page-wrapper" />
    </q-page-container>
  </q-layout>
</template>

<script>
import storeAccess from '../components/mixins/storeAccess'

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
      return (!this.get('cart/opened.state') &&
        (this.get('menu.opened') || this.get('menu.animating')))
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

._layout
  background-color $bg-light
  margin 0 auto
  max-width 600px
  media-sm max-width 464px
  min-height auto !important
._page-wrapper
  @media screen and (min-height: 750px)
    media-sm min-height auto !important
    media-sm height 700px !important
._header
  border none
._toolbar
  px xl
  mt md
  mb sm
  background-color transparent
  border-bottom none
  justify-content space-between

._menu-btn
  display flex
  align-items center
  ._img
    width 2em
._elevate
  z-index 5900
._arrow
  transition all .4s linear
.rotated
  transform rotate(180deg)

.page--signin
  background url('~assets/auth-background.jpg') no-repeat center center fixed
  background-size cover

</style>
