<template>
  <div class="poll-container" v-if="items.length > 0">
    <h2>{{ text }}</h2>
    <div class="poll-main-content">
      <div class="poll-choices">
        <div
          class="single-choice"
          v-for="(item, index) in items"
          :key="index">
          <div><span>{{ item.label }}</span> : {{ item.votes }} votes </div>
          <div
            class="choice-percentage"
            v-bind:style="{ width: calculatePercentage(item.votes)}"
            >
            {{ parseFloat(item.votes / totalVotes * 100).toFixed(2) }}
          </div>
        </div>
        <div v-if="totalVotes">
          total votes: {{ totalVotes }}
        </div>
      </div>
      
      <PollPieChart
        v-bind:items="items"
      />
    </div>
  </div>
</template>
<script>
import PollPieChart from '@/components/PollPieChart';
import db from '../firebase';

export default {
  name: 'Poll',
  components: {
    PollPieChart,
  },
  data() {
    return {
      createdAt: '',
      text: '',
      items: [],
      totalVotes: '',
    };
  },
  methods: {
    calculatePercentage(votes) {
      return `${parseFloat((votes / this.totalVotes) * 100).toFixed(2)}%`;
    },
  },
  created() {
    const pollId = this.$route.params.id;
    const pollRef = db.collection('polls').doc(pollId);

    pollRef.onSnapshot((doc) => {
      if (doc.exists) {
        const poll = doc.data();
        this.text = poll.text;
        this.items = poll.options.sort((a, b) => a.votes - b.votes).reverse();
        this.totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);
      }
    });
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
@import './media.queries.less';

.poll-container {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: center;
}
.poll-main-content {
  @media @desktop, @desktop-xl {
    display: flex;
  }

  @media @desktop, @desktop-xl, @tablet {
    min-width: 960px;
  }
  .poll-choices {
    .choice-percentage {
      //height: 4px;
      background-color: red;
      -webkit-transition: width 1s ease-in-out;
      -moz-transition: width 1s ease-in-out;
      -o-transition: width 1s ease-in-out;
      transition: width 1s ease-in-out;
    }
  }
  > div {
    flex: 1;
  }
}
</style>

