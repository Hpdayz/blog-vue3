<script setup>
import { useUserStore } from './stores/index'
</script>

<template>
  <h1>App</h1>
  <p>{{ useUserStore().token }}</p>
  <button @click="useUserStore().setToken('Hello World')">修改Token</button>
  <button @click="useUserStore().removeToken()">清除Token</button>
  <RouterView></RouterView>
</template>

<style scoped></style>
