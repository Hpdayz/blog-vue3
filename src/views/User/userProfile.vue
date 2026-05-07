<script setup>
import { userUpdate } from '@/api/user'
import pageContainer from '@/components/pageContainer.vue'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const {
  userInfo: { username, nickname, email, id }
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
// 获取 el-form 组件
const formRef = ref()
// 提交用户信息
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if(valid) {
    await userUpdate(userInfo.value)
    // await userInfoApi()
    await useUserStore().getUserInfo()
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <pageContainer title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </pageContainer>
</template>
