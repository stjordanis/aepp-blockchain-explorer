<template>
  <div v-if="account" class="account-screen screen">
    <header class="header">
      <h1 class="title">
        <ae-identity-avatar :address="address"/>
        <named-address :address="address"/>
      </h1>

      <field name="Balance">
        <span class="number">{{ account.balance }}</span>
        <span class="unit">AE</span>
      </field>

      <field class="pubkey" name="Public Key">
        <div class="account-public-key">
          <ae-address :address="address"/>
        </div>
      </field>
    </header>

    <h2>Transactions</h2>
    <div class="transactions">
      <transaction :key="t.hash" v-for="t in account.transactions" :transaction="t"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AePanel } from '@aeternity/aepp-components'
import polling from '../../functions/polling'

/*
 * Creating polling instance
 */
const poll = polling()

// TODO: There is a reactivity problem in here, The v-if does not work
export default {
  /*
   * Name
   */
  name: 'Address',

  /*
   * Component Props
   */
  props: ['address'],

  /*
   * Components
   */
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel
  },

  /*
   * Computed Props
   */
  computed: mapState('accounts', {
    'account': function (state) {
      return state.accounts[this.address]
    }
  }),

  /*
   * Before and After route events
   */
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    return next((vm) => poll.fetch.call(vm, 'accounts/get', to.params.address))
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    return poll.close('accounts/get', () => next())
  }
}
</script>
<style src='./address.scss' lang='scss' />
