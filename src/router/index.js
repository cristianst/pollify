import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import NewPoll from '@/components/NewPoll';
import Poll from '@/components/Poll';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    }, {
      path: '/new',
      name: 'NewPoll',
      component: NewPoll,
    }, {
      path: '/poll/:id',
      name: 'Poll',
      component: Poll,
    },
  ],
});
