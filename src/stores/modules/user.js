import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userInfoApi } from '@/api/user'
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 数据、 action（普通方法）、getters（计算属性）
    const token = ref()
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息
    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userInfoApi()
      // console.log(res)
      userInfo.value = res.data.data
    }
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo
    }
  },
  { persist: true }
)


