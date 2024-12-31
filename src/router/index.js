// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/main/HomePage.vue'
import UnitList from "@/components/main/UnitList.vue";
import UnitShow from "@/components/main/UnitShow.vue";
import TestComponent from "@/components/EnglishTests/TestComponent.vue";
import Login from "@/components/main/Login.vue";
import FromDBUnitList from "@/components/main/FromDBUnitList.vue";
import UnitShowFromDB from "@/components/main/UnitShowFromDB.vue";
import UnitUpdate from "@/components/main/UnitUpdate.vue";

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
    { path: "/login", component: Login },
  {
    path: '/unit/:id',
    name: 'UnitShow',
    component: UnitShow,
    props: true,
  },
    {
    path: '/db/unit/:id',
    name: 'UnitShowFromDB',
    component: UnitShowFromDB,
    props: true,
  },
  {
    path: '/unit/:unitId/questions',
    name: 'UnitQuestions',
    component: TestComponent,
  },
    {
    path: '/unit/db/list',
    name: 'FromDBUnitList',
    component: FromDBUnitList,
  },
    {
        path: '/unit/:id/edit',
        name: 'UnitEdit',
        component: UnitUpdate,  // This should be your "Edit Unit" component
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
