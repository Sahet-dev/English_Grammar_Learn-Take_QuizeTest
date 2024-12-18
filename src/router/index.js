// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HomePage.vue'
import UnitList from "@/components/UnitList.vue";
import TestForm from '../components/TestForm.vue'
import UnitShow from "@/components/UnitShow.vue";
import TestComponent from "@/components/EnglishTests/TestComponent.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: UnitList
  },
  {
    path: '/unit/:id',
    name: 'UnitShow',
    component: UnitShow,
    props: true,
  },
  {
    path: '/test-form',
    name: 'TestForm',
    component: TestForm
  },
  {
    path: '/test',
    name: 'TestComponent',
    component: TestComponent
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
