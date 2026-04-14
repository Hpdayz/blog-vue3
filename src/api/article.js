import request from '@/utils/request'

// 获取文章分类的接口
export const articleGetChannels = () => {
  return request.get('/my/cate/list')
}
