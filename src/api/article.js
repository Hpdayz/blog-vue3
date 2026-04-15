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
