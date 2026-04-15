<script setup>
import { articleGetChannels } from '@/api/article'
import { ref } from 'vue'
// 导入 channelEdit 组件
import channelEdit from './components/channelEdit.vue'
// 导入 Element 图标库
import { Edit, Delete } from '@element-plus/icons-vue'
// 设置 loading 效果
const loading = ref(true)
// 获取分类列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannels()
  loading.value = false
  channelList.value = res.data.data
}
getChannelList()
// 表格的编辑按钮
const handleEdit = (row) => {
  dialog.value.open(row)
  // console.log(row)
}
// 表格的删除操作
const handleDelete = (row) => {
  console.log(row)
}
// 获取 channelEdit组件
const dialog = ref()
// 添加分类操作
const onAddChannel = () => {
  // 使用组件暴露出来的方法控制弹层显隐
  dialog.value.open({})
}
</script>

<template>
  <pageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel()">添加分类</el-button>
    </template>
    <el-table
      v-loading="loading"
      :data="channelList"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            circle
            plain
            type="primary"
            @click="handleEdit(row, $index)"
            :icon="Edit"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            @click="handleDelete(row)"
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂时没有数据" />
      </template>
    </el-table>

    <channelEdit ref="dialog"></channelEdit>
  </pageContainer>
</template>
<style scoped></style>
