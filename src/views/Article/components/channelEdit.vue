<script setup>
import { articleAddChannels, articleEditChannels } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 弹层的显示隐藏
const dialogVisible = ref(false)
// 组件方法
const open = async (obj) => {
  // console.log(obj)
  formData.value = { ...obj }
  formDataOpen.value = { ...obj }
  dialogVisible.value = true
}
defineExpose({
  open
})
// 记录open() 传递过来的数据
const formDataOpen = ref({})
// 表单数据
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位字母或数字',
      trigger: 'blur'
    }
  ]
}
// 提交表单数据
const formRef = ref()
const onSubmit = async () => {
  // 1. 提交数据前预校验
  await formRef.value.validate()
  // 2. 提交数据
  const isEdit = formData.value.id
  const isChanged =
  formData.value.cate_name !== formDataOpen.value.cate_name ||
  formData.value.cate_alias !== formDataOpen.value.cate_alias
  if (isEdit) {
    // 当前编辑分类操作
    if (isChanged) {
      await articleEditChannels(formData.value)
      ElMessage.success('编辑成功')
    }
  } else {
    // 当前是添加分类操作
    await articleAddChannels(formData.value)
  }
  // 3. 关闭弹层
  dialogVisible.value = false
  // ElMessage.success(isEdit ? '编辑成功' : '添加成功')
  // 4. 传信号给
  emit('success')
}
/* 
  关闭弹层后需要刷新 articleChannel 页面
  当成功添加或编辑的之后，给父组件信号 $emit
*/
const emit = defineEmits(['success'])
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formData.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formData.cate_name" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formData.cate_alias" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
