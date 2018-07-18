<template>
<row-wrapper>
  <div class="_wrapper">
    <div class="_count">{{ item.count }}x</div>
    <div class="_name">{{ item.name }}</div>
    <div class="_price">{{ price | money(get('settings/currencyConfig')) }}</div>
    <div class="_nav">
      <q-btn icon="ion-md-more" @click="dispatch('modals/cartMore', item)" class="_more" />
    </div>
  </div>
</row-wrapper>
</template>

<script>
import storeAccess from './mixins/storeAccess'

export default {
  components: {},
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    price () {
      // cart items have a 'price' field assigned when they get added to the cart
      if (this.item.price) return this.item.price
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

._wrapper
  font-size 1.2em
  display grid
  grid-template-areas "count name nav" \
                      "count price nav"
  grid-template-columns auto 1fr auto
  grid-gap .2em 1em
  align-items center
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
  font-weight 500
._price
  grid-area price
  color $gray-light
  font-size .8em
._nav
  grid-area nav
._more
  font-size 1em
  color $gray-light
  // ml md

</style>
