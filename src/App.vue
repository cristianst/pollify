<template>
  <div id="app">
    <div class="top-line"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
body, html {
  padding:0;
  background-color: #FBFBFF;
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .md-field label {
    font-size: 13px;
  }
  .top-line {
    width: 100%;
    height: 4px;
    background-color: #0B4F6C;
  }
  .md-list-item-content {
    padding: 0 !important;
  }
}
</style>
