<template>
<q-modal
  v-model="toggle.opened"
  @hide="hideFunction"
  @show="showFunction"
  :class="['modal-fullscreen',
    {'app-minimised': $store.get('appMinimised')}]"
  :position="position"
  maximized
>
  <div class="_wrapper">
    <div class="_top">
      <div class="_nav">
        <button @click="toggle.opened = !toggle.opened" class="_close reset-button">
          <q-icon name="fas fa-chevron-left" size="1.3em" />
        </button>
      </div>
      <h2 class="_title">{{ title }}</h2>
    </div>
    <div class="_content">
      <slot />
    </div>
  </div>
</q-modal>
</template>

<script>
export default {
  components: {},
  props: ['toggle', 'title', 'position', 'hideFunc', 'showFunc'],
  data () { return {} },
  computed:
  {
  },
  methods:
  {
    hideFunction () {
      if (!this.hideFunc || typeof this.hideFunc !== 'function') return
      return this.hideFunc()
    },
    showFunction () {
      if (!this.showFunc || typeof this.showFunc !== 'function') return
      return this.showFunc()
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '~styl/variables'

.modal-fullscreen
  background-color white
._wrapper
  pb xxl
  position relative
._top
  border-bottom 1px solid $bg-light
  // position absolute
  // width 100%
  pa lg
  pb sm
._nav
  display flex
  justify-content flex-start
._title
  font-size 1.625em
  font-weight 500
._close
  mt -.8em
  mb sm
  pa sm
// ._content
//   pt 6.4rem

</style>
