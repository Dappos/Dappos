<template>
<options-reveal
  :options="[{
    name: 'Delete',
    action () { return dispatch('cart/deleteItem', item) },
    style: 'background-color: red;',
  }]"
>
  <row-wrapper>
    <div class="_wrapper">
      <div class="_count">x{{ item.count }}</div>
      <div class="_name">{{ item.name }}</div>
      <div class="_price">{{ price | money(get('settings/currencyConfig')) }}</div>
      <div class="_nav" v-if="state.modals.cart.payment.stage === 1">
        <q-btn icon="more_vert" @click="dispatch('modals/cartMore', item)" class="_more" />
      </div>
    </div>
  </row-wrapper>
</options-reveal>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

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
      if (this.item.price || this.item.price === 0) return this.item.price
      const currentPrice = (this.item.prices && this.item.prices[this.get('settings/currency')])
      return (!currentPrice)
        ? 0
        : currentPrice
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
  font-size 1em
  display grid
  grid-template-areas "count name nav" \
                      "count price nav"
  grid-template-columns auto 1fr auto
  grid-gap .2em 1em
  align-items center
._count
  grid-area count
  background-color $gray-light
  py .4em
  px .5em
  border-radius $radius
  color white
  font-weight 600
  font-size .875em
._name
  grid-area name
  font-weight 500
._price
  grid-area price
  color $gray-light
  font-size .75em
._nav
  grid-area nav
._more
  font-size 1em
  color $gray-light
  // ml md

</style>
