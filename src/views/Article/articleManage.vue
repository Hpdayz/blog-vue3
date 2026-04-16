<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 表格的假数据
const articleList = ref([
  {
    id: 5961,
    title: '新的文章1',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章2',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])
// 表格编辑操作
const onEditArticle = (row) => {
  console.log(row)
}
// 表格的删除操作
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 200px">
        <el-select>
          <el-option label="书籍" value="101"></el-option>
          <el-option label="游戏" value="102"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态" style="width: 200px">
        <el-select>
          <el-option label="已发布" value="101"></el-option>
          <el-option label="草稿" value="102"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>   
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
  </pageContainer>
</template>
