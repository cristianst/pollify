<template>
  <div class="pollPieChart">
    <div class="canvas-holder">
      <canvas
        class="pie-canvas"
        id="pollChart" />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PollPieChart',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    if (!this.pollChart) {
      // Chart
      const colors = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'];
      const ctx = document.getElementById('pollChart').getContext('2d');

      this.pollChart = new Chart(ctx, {
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
    }
  },
  watch: {
    items(newItems) {
      // Update chart
      this.pollChart.data.labels = newItems.map(item => item.label);
      this.pollChart.data.datasets.forEach((dataset) => {
        dataset.data = newItems.map(item => item.votes);
      });

      this.pollChart.update();
    },
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
