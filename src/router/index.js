import { createRouter as _createRouter, createWebHistory } from 'vue-router'


import SingleListView from '../views/SingleListView.vue';
import HomeView from '../views/HomeView.vue'
/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 */

const routes = [
 
  {
    path: '/list/:id',
    name: 'singleList',
    component: SingleListView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list/null',
    name: 'default',
    redirect: {name: "home"}
  }
];

export function createRouter () {
  return _createRouter({
    history: createWebHistory(),
    routes: routes
  })
}
