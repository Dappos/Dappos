<template>
<q-modal
  v-model="toggle.state"
  maximized
  :position="position"
  :class="['modal-fullscreen',
    {'app-minimised': get.appMinimised}]"
>
  <div class="_wrapper">
    <div class="_top">
      <div class="_nav">
        <button @click="toggle.state = !toggle.state" class="reset-button">
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
  props: ['toggle', 'title', 'position'],
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
