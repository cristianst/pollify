<template>
  <div class="poll-container" v-if="items.length > 0">
    {{ text }}
    <div class="poll-main-content">
      <div class="poll-choices">
        <div
          v-for="(item, index) in items"
          :key="index">
          <div>{{ item.label }} has {{ item.votes }} votes </div>
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
  created() {
    const pollId = this.$route.params.id;
    const pollRef = db.collection('polls').doc(pollId);

    pollRef.onSnapshot((doc) => {
      if (doc.exists) {
        const poll = doc.data();
        this.text = poll.text;
        this.items = poll.options;
        this.totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);
      }
    });
  },
  updated() {
  },
};
</script>
<style lang="less" scoped>
.poll-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.poll-main-content {
  display: flex;
  > div {
    flex: 1;
  }
}
</style>

