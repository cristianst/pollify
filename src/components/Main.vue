<template>
  <div class="main-page">
    <div class="content">
      <div class="inner">
        <icon
          name="bar-chart"
          scale="3"/>
        <h1>{{ title }}</h1>
        <h3>{{ slug }}</h3>
        <router-link to="/new">
          <md-button
            class="md-raised md-primary">Create Poll</md-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      title: 'pollify',
      slug: '- real time polling -',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-page {
  height: 100%;
  .content {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    .inner {
      text-align: center;
    }

    h1 {
      font-size: 4vw;
    }
    h3 {
      font-style: italic;
      color: #424B54
    }
  }
}
</style>
