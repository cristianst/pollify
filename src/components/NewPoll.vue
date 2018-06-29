<template>
  <div class="create-poll">
    <h1>New Poll</h1>
    <div class="container">
      <h3>Question Text</h3>
      <md-field>
        <label>Type your question.</label>
        <md-textarea
          v-model="text"
          class="question-text"
          md-autogrow>sdfsd</md-textarea>
      </md-field>
      <h3 class="choices-header">Choices</h3>
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
            <md-field>
              <label>Answer Label</label>
              <md-input v-model="item.label"/>
            </md-field>
            <md-button
              class="trash-icon md-icon-button md-accent"
              @click="deleteItem(index)">
              <md-icon>delete_forever</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
        <div class="add-button-container">
          <md-button
            @click="addItem"
            class="md-icon-button md-raised">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </div>
      <div class="controls">
        <!-- <md-button class="md-icon-button md-raised">
          <md-icon>add</md-icon>
        </md-button> -->
        <md-button
          @click="createPoll"
          class="md-raised md-primary">Create</md-button>
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
      text: null,
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
  methods: {
    deleteItem(index) {
      const items = this.items;
      const itemsSize = items.length;
      if (itemsSize > 2) {
        items.splice(index, 1);
      } else {
        // min 2 options
      }
    },
    addItem() {
      const items = this.items;
      const itemsSize = items.length;
      if (itemsSize < 4) {
        this.items.push({
          label: '',
          votes: 0,
        });
      } else {
        // max 4
      }
    },
    createPoll() {
      const poll = {
        createdAt: new Date(),
        text: this.text,
        options: this.items,
      };

      db.collection('polls').add(poll).then(() => {
        // const pollId = doc.id;
        // redirect to pollId
      }).catch(() => {
        // catch e
      });
    },
  },
};
</script>
<style lang="less" scoped>
    .create-poll {
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .question-text {
          color: red;
        }
        .container {
          min-width: 350px;

          .choices-header {
            margin-top: 10px;
          }
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
          .add-button-container {
            text-align: center;
            margin-bottom: 10px;
            .add-button {
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .controls {
          text-align: center;
        }
    }
</style>
