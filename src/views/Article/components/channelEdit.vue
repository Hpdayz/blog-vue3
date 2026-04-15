<script setup>
import { ref } from 'vue'
// 弹层的显示隐藏
const dialogVisible = ref(false)
// 组件方法
const open = (obj) => {
  console.log(obj)
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="标题" width="500">
    <span>内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>