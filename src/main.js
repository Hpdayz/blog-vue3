import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/main.scss'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
// Pinia 统一导入
import pinia from  '@/stores/index'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
