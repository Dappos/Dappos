<template>
<q-modal
  v-model="toggle.opened"
  minimized
  class="modal-minimised"
  @hide="hideFunction"
  @show="showFunction"
  :noEscDismiss="noDismiss"
  :noBackdropDismiss="noDismiss"
>
  <slot />
</q-modal>
</template>

<script>
export default {
  components: {},
  props: ['toggle', 'hideFunc', 'showFunc', 'noDismiss'],
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
  border-radius $radius-big

</style>
