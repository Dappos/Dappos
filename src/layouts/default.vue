<template>
  <q-layout view="lhh Lpr lff" class="_layout js-page-offset">
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
          :class="['reset-button']"
        >
          <div class="_menu-btn">
            <div><img src="~assets/dappos-icon.png" alt="menu"></div>
              <div class="q-ml-sm">
              <q-icon
                :class="['_arrow', {rotated: state.menu.opened}]"
                name="ion-arrow-down"
              />
            </div>
          </div>
        </button>
        <info-cart />
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <modals />
      <q-window-resize-observable @resize="onResize" />
      <router-view class="_page-wrapper" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return { appHeight: `calc(100vh - 50px)` }
  },
  mounted () {},
  methods:
  {
    get (path) { return this.$store.get(path) },
    set (path, val) { return this.$store.set(path, val) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
    onResize (size) {
      this.state.windowSize = size
    },
  },
  computed:
  {
    state () { return this.$store.state },
    style () {
      return `height: ${this.appHeight}; min-height: auto !important`
    },
    elevateHeader () {
      return (!this.state.cart.opened.state &&
        (this.state.menu.opened || this.state.menu.animating))
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

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
  background-color transparent
  border-bottom none
  justify-content space-between

._menu-btn
  display flex
  align-items center
  img
    width 2em
    height auto
._elevate
  z-index 5900
._arrow
  transition all .4s linear
.rotated
  transform rotate(180deg)

</style>
