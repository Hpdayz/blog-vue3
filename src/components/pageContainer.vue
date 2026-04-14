<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  btnName: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="pageContainer">
    <template #header>
      <el-header class="header">
        <span>{{ title }}</span>
        <el-button type="primary">{{ btnName }}</el-button>
      </el-header>
    </template>
      <slot>我是内容</slot>
  </el-card>
</template>

<style scoped>
.pageContainer {
  min-height: 100%;
  box-sizing: border-box;
}
.pageContainer .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
