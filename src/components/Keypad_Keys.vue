<template>
<div class="keypad-keys">
  <div class="_keys">
    <button class="_1" @click="dispatch('keypad/tap', 1)">1</button>
    <button class="_2" @click="dispatch('keypad/tap', 2)">2</button>
    <button class="_3" @click="dispatch('keypad/tap', 3)">3</button>
    <button class="_4" @click="dispatch('keypad/tap', 4)">4</button>
    <button class="_5" @click="dispatch('keypad/tap', 5)">5</button>
    <button class="_6" @click="dispatch('keypad/tap', 6)">6</button>
    <button class="_7" @click="dispatch('keypad/tap', 7)">7</button>
    <button class="_8" @click="dispatch('keypad/tap', 8)">8</button>
    <button class="_9" @click="dispatch('keypad/tap', 9)">9</button>
    <button class="_C" @click="dispatch('keypad/clear')">C</button>
    <button class="_0" @click="dispatch('keypad/tap', 0)">0</button>
    <button class="_add" @click="add()">
      <q-icon name="ion-add" size="1.3em" color="primary" />
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
      const el = document.querySelector('.js-keypad-fly')
      const elCart = document.querySelector('.js-info-cart')
      this.dispatch('animate/fly', {
        el: el,
        id: 'js-keypad-fly',
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
      font-size 3em
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
// ._1
// ._2
// ._3
// ._4
// ._5
// ._6
// ._7
// ._8
// ._9
// ._0
// ._C
// ._add

</style>
