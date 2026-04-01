import request from '@/utils/request'

// 注册接口
export const userRegisterApi = (userData) => {
  return request.post('/api/reg', userData)
}

// 登录接口
export const userLoginApi = (userData) => {
  return request.post('/api/login', userData)
}
