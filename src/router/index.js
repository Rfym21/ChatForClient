import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      // 页面级别组件 views
      component: () => import('../views/Home.vue')
    }
  ]
})

export default router