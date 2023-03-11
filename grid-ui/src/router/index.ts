import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/assets', name: 'assets', component: () => import('@/views/AssetsView.vue') },
    { path: '/activities', name: 'activities', component: () => import('@/views/ActivitiesView.vue') },
    { path: '/tasks', name: 'tasks', component: () => import('@/views/TasksView.vue') },
    { path: '/test', name: 'test', component: TestView },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
