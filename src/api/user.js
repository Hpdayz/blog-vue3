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

// 更新用户信息
export const userUpdate = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', { id, nickname, email })
}

// 上传头像接口
export const userUploadAvatar = (avatar) => {
  return request.patch('my/update/avatar', { avatar })
}

// 更新用户密码
export const userUpdatePwd = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/update', { old_pwd, new_pwd, re_pwd })
}
