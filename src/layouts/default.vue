<template>
  <q-layout view="lhh Lpr lff" class="_layout">
    <q-layout-header :class="['_header', {'_elevate': state.menu.opened || state.menu.animating}]">
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

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <layout-side-menu />
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  },
  computed:
  {
    get () { return this.$store.getters },
    state () { return this.$store.state },
  },
  methods:
  {
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

._layout
  background-color $bg-light
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
  z-index 10000
._arrow
  transition all .4s linear
.rotated
  transform rotate(180deg)

</style>
