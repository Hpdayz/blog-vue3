import { useUserStore } from '@/stores'
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

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
  // 1.  token 不是后端返回的 Bearer 类型，随意修改一下也能访问，怎么避免？
  // 回答： 每个受保护的接口都需要校验token，不合法就返回401/403，前端即使被篡改，也不能绕过后端校验
  return true
})

export default router
