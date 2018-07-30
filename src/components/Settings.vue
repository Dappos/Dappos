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
          :value="get('settings/wallet.address')"
          @change="newVal => { set('settings/wallet.address', newVal) }"
        />
        <!-- todo: change with v-modal.lazy when it becomes available -->
        <!-- v-model.lazy="state.settings.wallet.address" -->
      </div>
    </div>
    <div class="_row">
      <div class="_title">Required confirmation count</div>
      <div class="_content _wallet">
        <div class="_info">
          The required minimum confirmation count you require per payment. This is counted by the amount of blocks on the Ethereum blockchain since the transaction.
        </div>
        <q-slider
          :value="Number(state.settings.requiredConfirmationCount)"
          @change="val => { set('settings/requiredConfirmationCount', Number(val)) }"
          :min="0" :max="10"
          :step="1" label-always snap
        />
      </div>
    </div>
    <div class="_row">
      <div class="_title full-width">Network provider</div>
      <div class="_content _provider">
        <div class="_info">
          Select a network provider.
        </div>
        <q-btn-dropdown :label="get('settings/selectedNetworkLabel')" outline no-wrap>
          <!-- dropdown content -->
          <q-list link>
            <q-item
              v-for="(curr, key) in get('settings/availableNetworks')"
              @click.native="selectNetwork(key)"
              :key="`netw-sel-${key}`"
              v-close-overlay
            >
              <q-item-main>
                <q-item-tile label>{{ curr.label }}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <div v-if="addingCustomRPC" class="_adding-custom-rpc">
          <q-field
            label="URL"
            :label-width="2"
            helper="We currently only support Web Socket URLs."
          >
            <q-input v-model="customRPC.url" />
          </q-field>
          <q-field
            label="Name"
            :label-width="2"
          >
            <q-input v-model="customRPC.name" />
          </q-field>
          <button @click="addCustomRPC" class="o-btn">Add</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import storeAccess from '@mixins/storeAccess'

export default {
  components: {},
  props: [],
  mixins: [ storeAccess ],
  // ⤷ get(path)  set(path, val)  commit(path, val)  dispatch(path, val)  state
  data () {
    return {
      addingCustomRPC: false,
      customRPC: {name: '', url: ''}
    }
  },
  computed:
  {
  },
  methods:
  {
    selectNetwork (net) {
      if (net === 'add') {
        this.addingCustomRPC = true
        return
      }
      this.set('settings/networkProvider.selected', net)
    },
    addCustomRPC () {
      this.set(
        'settings/networkProvider.customRPCs.*',
        {[this.customRPC.name]: this.customRPC.url}
      )
      this.set('settings/networkProvider.selected', this.customRPC.name)
      this.addingCustomRPC = false
      this.customRPC.name = ''
      this.customRPC.url = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styl/variables'

.settings
  pa xl
._row
  mb lg
  display flex
  flex-wrap wrap
  align-items baseline
._title
  mt lg
  mr lg
  font-weight 500
._content
  flex 1
._wallet
  width 100%
  flex auto
  mt md
._adding-custom-rpc
  mt md
  >*
    mb sm

</style>
