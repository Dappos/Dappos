<template>
<button class="menu-list-add" @click="clickBtn">
  <q-icon v-if="get('user/isSignedIn')" class="_plus" name="fas fa-plus" />
  <div class="_text">{{ this.text }}</div>
  <div v-if="!get('user/isSignedIn')" class="_explanation">
    Please sign in or create a free account to add items.
  </div>
</button>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    text () {
      return (this.get('user/isSignedIn'))
        ? 'Add item'
        : 'Sign in'
    }
  },
  methods:
  {
    clickBtn () {
      if (this.get('user/isSignedIn')) return this.dispatch('modals/toggle', 'menulist.adding')
      return this.$router.push('signin')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.menu-list-add
  reset-button()
  width 100%
  display flex
  justify-content center
  align-items center
  flex-wrap wrap
  font-size 1em
  color $primary
  font-weight 600
._plus
  mr sm
  pb xxs
  font-size .7em
._explanation
  font-size .8em
  color $gray-dark
  width 100%
  font-weight 500
  margin-top -1.5em

</style>
