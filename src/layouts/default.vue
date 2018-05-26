<template>
  <q-layout view="lhh Lpr lff">
    <q-layout-header>
      <q-toolbar
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
        color="primary"
        class="_toolbar"
      >
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          flat dense
          aria-label="Menu"
        >
          <div class="_menu-btn">
            <div><img src="~assets/dappos-icon.png" alt="menu"></div>
            <div class="q-ml-sm"><q-icon name="ion-arrow-down" /></div>
          </div>
        </q-btn>
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
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

._toolbar
  justify-content space-between

._menu-btn
  display flex
  align-items center
  img
    width 2em
    height auto
</style>
