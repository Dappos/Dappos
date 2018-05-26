<template>
<q-list
  no-border
  link
  inset-delimiter
>
  <q-list-header>Dappos menu</q-list-header>
  <q-item @click.native="openURL('http://quasar-framework.org')">
    <q-item-side icon="school" />
    <q-item-main label="Docs" sublabel="quasar-framework.org" />
  </q-item>
  <q-item @click.native="openURL('https://github.com/quasarframework/')">
    <q-item-side icon="code" />
    <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
  </q-item>
  <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
    <q-item-side icon="chat" />
    <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
  </q-item>
  <q-item @click.native="openURL('http://forum.quasar-framework.org')">
    <q-item-side icon="record_voice_over" />
    <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
  </q-item>
  <q-item @click.native="openURL('https://twitter.com/quasarframework')">
    <q-item-side icon="rss feed" />
    <q-item-main label="Twitter" sublabel="@quasarframework" />
  </q-item>
</q-list>
</template>

<script>
export default {
  components: {},
  props: [],
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

<style lang="styl" scoped>
@import '../css/themes/common.variables'

/*._wrapper*/


</style>
