<template>
<button class="menu-list-item" @click="dispatch('cart/addItem', item), flyToCart()">
  <div class="_wrapper">
    <div class="_name">{{ item.name }}</div>
    <div class="_price">{{ price | money(get('settings/currency/config')) }}</div>
  </div>
  <div
    class="_fly-icon js-fly-target hidden"
  >👍</div>
</button>
</template>

<script>
import storeAccess from './mixins/storeAccess'
import { uid } from 'quasar'

export default {
  components: {},
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {anime: null, id: uid()} },
  computed:
  {
    price () {
      return (!this.item.price)
        ? this.item.prices[this.state.settings.currency.currency]
        : this.item.price
    },
  },
  methods:
  {
    flyToCart () {
      const el = this.$el.children[1]
      const elCart = document.querySelector('.js-info-cart')
      this.dispatch('animate/fly', {
        el: el,
        id: this.id,
        target: elCart,
        hidden: true
      }).then(_ => {
        this.dispatch('animate/pop', {el: elCart})
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

.menu-list-item
  position relative
  pa 0
  ma 0
  background none
  background-color white
  border none
  outline none
  width 100%
  border-bottom 1px solid $bg-light
  &:active
    box-shadow inset 2px 2px $bg-light
    padding-top 2px
    padding-left 2px
    margin-bottom -2px
    margin-right -2px
    z-index 1
._wrapper
  display flex
  justify-content space-between
  align-items baseline
  px xl
._name
  font-size 1.3em
._price
  font-size 1.2em
._fly-icon
  position absolute
  top 0
  left 10%
  z-index 100000

</style>
