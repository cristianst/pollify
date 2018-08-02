<template>
  <div
    class="poll-container"
    v-if="items.length > 0">
    <h2>{{ text }}</h2>
    <div class="poll-main-content">
      <div class="poll-choices">
        <div
          class="single-choice"
          v-for="(item, index) in items"
          v-bind:class="{ selected : selectedChoice === index}"
          @click="makeSelection(index)"
          :key="index">
          <div><span class="choice-label">{{ item.label }}</span>: {{ item.votes }} votes </div>
          <div
            class="choice-percentage-wrapper"
            v-if="item.votes">
            <div
              class="choice-percentage"
              v-bind:style="{ width: calculatePercentage(item.votes)}"
            />
            <span class="percentage-number">
              {{ item.votes ? parseFloat(item.votes / totalVotes * 100).toFixed(2) + '%' : 0 }}
            </span>
          </div>
        </div>
        <div
          v-if="totalVotes"
          class="poll-total">
          Total Votes: <span class="total-counter">{{ totalVotes }}</span>
        </div>
      </div>

      <PollPieChart
        v-if="totalVotes"
        v-bind:items="items"
      />
    </div>
    <div class="poll-actions">
      <md-button
        class="md-raised md-primary"
        @click="vote"
      >Vote</md-button>
    </div>
  </div>
</template>
<script>
import PollPieChart from '@/components/PollPieChart';
import db from '../firebase';

const genericToastConfig = {
  duration: 2000,
  position: 'top-right',
};

export default {
  name: 'Poll',
  components: {
    PollPieChart,
  },
  data() {
    return {
      selectedChoice: null,
      createdAt: '',
      text: '',
      items: [],
      totalVotes: '',
    };
  },
  methods: {
    vote() {
      if (this.selectedChoice === null) {
        this.$toasted.error('You need to pick a choise first', {
          ...genericToastConfig,
        });
      } else {
        this.items[this.selectedChoice].votes += 1;
        const pollId = this.$route.params.id;
        const ref = db.collection('polls').doc(pollId);

        ref.update({
          options: this.items,
        }).then(() => {
          this.$toasted.success('Thanks for voting', {
            ...genericToastConfig,
          });
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    calculatePercentage(votes) {
      if (votes > 0) {
        return `${parseFloat((votes / this.totalVotes) * 100).toFixed(2)}%`;
      }
      return '0%';
    },
    makeSelection(index) {
      this.selectedChoice = index;
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
  padding: 30px 20px;
  @media @desktop, @desktop-xl {
    display: flex;
  }

  @media @desktop, @desktop-xl, @tablet {
    min-width: 960px;
  }
  .poll-choices {
    .single-choice {
      margin-bottom: 20px;
      opacity: 0.9;
      padding: 10px;
      &:hover {
        opacity: 1;
        background: #eee;
      }
      &.selected {
        border: 1px solid#448aff;;
        background: #eee;
        padding: 9px;
      }
      cursor: pointer;
      .choice-label {
        font-weight: 600;
      }
      .choice-percentage-wrapper {
        display: flex;
        margin: 10px 0;
        .choice-percentage {
          background-color: #4BA6A8;
          height: 25px;
          -webkit-transition: width 1s ease-in-out;
          -moz-transition: width 1s ease-in-out;
          -o-transition: width 1s ease-in-out;
          transition: width 1s ease-in-out;
        }
        .percentage-number {
          margin-left: 5px;
          line-height: 25px;
        }
      }
    }
    .poll-total {
      margin-top: 20px;
      margin-left: 10px;
      .total-counter {
        font-weight: 600;
      }
    }
  }
  > div {
    flex: 1;
  }
}
</style>

