<script setup>
import { articleGetChannels } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
const getChannelList = async () => {
  channelList.value = (await articleGetChannels()).data.data
}
getChannelList()
// 父组件 v-model 传递的数据
const modelValue = defineModel({
  type: [String, Number]
})
// defineProps({
//   modelValue: {
//     type: [ String, Number ]
//   }
// })
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)"> -->
  <el-select v-model="modelValue">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
