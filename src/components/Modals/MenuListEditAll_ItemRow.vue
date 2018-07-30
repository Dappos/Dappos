<template>
<row-wrapper>
  <div class="_wrapper">
    <!-- <div class="_count">{{ item.count }}x</div> -->
    <div class="_name">
      <q-icon v-if="!item.icon" name="ion-list" class="_icon _generic"/>
      <span v-else class="_icon _emoji">{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </div>
    <div class="_price">
      {{ price | money(get('settings/currencyConfig')) }}
    </div>
    <div class="_nav">
      <q-btn
        @click="dispatch('modals/menulistEdit', item.id)"
        icon="ion-md-more"
        class="_more"
      />
    </div>
  </div>
</row-wrapper>
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
  py .2em
  px .33em
  border-radius $radius
  color white
  font-weight 500
._name
  grid-area name
  display flex
  align-items center
  ._icon
    font-size 1.2em
  ._icon._emoji
    mr sm
  ._icon._generic
    ml .1em
    mr .7em
._price
  grid-area price
  color $gray-light
  font-size .75em
  pl xl
._nav
  grid-area nav
._more
  font-size 1em
  color $gray-light
  // ml md

</style>
