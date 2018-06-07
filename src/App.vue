<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('web3/getAddress')
    this.$store.dispatch('ethEvents/observeAccount')
  }
}
</script>

<style>
</style>
