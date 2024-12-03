import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SportTypeDetailView from '../views/SportTypeDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sport/:id',
      name: 'sport-detail',
      component: SportTypeDetailView
    },
    {
      path: '/account/create',
      name: 'account-create',
      component: () => import('../views/AccountCreateView.vue')
    },
    {
      path: '/account/profile',
      name: 'account-profile',
      component: () => import('../views/AccountProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/ImpressumView.vue')
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      component: () => import('../views/DatenschutzView.vue')
    }
  ]
})

export default router
