<template>
  <div>
    <div class="grid">
      <field name="">
        <span class='field-name'>account</span>
        <div class="account-address">
          <router-link :to='"/account/" + transaction.tx.account'>
            <named-address :address='transaction.tx.account'/>
          </router-link>
        </div>
      </field>
      <field name="">
        <div class='field-name'>TTL</div>
        {{ transaction.tx.ttl.type}}
        <span class='number'>{{ transaction.tx.ttl.value }}</span>
      </field>
      <field name="" v-if='transaction.tx.query_fee'>
        <div class='field-name'>QueryFee</div>
        <span class='number'>{{ transaction.tx.query_fee }}</span>
        <span class="unit">AE</span>
      </field>
    </div>

    <field>
      <div class='field-name'>QuerySpec </div>
      <pre class="query-spec">{{ transaction.tx.query_spec }}</pre>
    </field>
    <field>
      <div class='field-name'>ResponseSpec </div>
      <pre class="response-spec">{{ transaction.tx.response_spec }}</pre>
    </field>
  </div>
</template>
<script>
export default {
  name: 'oracle-register-tx',
  props: [
    'transaction'
  ]
}
</script>
