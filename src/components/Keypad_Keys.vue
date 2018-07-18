<template>
<div class="keypad-keys">
  <div class="_keys">
    <button @click="dispatch('keypad/tap', 1)">1</button>
    <button @click="dispatch('keypad/tap', 2)">2</button>
    <button @click="dispatch('keypad/tap', 3)">3</button>
    <button @click="dispatch('keypad/tap', 4)">4</button>
    <button @click="dispatch('keypad/tap', 5)">5</button>
    <button @click="dispatch('keypad/tap', 6)">6</button>
    <button @click="dispatch('keypad/tap', 7)">7</button>
    <button @click="dispatch('keypad/tap', 8)">8</button>
    <button @click="dispatch('keypad/tap', 9)">9</button>
    <button @click="dispatch('keypad/clear')">C</button>
    <button @click="dispatch('keypad/tap', 0)">0</button>
    <button @click="add()" class="_add">
      <q-icon name="ion-add" size="1.3em" color="primary" class="js-fly-keypad-add" />
    </button>
  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  mounted () {},
  computed:
  {
  },
  methods:
  {
    add () {
      if (!this.get('keypad/input')) return
      this.dispatch('keypad/add')
      this.flyToTotal()
    },
    flyToTotal () {
      const el = document.querySelector('.js-fly-keypad-add')
      const elCart = document.querySelector('.js-info-cart')
      this.dispatch('animate/fly', {
        el: el,
        target: elCart,
        clone: true,
        hideAfter: true,
      }).then(_ => {
        this.dispatch('animate/pop', {el: elCart})
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.keypad-keys
  display flex
  ._keys
    flex 1
    z-index 2
    height inherit
    width 100%
    display grid
    grid-template-rows 1fr 1fr 1fr 1fr
    grid-template-columns 1fr 1fr 1fr
    grid-gap 1px
    button
      font-size 2.2em
      pa 0
      display flex
      justify-content center
      align-items center
      text-align center
      background-color white
      border none
      outline none
      z-index 3
      &:active
        box-shadow inset 2px 2px $bg-light
        padding-top 2px
        padding-left 2px
        z-index 1
// ._C
// ._add

</style>
