<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 导入文章分类选择组件
import channelSelect from './components/channelSelect.vue'
// 导入抽屉组件
import articleEdit from './components/articleEdit.vue'
// 导入获取文章列表接口
import { articleGetList } from '@/api/article'
// 导入时间格式化函数
import { formatDate } from '@/utils/date'
// 表单参数
const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
})
// const onTest = () => {
//   console.log(params.value)
// }
// 表单的搜索和重置
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 设置 loading 效果
const loading = ref(true)
// 总共获取几条数据
const total = ref(0)
// 获取表格数据
const getArticleList = () => {
  articleGetList(params.value).then((res) => {
    articleList.value = res.data.data
    articleList.value.forEach(
      (item) => (item.pub_date = formatDate(item.pub_date))
    )
    total.value = res.data.total
    loading.value = false
  })
}
getArticleList()
// 表格的数据
const articleList = ref([])
// articleEdit 组件的 ref 对象
const articleEditRef = ref()
// 表格的添加操作
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 表格编辑操作
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
  // console.log(row)
}
// 表格的删除操作
const onDeleteArticle = (row) => {
  console.log(row)
}
// 分页
const onSizeChange = (size) => {
  // 每页请求的数据发生变化
  params.value.pagesize = size
  // 当 pagesize 数据发生变化，当前页面的数据不会对齐，所以可以直接回到第一页
  params.value.pagenum = 1
  // 重新根据新的参数获取文章列表
  getArticleList()
}
const onCurrentChange = (page) => {
  // 请求的页数发生变化
  params.value.pagenum = page
  getArticleList()
}

// articleEdit 组件发布成功的回调
const onSuccess = (type) => {
  if(type === 'add') {
    // 添加
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 200px">
        <!-- Vue3 中 v-model => :modelValue 和 @update:modelValue -->
        <!-- Vue3 => v-model:cid => :cid 和 @update:cid -->
        <channelSelect v-model="params.cate_id"></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态" style="width: 200px">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
        <!-- <el-button @click="onTest">测试表单参数</el-button> -->
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" underline="never">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditArticle(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDeleteArticle(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 7]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    >
    </el-pagination>
    <!-- 抽屉组件 -->
    <!-- :modelValue & @update:modelValue -->
    <articleEdit ref="articleEditRef" @success="onSuccess"></articleEdit>
  </pageContainer>
</template>
