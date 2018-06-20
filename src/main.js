// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import { MdButton, MdField, MdList, MdRadio, MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'vue-awesome/icons';
import App from './App';
import router from './router';

Vue.component('icon', Icon);
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdList);
Vue.use(MdRadio);
Vue.use(MdIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
