import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 测试路由
    { path: '/test', component: () => import('@/views/Test/index.vue') },
    // 登录页面路由
    { path: '/login', component: () => import('@/views/Login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/Layout/layoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/Article/articleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/Article/articleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/User/userProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/User/userAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/User/userPassword.vue')
        }
      ]
    }
  ]
})

export default router
