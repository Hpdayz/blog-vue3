<script setup>
defineProps({
  title: {
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
        <slot name="extra"></slot>
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
