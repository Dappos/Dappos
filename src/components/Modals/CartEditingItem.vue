<template>
<div class="cart">
  <div class="_wrapper">
    <div class="_title">{{ item.name }}</div>
    <button
      @click="dispatch('cart/decrement', item)"
      class="_min"
    >
      <q-icon name="ion-remove" />
    </button>
    <div class="_count">{{ item.count }}</div>
    <button
      @click="dispatch('cart/increment', item)"
      class="_plus"
    >
      <q-icon name="ion-add" />
    </button>
    <button
      @click="state.cart.editing.state = false"
      class="_close"
    >Close</button>
  </div>

</div>
</template>

<script>
export default {
  components: {},
  props: ['item'],
  data () { return {} },
  computed:
  {
    get () { return this.$store.getters },
    state () { return this.$store.state },
  },
  methods:
  {
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/themes/common.variables'

.cart
  background-color $bg-light
  font-size 1.2em
  button
    reset-button()
    width 100%
    height 100%
._wrapper
  display grid
  grid-gap 2px
  grid-template-areas "title title title" "min count plus" "close close close"
  grid-template-columns 5em 1fr 5em
  > div
  > button
    text-align center
    background-color white
    pa lg
._min, ._plus
  font-size 2em
  py sm !important
._title
  grid-area title
  font-weight 600
._min
  grid-area min
._plus
  grid-area plus
._count
  grid-area count
  font-size 1.4em
  py md !important
._close
  grid-area close
  color $gray-light


</style>
