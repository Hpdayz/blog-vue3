<script setup>
import { ref } from 'vue'
// 弹层的显示隐藏
const dialogVisible = ref(false)
// 组件方法
const open = (obj) => {
  // console.log(obj)
  formData.value = { ...obj }
  dialogVisible.value = true
}
defineExpose({
  open
})
// 表单数据
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\s{1,10}$/,
      message: '分类名称必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]$/,
      message: '分类名称必须是1-15位字母或数字',
      trigger: 'blur'
    }
  ]
}
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑分类' : '添加分类'" width="500">
    <el-form
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
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
