<template>
  <row-wrapper>
    <div class="_row">
      <div class="_overview">{{ overview }}</div>
      <div class="_date">{{ date }}</div>
      <div class="_fiat">{{ receit.fiat | money(get('settings/currencyConfig')) }}</div>
      <div class="_eth">{{ receit.value }} {{ receit.symbol }}</div>
    </div>
  </row-wrapper>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  components: {},
  props: ['receit'],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
    overview () {
      return Object.values(this.receit.items)
        .reduce((carry, item, index) => {
          // const _item = `${item.name}×${item.count}`
          const _item = `×${item.count} ${item.name}`
          // const _item = `${item.count}×${item.name}`
          if (index === 0) return _item
          carry = carry + ', ' + _item
          return carry
        }, '')
    },
    date () {
      if (!this.receit.created_at || !this.receit.created_at.toDate) return '--'
      return new Date(this.receit.created_at.toDate()).toLocaleDateString()
    },
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

// .history
._row
  px sm
  display grid
  grid-template-areas "date overview fiat" \
                      "null overview eth"
  grid-template-columns 15% 1fr 20%
  grid-gap .2em 1em
  align-items top
  font-size .875em
._overview
  grid-area overview
._date
  grid-area date
  font-size .9em
  color $gray-dark
._fiat
  grid-area fiat
  text-align right
  pt xs
._eth
  grid-area eth
  text-align right
  font-size .9em
  color $gray-light

</style>
