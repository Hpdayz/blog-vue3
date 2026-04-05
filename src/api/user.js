import request from '@/utils/request'

// 注册接口
export const userRegisterApi = (userData) => {
  return request.post('/api/reg', userData)
}

// 登录接口
export const userLoginApi = (userData) => {
  return request.post('/api/login', userData)
}

// 获取用户信息接口
export const userInfoApi = () => request.get('/my/userinfo')
