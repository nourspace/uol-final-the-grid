import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/topics',
    name: 'topics',
    meta: { requiresAuth: true },
    component: () => import('@/views/AssetsView.vue'),
  },
  {
    path: '/activities',
    name: 'activities',
    meta: { requiresAuth: true },
    component: () => import('@/views/ActivitiesView.vue'),
  },
  { path: '/tasks', name: 'tasks', meta: { requiresAuth: true }, component: () => import('@/views/TasksView.vue') },
  {
    path: '/articles',
    name: 'articles',
    meta: { requiresAuth: true },
    component: () => import('@/views/ArticlesView.vue'),
  },
  { path: '/test', name: 'test', component: TestView },
  { path: '/login', name: 'login', component: AuthView, props: { authType: 'login' } },
  { path: '/register', name: 'register', component: AuthView, props: { authType: 'register' } },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const { loggedIn } = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    return next('/')
  }
  // Todo (Nour): [dx/ux] redirect to home if user is logged in and tris to access auth pages
  next()
})

export { routes }
export default router
