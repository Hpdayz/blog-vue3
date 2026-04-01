import request from '@/utils/request'

// 登录接口
export const userLoginApi = (userData) => {
  return request.post('/api/login', userData)
}
