import request from '@/utils/request'

// 获取文章分类的接口
export const articleGetChannels = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类的接口
export const articleAddChannels = (data) => {
  return request.post('/my/cate/add', data)
}

// 更新/编辑 文章分类的接口
export const articleEditChannels = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类的接口
export const articleDelChannels = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

// 获取文章列表的接口
export const articleGetList = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

// 发布文章的接口 -> data 接收的参数为 application/form-data
export const articlePublish = (data) => {
  return request.post('/my/article/add', data)
}