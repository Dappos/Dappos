<template>
<div class="cart-item">
  <div class="_wrapper">
    <!-- <div class="_count">{{ item.count }}x</div> -->
    <div class="_name">
      <q-icon v-if="!item.icon" name="ion-list" class="mr-md"/>
      <span v-else class="mr-sm">{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </div>
    <div class="_price">
      {{ price | money(get('settings/currencyConfig')) }}
    </div>
    <div class="_nav">
      <q-btn
        @click="dispatch('modals/toggleMenu', item.id)"
        icon="ion-md-more"
        class="_more"
      />
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '../mixins/storeAccess'

export default {
  components: {},
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    price () {
      return this.item.prices[this.state.settings.currency]
    },
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.cart-item
  px lg
  background-color white

._wrapper
  py sm
  font-size 1.2em
  display grid
  grid-template-areas "count name nav" \
                      "count price nav"
  grid-template-columns auto 1fr auto
  grid-gap .2em 1em
  align-items center
  border-bottom 1px solid $bg-light
._count
  grid-area count
  background-color $gray-light
  py .2em
  px .33em
  border-radius $radius
  color white
  font-weight 500
._name
  grid-area name
._price
  grid-area price
  color $gray-light
  font-size .8em
  pl xl
._nav
  grid-area nav
._more
  font-size 1em
  color $gray-light
  // ml md

</style>
