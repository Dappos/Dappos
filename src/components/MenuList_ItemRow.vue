<template>
<button class="menu-list-item" @click="dispatch('cart/addItem', item), flyToCart()">
  <div class="_wrapper">
    <div class="_name">
      <q-icon v-if="!item.icon" name="fas fa-list-ul" class="_icon _generic"/>
      <span v-else class="_icon _emoji">{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </div>
    <div class="_price">{{ price | money(get('settings/currencyConfig')) }}</div>
  </div>
</button>
</template>

<script>
import storeAccess from '@mixins/storeAccess'
import { fly, pop } from '@helpers/animejsWrapper'
import { uid } from 'quasar'
const Chance = require('chance')
const chance = new Chance()

export default {
  components: {},
  props: ['item'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () {
    return {
      id: uid(),
      emojiInt: 0,
      standardEmojis: ['📦', '🎈', '⭐️', '👍', '🏀']
    }
  },
  computed:
  {
    price () {
      const currentPrice = (this.item.prices && this.item.prices[this.get('settings/currency')])
      return (!currentPrice)
        ? 0
        : currentPrice
    },
    randomEmoji () {
      return this.standardEmojis[this.emojiInt]
    },
  },
  methods:
  {
    flyToCart () {
      const elCart = document.querySelector('.js-info-cart')
      const el = this.$el.children[0].children[0].children[0]
      fly({
        el: el,
        target: elCart,
        clone: true,
        hideAfter: true,
        startOffsetX: 100,
        startOffsetY: -80,
        innerHTML: (!this.item.icon) ? '📦' : this.item.icon
      }).then(_ => {
        pop({el: elCart})
        this.scrambleInt()
      })
    },
    scrambleInt () {
      this.emojiInt = chance.integer({ min: -0, max: this.standardEmojis.length - 1 })
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.menu-list-item
  position relative
  pa 0
  ma 0
  background none
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
  px md
  pl lg
._name
  font-size 1em
  font-weight 500
  ._icon._emoji
    mr sm
  ._icon._generic
    ml .1em
    mr .9em
    color $gray-dark
    font-size .85em
._price
  font-size .875em
  color $gray-light
._fly-icon
  position absolute
  top 0
  left 10%
  z-index 100000

</style>
