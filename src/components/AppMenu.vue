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
          @click.native="set('menu.opened', false)"
        >
          {{ row.name }}
        </router-link>
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
import storeAccess from './mixins/storeAccess'

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
          url: '/about'
        },
        {
          name: '',
          url: '',
          line: true
        },
        {
          name: 'Dappos Home',
          url: '/'
        },
        {
          name: 'History',
          func: _ => { return this.dispatch('history/toggleModal', true) },
        },
        {
          name: 'Edit items',
          func: _ => { return this.dispatch('user/menulist/toggleModal', true) },
          hide: this.get('user/isSignedOut')
        },
        {
          name: this.get('user/isSignedIn') ? 'Account settings' : 'Currency',
          func: _ => { return this.dispatch('settings/toggleModal', true) },
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
          url: '/feedback'
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
  my xl
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
