<template>
<div class="row-wrapper">
  <div class="_row-inner-wrapper">
    <slot />
  </div>
</div>
</template>

<script>
export default {
  components: {},
  data () { return {} },
  computed:
  {
  },
  methods:
  {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.row-wrapper
  pl md
  media-sm pl lg
  background-color white

._row-inner-wrapper
  py sm
  pr sm
  border-bottom 1px solid $bg-light

</style>
