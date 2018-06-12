<template>
<div class="settings">
  <div class="_wrapper">
    <div class="_row">
      <div class="_title">Currency</div>
      <div class="_content">
        <q-btn-dropdown :label="get('settings/currency/currency')" outline >
          <!-- dropdown content -->
          <q-list link>
            <q-item
              v-for="(curr, key) in get('settings/currency/availableCurrencies')"
              @click.native="chooseCurrency(key)"
              :key="`curr-dd-${key}`"
              v-close-overlay
            >
              <q-item-main>
                <q-item-tile label>{{ curr.label }}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from './mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () { return {} },
  computed:
  {
  },
  methods:
  {
    chooseCurrency (choice) {
      this.set('settings/currency/currency', choice)
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables'

.settings
  pa xl
._row
  mb lg
  display flex
  align-items baseline
._title
  mr lg

</style>
