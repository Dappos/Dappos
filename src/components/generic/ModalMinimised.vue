<template>
<q-modal
  v-model="toggle.opened"
  minimized
  class="modal-minimised"
  @hide="hideFunction"
  @show="showFunction"
>
  <slot />
</q-modal>
</template>

<script>
export default {
  components: {},
  props: ['toggle', 'hideFunc', 'showFunc'],
  data () { return {} },
  computed:
  {
  },
  methods:
  {
    hideFunction () {
      if (!this.hideFunc || typeof this.hideFunc !== 'function') return
      document.activeElement.blur()
      return this.hideFunc()
    },
    showFunction () {
      if (!this.showFunc || typeof this.showFunc !== 'function') return
      document.activeElement.blur()
      return this.showFunc()
    },
  }
}
</script>

<style lang="stylus">
@import '~styl/variables'

.modal-minimised .modal-content
  border-radius $radius
  font-size .9em

</style>
