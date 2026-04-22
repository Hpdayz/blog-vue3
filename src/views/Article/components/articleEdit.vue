<script setup>
// 导入文章分类选择组件
import channelSelect from './channelSelect.vue'
// 导入 Element Plus Icons
import { Plus } from '@element-plus/icons-vue'
// 注册 Vue-quill 组件
import { QuillEditor } from '@vueup/vue-quill' 
// 导入 vue-quill 的样式
import '@vueup/vue-quill/dist/vue-quill.snow.css'
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

// 文件上传相关
// 图片数据 File 对象
const imgUrl = ref('')
const onUploadFile = (uploadFile) =>{
  // console.log(uploadFile.raw)
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log(imgUrl.value)
  // console.log(URL.createObjectURL(uploadFile.raw))
  formData.value.cover_img = uploadFile.raw
}
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
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="true"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="这是一张图片">
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <div class="editor">
          <!-- 使用 vue-quill -->
          <div class="editor">
            <QuillEditor
              theme="snow"
              v-model:content="formData.content"
              contene-type="html"
            ></QuillEditor>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped> 
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px
  }
}
</style>