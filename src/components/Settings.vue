<template>
<div class="settings">
  <div class="_wrapper">
    <div class="_row">
      <div class="_title">Currency</div>
      <div class="_content">
        <q-btn-dropdown :label="get('settings/currencyLabel')" outline >
          <!-- dropdown content -->
          <q-list link>
            <q-item
              v-for="(curr, key) in get('settings/availableCurrencies')"
              @click.native="set('settings/currency', key)"
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
    <div class="_row">
      <div class="_title">Ethereum Wallet Address</div>
      <div class="_content _wallet">
        <q-input
          :value="get('settings/walletAddress')"
          @change="newVal => { set('settings/walletAddress', newVal) }"
        />
        <!-- todo: change with v-modal.lazy when it becomes available -->
        <!-- v-model.lazy="state.settings.walletAddress" -->
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
  flex-wrap wrap
  align-items baseline
._title
  mr lg
._content
  flex 1
._wallet
  width 100%
  flex auto
  mt md

</style>
