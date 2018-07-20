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
        <button @click="toggle.opened = !toggle.opened" class="reset-button">
          <q-icon name="ion-close" size="2em" />
        </button>
      </div>
      <div class="_title"><h2>{{ title }}</h2></div>
    </div>
    <slot />
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
._top
  border-bottom 1px solid $bg-light
  pa lg
._nav
  display flex
  justify-content flex-end

</style>
