<script setup>
import { ref } from 'vue'
// 抽屉组件
const visibleDrawer = ref(false)
// 组件暴露 open 方法
const open = (obj) => {
  visibleDrawer.value = true
  console.log(obj)
}
defineExpose({
  open
})
</script>
<template>
  <!-- 抽屉组件 -->
  <el-drawer
    v-model="visibleDrawer"
    title="我是抽屉组件"
    direction="ltr"
  >
    <span>我是内容</span>
  </el-drawer>
</template>