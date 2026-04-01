<script setup>
import { useUserStore } from '@/stores/index'
import { userLoginApi } from '@/api/user'
import { ref } from 'vue';
// const userStore = useUserStore()
const userData = ref({
  username: '77Wky',
  password: '111111'
})
const login = async () => {
  const res = await userLoginApi(userData.value)
  console.log(res)
}
</script>

<template>
  <p>{{ useUserStore().token }}</p>
  <button @click="useUserStore().setToken('Hello World')">修改Token</button>
  <button @click="useUserStore().removeToken()">清除Token</button>
  <button @click="login()">登录测试</button>
</template>
