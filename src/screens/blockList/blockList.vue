<template>
  <div class="block-list-screen screen">
    <div class="inner">
      <div class="grid">
        <div class="title">Blocks</div>
        <div class="field average-block-time">
          <span class="field-name">average rate 1 per </span>
          <relative-time :ts="getAverageBlockTime" big spaced/>
        </div>
        <div>
          <span class="field-name">last block mined</span>
          <relative-time :ts="getLastMinedBlockTime(this.currentTime)" big spaced/>
          <span class="field-name">ago</span>
        </div>
      </div>

      <table class="transactions">
        <tr v-for="b in blocks">
          <template v-if="b">
            <td>
              <div class="block-number">
                <router-link :to="`/block/${b.height}`">{{ b.height }}</router-link>
              </div>
            </td>
            <td>
              <span class="field-name">hash</span>
              <span v-if="b.hash" class="number">
                <ae-hash type="short" :hash="b.hash"/>
              </span>
              <span v-else>n/a</span>
            </td>
            <td>
              <span class="field-name">target</span>
              <span class="number">{{b.target}}</span>
            </td>
            <td>
              <span class="number">{{ b.transactions.length }}</span>
              <span class="field-name">Transaction(s)</span>
            </td>
            <td>
              <span class="field-name">mined by</span>
              <span class="account-address">
                <router-link :to="`/account/${b.miner}`">
                  <named-address :address="b.miner"/>
                </router-link>
              </span>
            </td>
            <td>
              <span class="field-name">time</span>
              <span class="number">
                <relative-time :ts="currentTime - b.time"/>
              </span>
            </td>
          </template>
          <template v-else>
            <td colspan="3">Loading..</td>
          </template>
        </tr>
      </table>
      <div class="center">
        <ae-button invert type="exciting" @click="loadMore">load more</ae-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'

export default {
  /*
   * Screen Components
   */
  components: { AeButton },

  /*
   * Screen Mixins
   */
  mixins: [currentTime],

  /*
   * Computed Properties
   */
  computed: {
    /*
     * map blocks unto computed
     * properties
     */
    ...mapState('blocks', [
      'blocks'
    ]),

    /*
     * map block getters into
     * the computed properties
     */
    ...mapGetters('blocks', [
      'getAverageBlockTime',
      'getLastMinedBlockTime'
    ])
  },

  /*
   * Screen methods
   */
  methods: {
    loadMore: function () {
      return this.$store.dispatch('blocks/getLatestBlocks', this.blocks.length + 10)
    }
  },

  /*
   * Fetch last 10 blocks from node
   */
  mounted: function () {
    return this.$store.dispatch('blocks/getLatestBlocks', 10)
  },
  activated: function () {
    return this.$store.dispatch('blocks/getLatestBlocks', 10)
  }
}
</script>
<style src='./blockList.scss' lang='scss'/>
