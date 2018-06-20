<template>
  <div class="create-poll">
    <h2>New Poll</h2>
    <div class="">
      <h4>Question Text</h4>
      <md-field>
        <label>Type your question.</label>
        <md-textarea class="question-text">sdfsd</md-textarea>
      </md-field>
      <h4>Choices</h4>
      <div class="content">
        <md-list class="choices-list md-dense">
          <md-list-item
            class="list-item"
            v-for="(item, index) in items"
            :key="index">
            <icon
              scale="1.5"
              name="angle-right"
              class="angle-icon"/>
            <!-- <md-radio
              :value="item.label"
              v-model="radio"
              name="rasd"
              class="choice-radio md-primary"/> -->
            <md-field>
              <label>Answer Label</label>
              <md-input v-model="item.label"/>
            </md-field>
            <icon
              scale="1.2"
              name="trash"
              class="trash-icon"/>
          </md-list-item>
        </md-list>
        <md-button class="md-icon-button md-raised md-accent">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div class="controls">
        <md-button class="md-raised md-primary">Create</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase';

export default {
  name: 'NewPoll',
  data() {
    return {
      radio: false,
      title: 'pollify',
      slug: '- real time polling -',
      items: [{
        label: 'Option One',
        votes: 0,
      }, {
        label: 'Option Two',
        votes: 0,
      }, {
        label: 'Option Three',
        votes: 0,
      }],
    };
  },
  created() {
    // const polls = db.collection('polls');
  },
};
</script>
<style lang="less" scoped>
    .create-poll {
        display: flex;
        flex-direction: column;
        align-items: center;
        .question-text {
          color: red;
        }

        .content {
          position: relative;
          .choices-list {
            background: transparent;
            .angle-icon {
              margin-right: 10px;
            }
            .list-item {
              .trash-icon {
                color: red;
                margin-top: -5px;
                visibility: hidden;
                &:hover {
                  cursor: pointer;
                }
              }
              &:hover {
                .trash-icon {
                  visibility: visible;
                }
              }
            }
          }
          .add-button {
            &:hover {
              cursor: pointer;
            }
          }
        }
        .controls {
          text-align: center;
        }
    }
</style>
