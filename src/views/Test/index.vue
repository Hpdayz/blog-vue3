<script setup>
import { useUserStore } from '@/stores/index'
import { userLoginApi } from '@/api/user'
import { ref } from 'vue';
import { articleGetChannels } from '@/api/article';
// const userStore = useUserStore()
const userData = ref({
  username: '77Wky',
  password: '111111'
})
const login = async () => {
  const res = await userLoginApi(userData.value)
  console.log(res)
}
const Categary = ref([])
const getCate = async () => {
  const res = await articleGetChannels()
  console.log(res.data.data)
  Categary.value = res.data.data
}

</script>

<template>
  <p>{{ useUserStore().token }}</p>
  <button @click="useUserStore().setToken('Hello World')">修改Token</button>
  <button @click="useUserStore().removeToken()">清除Token</button>
  <button @click="login()">登录测试</button>
  <p>{{ useUserStore().userInfo }}</p>
  <button @click="useUserStore().getUserInfo()">获取用户信息测试</button>
  <hr>
  <button @click="getCate()">获取文章分类测试</button>
  <p>{{ Categary }}</p>
</template>
