<script setup>
// 导入文章分类选择组件
import channelSelect from './channelSelect.vue'
import { ref } from 'vue'
// 抽屉组件
const visibleDrawer = ref(false)
// 组件暴露 open 方法
const open = (obj) => {
  visibleDrawer.value = true
  console.log(obj)
  if(obj.id) {
    // 编辑操作
    formData.value = { ...obj }
    console.log('编辑操作')
  }
  else {
    // 添加操作
    formData.value = { ...defaultFormDate.value}
    console.log('添加操作')
  }
}
defineExpose({
  open
})
// 表单数据
// 默认表单数据
const defaultFormDate = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
const formData = ref({
  ...defaultFormDate.value
})
</script>
<template>
  <!-- 抽屉组件 -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formData.id ? '编辑文章' : '添加文章'"
    direction="ltr"
    size="50%"
  >
    <!-- 表单内容 -->
    <el-form :model="formData">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <channelSelect v-model="formData.cate_id" width="100%"></channelSelect>
      </el-form-item>
      <el-form-item label="文章封面">文件上传</el-form-item>
      <el-form-item label="文章内容">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>