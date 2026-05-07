import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
// 1. 项目基地址
const baseURL = 'http://big-event-vue-api-t.itheima.net'
// const baseURL = 'http://localhost:5000'
// 2. 创建 axios 实例
const instance = axios.create({
  baseURL,
  timeout: '10000'
})

// 3. 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 4. 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // ElMessage.error(res.data.message)
    return Promise.reject(res)
  },
  (err) => {
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.response?.data?.message || '服务异常')
    return Promise.reject(err)
  }
)
// 5. 导出 axios 实例
export default instance
// 按需导出
export { baseURL }
