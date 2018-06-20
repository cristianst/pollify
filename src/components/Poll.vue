<template>
  <div>
    {{ text }}
    <div>
      <div
        v-for="(item, index) in items"
        :key="index">
        <div>{{ item.label }} has {{ item.votes }} votes </div>
      </div>
      <div class="">
        total votes: {{ totalVotes }}
      </div>
      <div class="canvas-holder">
        <canvas class="pie-canvas" id="myChart"></canvas>
      </div>
      
    </div>
  </div>
</template>
<script>
import db from '../firebase';
import Chart from 'chart.js';

export default {
  name: 'Poll',
  data() {
    return {
      createdAt: '',
      text: '',
      items: [],
      totalVotes: '',
    };
  },
  created() {
    console.log('1');
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
    // pollRef.get().then((poll) => {
    //   if (poll.exists) {
    //     console.log("Document data:", poll.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // });
  },
  updated() {
    const colors = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'];
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.items.map(item => item.label),
        datasets: [{
          label: '# of Votes',
          data: this.items.map(item => item.votes),
          backgroundColor: this.items.map((item, index) => colors[index]),
        }],
      },
      options: {
        responsive: true,
      },
    });
  },
};
</script>
<style lang="less" scoped>
.canvas-holder {
  width: 40%;
}
.pie-canvas {
  width: 500px;
  height: 280px;
}
</style>

