// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/main/HomePage.vue'
import UnitList from "@/components/main/UnitList.vue";
import UnitShow from "@/components/main/UnitShow.vue";
import TestComponent from "@/components/EnglishTests/TestComponent.vue";
import Login from "@/components/main/Login.vue";
import Registration from "@/components/main/Registration.vue";
import FromDBUnitList from "@/components/main/FromDBUnitList.vue";
import UnitShowFromDB from "@/components/main/UnitShowFromDB.vue";
import UnitUpdate from "@/components/main/UnitUpdate.vue";
import UpdateQuiz from "@/components/main/UpdateQuiz.vue";
import UserManagement from "@/components/main/UserManagement.vue";
import VisibilityUnitsList from "@/components/main/VisibilityUnitsList.vue";

const routes = [
  {
    path: '/',
    name: 'FromDBUnitList',
    component: FromDBUnitList
  },
  {
    path: '/list',
    name: 'List',
    component: UnitList
  },
  { path: "/login", component: Login },
  { path: "/register", component: Registration },
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
        path: '/quiz/:unitId',
        name: 'UpdateQuiz',
        component: UpdateQuiz
    },
  {
    path: '/unit/:unitId/questions',
    name: 'UnitQuestions',
    component: TestComponent,
  },
    {
    path: '/insert',
    name: 'Insert',
    component:  Home,
  },
    {
    path: '/manage',
    name: 'UserManagement',
    component:  UserManagement,
  },
    {
        path: '/unit/:id/edit',
        name: 'UnitEdit',
        component: UnitUpdate,  // This should be your "Edit Unit" component
    },
    {
        path: '/vision',
        name: 'UnitsList',
        component: VisibilityUnitsList,
    }


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
