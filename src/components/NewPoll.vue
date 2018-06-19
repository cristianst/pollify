<template>
  <div class="create-poll">
    <h2>New Poll</h2>
    <div class="">
      <h4>Question Text</h4>
      <md-field>
        <label>Textarea</label>
        <md-textarea>sdfsd</md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPoll',
  data() {
    return {
      title: 'pollify',
      slug: '- real time polling -',
    };
  },
};
</script>
<style lang="less" scoped>
    .create-poll {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
