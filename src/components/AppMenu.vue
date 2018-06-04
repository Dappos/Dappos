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
          @click.native="dispatch('toggleMenu')"
        >
          {{ row.name }}
        </router-link>
        <button
          v-if="!row.url && row.func"
          @click="row.func(), dispatch('toggleMenu')"
        >
          {{ row.name }}
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: [],
  data () {
    return {}
  },
  computed:
  {
    get () { return this.$store.getters },
    state () { return this.$store.state },
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
          name: 'Currency',
          url: '/currency'
        },
        {
          name: 'History',
          url: '/history',
          hide: !this.get['user/isLoggedIn']
        },
        {
          name: 'Edit items',
          url: null,
          func: _ => { return this.dispatch('user/menulist/toggleEditAll', true) },
          hide: !this.get['user/isLoggedIn']
        },
        {
          name: 'Account settings',
          url: '/settings',
          hide: !this.get['user/isLoggedIn']
        },
        {
          name: 'Signup',
          url: '/signup',
          hide: this.get['user/isLoggedIn']
        },
        {
          name: 'Login',
          url: '/login',
          hide: this.get['user/isLoggedIn']
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
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

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
