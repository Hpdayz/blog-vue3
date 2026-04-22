<script setup>
// 导入文章分类选择组件
import { articleEdit, articleGetDetail, articlePublish } from '@/api/article'
import channelSelect from './channelSelect.vue'
// 导入 Element Plus Icons
import { Plus } from '@element-plus/icons-vue'
// 注册 Vue-quill 组件
import { QuillEditor } from '@vueup/vue-quill'
// 导入 vue-quill 的样式
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { nextTick, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 导入 baseUrl
import { baseURL } from '@/utils/request'
import axios from 'axios'
// 抽屉组件
const visibleDrawer = ref(false)
// 组件暴露 open 方法
const open = async (obj) => {
  visibleDrawer.value = true
  // console.log(obj)
  if (obj.id) {
    // 编辑操作
    // 需要通过获取文章详情来做数据回显
    const res = await articleGetDetail(obj.id)
    formData.value = res.data.data
    // 返回的 cover_img 是一个字符串不是完整的地址
    // 需要与 BaseUrl 进行拼接组成完整的地址
    imgUrl.value = baseURL + formData.value.cover_img
    // cover_img 需要一个 File 对象
    // 当前的 imgUrl 是一个网络图片链接 需要转化成 File 对象
    formData.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formData.value.cover_img
    )
    console.log(formData.value)
    console.log('编辑操作')
  } else {
    // 添加操作
    formData.value = { ...defaultFormDate.value }
    imgUrl.value = ''
    // 等待 DOM 渲染完毕
    nextTick(() => editorRef.value.setHTML(''))
    console.log('添加操作')
  }
}
const imageUrlToFile = async (url, fileName) => {
  // 将网络图片转化为 File 对象
  try {
    // 1. 使用 axios 获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data
    // 2. 将图片数据转换为 Blob 对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })
    // 3. 创建一个新的 File 对象
    const file = new File([blob], fileName, { type: blob.type })
    // console.log(file)
    return file
  } catch (error) {
    ElMessage.error('图片转换错误')
    throw error
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
const onUploadFile = (uploadFile) => {
  console.log(uploadFile.raw)
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log(imgUrl.value)
  // console.log(URL.createObjectURL(uploadFile.raw))
  formData.value.cover_img = uploadFile.raw
}
// 富文本编辑器对象
const editorRef = ref()

// 发布文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formData.value.state = state
  // 将 formData 转化为 FormData 对象
  const fd = new FormData()
  for (let key in formData.value) {
    fd.append(key, formData.value[key])
  }
  if (formData.value.id) {
    // 编辑完成发布
    // console.log(fd.getAll())
    await articleEdit(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加完成发布
    await articlePublish(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
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
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="这是一张图片" />
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
              content-type="html"
              ref="editorRef"
            ></QuillEditor>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
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
    min-height: 200px;
  }
}
</style>
