<template>
<div class="app-menu">
  <div class="_wrapper">
    <div
      v-for="(row, index) in menuItems"
      :key="'menu-' + index"
    >
      <div v-if="row.line" class="_line _row"></div>
      <div v-else class="_link _row">
        <router-link
          v-if="row.url && !row.func"
          :to="row.url"
          @click.native="set('modals/toggleMenu', false)"
        >
          {{ row.name }}
        </router-link>
        <a
          v-if="row.href"
          :href="row.href"
        >
          {{ row.name }}
        </a>
        <button
          v-if="!row.url && row.func"
          @click="row.func()"
        >
          {{ row.name }}
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () {
    return {}
  },
  computed:
  {
    menuItems () {
      const items = [
        {
          name: 'About Dappos',
          href: 'https://dappos.app'
        },
        {
          name: '',
          url: '',
          line: true
        },
        // {
        //   name: 'Dappos Home',
        //   url: '/'
        // },
        {
          name: 'History',
          func: _ => { return this.dispatch('modals/toggle', 'history') },
          hide: this.get('user/isSignedOut')
        },
        {
          name: 'Edit items',
          func: _ => { return this.dispatch('modals/toggle', 'menulist.editAll') },
          hide: this.get('user/isSignedOut')
        },
        {
          name: this.get('user/isSignedIn') ? 'Account settings' : 'Currency',
          func: _ => { return this.dispatch('modals/toggle', 'settings') },
          hide: this.get('user/isSignedOut')
        },
        {
          name: 'Signout',
          func: _ => { return this.dispatch('user/signOut') },
          hide: this.get('user/isSignedOut')
        },
        // {
        //   name: 'Signup',
        //   url: '/signup',
        //   hide: this.get('user/isSignedIn')
        // },
        {
          name: 'Signin',
          url: '/signin',
          hide: this.get('user/isSignedIn')
        },
        {
          name: '',
          url: '',
          line: true
        },
        {
          name: 'Feedback',
          href: 'mailto:hello@dappos.app'
        },
      ]
      return items.filter(i => !i.hide)
    },
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.app-menu
  pt xxl
._wrapper
  pa xl
._row
  my 1.8em
._link
  > *
    color $gray-dark
    width 100%
    text-align left
  a
    reset-a()
  button
    reset-button()
    cursor pointer
._line
  height 1px
  width 100%
  background-color $gray-light

</style>
