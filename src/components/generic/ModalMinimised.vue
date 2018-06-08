<template>
<q-modal
  v-model="toggle.state"
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
    get () { return this.$store.getters },
    state () { return this.$store.state },
  },
  methods:
  {
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
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
@import '../../css/themes/common.variables'

.modal-minimised .modal-content
  border-radius $radius

</style>
