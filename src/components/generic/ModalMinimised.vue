<template>
<q-modal
  v-model="toggle.state"
  minimized
  class="modal-minimised"
  @show="showFunction"
>
  <slot />
</q-modal>
</template>

<script>
export default {
  components: {},
  props: ['toggle', 'show'],
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
    showFunction () {
      if (Object.prototype.toString.call(this.show) === '[object Function]') {
        this.show()
      }
      document.activeElement.blur()
    },
  }
}
</script>

<style lang="stylus">
@import '../../css/themes/common.variables'

.modal-minimised .modal-content
  border-radius $radius

</style>
