# Vue 3 大事件管理系统

vue3 compositionAPI 

Pinia /Pinia 持久化

Element Plus (表单校验 表格处理 组件封装)

pnpm 包管理

Eslint + prettier 

husky （Git hooks 工具）代码提交之前，进行校验

请求模块设计 Vue Router4 路由设计

接口文档： https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850835

接口根路径：  http://big-event-vue-api-t.itheima.net

在线演示： https://fe-bigevent-web.itheima.net/login



### 安装 pnpm 包管理器

安装： `npm install -g pnpm` 

创建项目： `pnpm create vue`

​					`npm init vue@latest`

 Router 	Pinia 	ESLint 	Prettier 

### 配置 ESLint 与 Prettier

1、prettier 风格

​	单引号

​	不使用分号

​	每行宽度至多80字符

​	不加对象|数组最后逗号

​	换行符号不限制（win mac 不一致）

2、vue 组件名多单词组成（忽略index.vue）

3、props 解构丢失响应式 （关闭）

```js
// eslint.config.js
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
```

### 配置 husky

git 命令 

安装 husky： https://typicode.github.io/husky/

`pnpm dlx husky-init && pnpm install`

修改 .husky.pre-commit 文件

pnpm lint

### 调整目录

删除 默认文件 assets 	components 	views 

调整 router.js 	App.vue

添加  api 	utils

安装 sass

`pnpm add sass`



### 路由 Router

1、创建路由 实例由 createRouter 实现

2、路由模式

​	history 模式使用 createWebHistory()

​	hash 模式使用 createHashHistory()

​	参数是基础路径， 默认/

```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})
export default router
```

在 vue3 compositionAPI 中

1、获取路由对象 router	useRouter

​	const router = useRouter()

2、获取路由参数 route	useRoute

​	const route = useRoute()

import.meta.env.BASE_URL 是Vite 环境变量：[https://cn.vitejs.dev/guide/env-and-mode.html](https://cn.vitejs.dev/guide/env-and-mode.html)

Base_URL 可以在 vite.config.js文件中 配置

`base: '/hp'`

### 导入 Element

安装 Element	`pnpm install element-plus` 

按需导入 `pnpm install -D unplugin-vue-components unplugin-auto-import`

```ts
//vite.config.js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

### 导入 Pinia 

1、 安装 pinia 

`yarn add pinia`

2、main.js 中配置 

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp()

app.use(pinia)
app.mount('#app')
```

3、使用 pinia 

​	在stores 中 新建 user.js 

```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', () => {
	// 数据、action（普通方法）、getters（计算属性）
	return {
	//
	}
})
```

4、pinia 数据持久化

​	安装插件 ：`pnpm add pinia-plugin-persistedstate -D`

​	配置 main.js

```
import presist from 'pinia-plugin-presistedstate'

// presist 挂载到 pinia 实例上
pinia.use(presist)
```

### Pinia 仓库统一管理

1、pinia 独立维护  

把 pinia 实例 放在 stores 下 统一导出

```js
// stores/index.js
import { createPinia } from "pinia"
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(presist)
export default pinia

//main.js 中导入即可
import pinia from '@/stores/index.js'
```

2、 仓库 统一导出

把创建的 仓库 文件 都放入 modules 文件夹下

在index 中 统一导出 modules 下的仓库

```js
import { createPinia } from "pinia"
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(presist)
export default pinia

// import { useUserStore } from "./modules/user"
// export { useUserStore }
// import { useCounterStore } from "./modules/counter"
// export { useCounterStore }

export * from './modules/user' // 接收 user 模块的所有的按需导出
```

### 请求工具 axios 设计

安装 axios ： `pnpm add axios`

1、创建 axios 实例

2、请求拦截器

3、响应拦截器

```js
import axios from 'axios'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res
  },
  (err) => {
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default instance
```

```js
import axios from "axios"
import { useUserStore } from "@/stores"
// 导入 ELMessage 
import { ElMessage } from "element-plus"
// 导入 router
import router from "@/router"

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if(userStore.token) {
      config.headers.Authorization = userStore.token
    } 
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if(res.data.code === 0) {
      return res
    }
    // 失败 给出错误提示
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 → 401 权限不足 或者 token 过期 → 拦截到登录
    if(err.response.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)
// 默认导出
export default instance
// 按需导出
export { baseURL }
```

## 正式开发

### 路由设计

 一级路由 ： 首页 	登录

二级路由： 首页下： 

​							文章

​							文章管理	

​							用户

​							用户头像

​							用户密码

vue-router4 配置 

```js
//router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    { 
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') }
      ]
    },
  ],
})

export default router

```

#### 注意 

配置 路由 后需要配置路由出口

## 登录注册页面 [Element-plus 表单 & 表单校验]

1、先安装 element-plus 图标库

`pnpm i @element-plus/icons-vue`

2、静态结构

```js
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isRegister = ref(true)
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
```

1、结构相关

el-row  el-col el-form  el-form-item

2、校验相关

（1）el-form => :model="formData" 绑定的整个form 的数据对象

（2）el-form => :rules="rules" 绑定整个rules规则对象

（3）表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性

（4）el-form-item => prop配置生效的是哪个校验规则

  // 非空校验

  { required: true, message: '请输入用户名', trigger: 'blur' },

  // 长度校验

  { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'change'}

  // 正则校验  \S 非空字符

  { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }

自定义校验 => 自己写逻辑校验（校验函数）

​	validator: (rule, value, callback)

​	(1)	rule 当前校验规则相关的信息

​	(2)	value 所校验的表单元素目前的表单值

​	(3)	callback 

​				-callback() 校验成功

​				-callback(new ERROR(错误信息)) 校验失败

### 注册功能

1、用户名： 非空校验 长度校验

2、密码： 非空、长度校验  （密码的长度校验使用的是 正则）

3、再次输入密码：非空、长度校验

【进阶】再次输入密码需要自定义校验规则，和密码框输入一致

实现：

1、在 el-form 标签上 使用 model 属性绑定 表单（form）数据对象

```js
const formData = ref({
  username: '',
  password: '',
  repassword: ''
})

<el-form :model="ruleForm">
```

2、通过 v-model 绑定表单数据

```js
<el-input
  v-model="formData.username" 
  :prefix-icon="User"
  placeholder="请输入用户名">
 </el-input>
```

3、rules配置规则  在 el-form 标签上 使用 rules 绑定 表单数据规则

```vue
<script>
const rules = {
  username: [
    // 非空校验
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 长度校验
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'change'}
  ],
  password: [
    // 非空校验
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验  \S 非空字符
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
  ],
  repassword: [
    // 非空校验
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验  \S 非空字符
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if(value !== formData.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 成功也要 callback()
        }
      },
      trigger: 'blur' 
    }
  ]
}
</script>
<el-form :rules="rules">
```

4、通过 prop 绑定对应的校验规则

```js
<el-form-item prop="username">
  <el-input
    v-model="formData.username" 
    :prefix-icon="User"
    placeholder="请输入用户名">
  </el-input>
</el-form-item>
```

#### 注册预校验

1、需要预校验

```js
<el-button class="button" type="primary" auto-insert-space @click="register">
            注册
</el-button>          
// 导入 ELMessage 
import { ElMessage } from "element-plus"
const form = ref() //获取组件对象
const register = async () => {
  // 注册成功之前 先进行校验 校验成功 → 请求， 校验失败 → 自动提示
  await form.value.validate() // 调用组件defineExpose 出来的方法
  // wawit 异步等待预校验成功，再发送请求
  const res = await userRegisterService(formData.value)
  console.log(res)
  // alert('注册成功')
  ElMessage.success('注册成功')
  // 切换到 登录
  isRegister.value = false
}
```

#### 封装注册 api

1、新建 api/user.js

```js
import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password }) =>{
  return request.post('/user/register', { username, password })
}
```

###  登录功能

1、登录页面 用户名和密码的校验规则

2、登录按钮 点击之前 的预校验

3、封装 api 接口

```js
// 登录接口 
export const userLoginService = ({username, password}) => request.post('/user/login', { username, password})
```

4、登录成功 把 token 存进 pinia 仓库 并且 跳转到首页

```js
import { useUserStore } from '@/stores'
import router from '@/router'
const userStore = useUserStore()
const login = async () => {
  // 登录之前预校验 与注册前预校验逻辑一样
  await form.value.validate()
  const res = await userLoginService(formData.value)
  userStore.setToken(res.data.token)
  // console.log('开始登录',res)
  ElMessage.success('登录成功')
  // 跳转首页
  router.push('/')
}
```

## 首页

1、首页架子：

Container 布局容器：

el-container

- el-aside 左侧
  - el-menu 左侧菜单栏
- el-container 右侧
  - el-header 右侧头部
    - el-dropdown
  - el-main 右侧主体
    - router-view

```
<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>黑马程序员：<strong>小帅鹏</strong></div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
```

### 首页架子拆解：

> [!IMPORTANT]
>
> el-menu  整个菜单组件
>
> ​	active-text-color="#ffd04b" // 选项栏激活颜色
>
> ​	:default-active="$route.path" // 默认激活选项
>
> ​	router  // router 选项开启，el-menu-item 的 index 就是点击跳转的路径

```js
<el-menu
  active-text-color="#ffd04b"
  background-color="#232323"
  :default-active="$route.path"
  text-color="#fff"
  router
>
  <el-menu-item index="/article/channel">
  </el-menu-item>
  <el-sub-menu>
    <el-menu-item index="">
    </el-menu-item>
  </el-sub-menu>
</el-menu>
```

### 登录权限拦截

router.js 添加 前置路由守卫拦截

> [!IMPORTANT]
>
>  // 1.  token 不是后端返回的 Bearer 类型，随意修改一下也能访问，怎么避免？
>
>  // 回答： 每个受保护的接口都需要校验token，不合法就返回401/403，前端即使被篡改，也不能绕过后端校验

```js
// 登录访问拦截 => 默认直接放行
// 根据返回值决定 是否放行还是拦截
// 返回值：
// 1、undefined / true  直接放行
// 2、false 拦回 from 的地址页面
// 3、具体路径 或者 路径对象 拦截到对应的地址
//  '/login'  { name: 'login'}
router.beforeEach((to) => {
  // 如果 没有token 且访问的时非登录页，拦截到登录页
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})
```

### 用户基本信息获取&渲染

封装获取用户详情 api 

```js
const userInfoApi = () => {
	return request.get('/my/userinfo')  
} 
```

用户数据在多份页面使用，可以使用 Pinia 来管理 

在 stores/modules/user.js 中定义用户信息数据

```js
const userInfo = ref({})
const getUserInfo = async () => {
	const res = await userInfoApi()
	userInfo.value = res.data.data
}

// 记得把数据和方法 return 出去
```

在 layout/LayoutContainer 页面中调用 useUserStore

```vue
<script setup>
	import { useUserStore } from '@/stores'
	const userStore = useUserStore()
	userStore.getUserInfo()
</script>
```

用户信息渲染

根据存储进 userStore 中的数据使用模板语法替换 template 中的用户相关信息

```js
{{ userStore.userInfo.nickname }}
:src="userStore.userInfo.user_pic || avatar"
```

### 用户下拉框功能设计

Element-plus 的下拉组件

Dropdown 下拉菜单

​	给 el-dropdown 注册 command 事件，点击菜单项会触发对应事件

```vue
<el-dropdown 
	placement="bottom-end"
	@command="handleCommand"
>
	<span>
		下拉菜单
	</span>
	<template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item command="profile">
      </el-dropdown-item>
    </el-dropdown-menu>
	</template>
</el-dropdown>

<script>
  // 下拉框的点击事件以及退出功能
  const handleCommand = (key) => {
    if (key === 'logout') {
      //退出操作
    } else {
      router.push(`/user/${key}`)
    }
  }
</script>
```

> [!IMPORTANT]
>
> 注册 command 事件不需要给方法传参，组件已经封装好了

给用户信息增加 setUserInfo 方法

```js
const setUserInfo = (obj) => {
	user.value = obj
}
```

退出登录功能

1. 跳转会登录页面
2. 清除用户 token 和用户信息
3. 确认用户是否要退出登录

```js
if (key === 'logout') {
  await ElmessageBox.confirm('你确定要登录？'，
    '提示',{
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
    })
	userStore.removeToken()
	userStore.setUserInfo({})
	router.push('/login')
}
```

切换页面

```js
else {
	router.push(`/user/${key}`)
}
```



## 文章分类页面

1、基本架子 PageContainer 封装

2、文章分类渲染 & loading 处理

3、文章分类添加编辑

4、文章分类删除

### 基本架子 PageContainer 封装

文章分类页面和文章管理页面布局相同： 都为主体部分 + 表格

1. 主体部分可以 封装为 pageContainer 组件 ，通过 具名插槽 实现不同内容显示

2. 表格 通过 匿名插槽 实现

整个 PageContainer 为一个 el-card 卡片

​	el-card 有 el-header、el-body、el-fotter 

```vue
<template>
  <el-card class="pageContainer">
    <template #header>
      <el-header class="header">
        <span>{{ title }}</span>
        <slot name="extra"></slot>
      </el-header>
    </template>
      <slot>我是内容</slot>
  </el-card>
</template>
```

PageContainer 主体部分通过父子通信 拿到 title 数据，通过 具名插槽 和 匿名插槽 实现内容显示

```vue
<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>
```

父组件 ArticleChannel 通过 导入 PageContainer 组件使用 并 添加属性的方式传递 title 数据

通过 #extra 提供具名插槽内容

```vue
<template>
  <pageContainer title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    我是主体内容
  </pageContainer>
</template>
```

**同理 ArticleManage 也通过 pageContainer 实现页面布局**

```vue
<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    我是文章管理主体内容
  </pageContainer>
</template>
```

### 文章分类渲染 & loading 处理

新建文章接口类： api/article.js 统一处理文章相关的接口

封装 获取文章分类的接口：

```js
import request from '@/utils/request'
export const articleGetChannels = () => {
	return request.get('/my/cate/list')
}
```

articleChannel 页面调用该接口，获取数据

```vue
<script setup>
import { articleGetChannels } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannels()
  channelList.value = res.data.data
}
getChannelList()
</script>
```

#### 使用 el-table 表格动态渲染

articleChannel 页面使用 el-table 对数据进行动态渲染

1. 通过 :data="channelList" 绑定分类数据
2. el-table 接收的数据为对象数组形式

```
[ 
	{ 
		"id": 17218, 
		"cate_name": "书籍", 
		"cate_alias": "Book"
  }
]
```

3. 在需要的列中通过 prop 接收 channelList 中对应属性的数据
4. 通过 label 属性可以更改列名
5. 设置 type 属性为 index 可以添加索引
6. 调整 style 时 在 el-table 中需要使用 style="xxx"，在每一列 column 中使用 width="xx"

```vue
    <el-table :data="channelList" stripe  style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
      </el-table-column>
    </el-table>
```

**如何处理自定义的表格内容？**
答： 通过 el-table 的插槽可以实现，并且可以通过作用域插槽实现获取 row,column,$index, store 的数据

```vue
<el-table-column>
	<template #default="scope">
		<el-button>
			编辑
		</el-button>
	</template>
</el-table-column>
```

**如何修改按钮样式？**

答：从 Element 图标库中导入对应的图标， 给按钮绑定图标 icon 即可

```vue
import { Edit } from '@element-plus/icons-vue'
<el-button :icon="Edit"></el-button>
```

**如何设置表格空数据的展示？**

答： 使用 el-table 的 empty 插槽，配合 el-empty 组件使用

```vue
<template #empty>
  <el-empty description="暂时没有数据" />
</template>
```

#### 如何实现 loading 效果？

答：通过 v-loading 的自定义指令实现，在 el-table 元素上给 v-loading 绑定 boolean 值即可  

```
<script>
import { ref } from 'vue'
const loading = ref(true)
</script>
<el-table v-loading="loading"></el-table>
```



#### 文章分类渲染完整实现

```vue
<script setup>
import { articleGetChannels } from '@/api/article'
import { ref } from 'vue'
// 导入 Element 图标库
import { Edit, Delete } from '@element-plus/icons-vue'
// 设置 loading 效果
const loading = ref(true)
// 获取分类列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannels()
  loading.value = false
  channelList.value = res.data.data
}
getChannelList()
// 表格的编辑按钮
const handleEdit = (row, $index) => {
  console.log(row, $index)
}
// 表格的删除操作
const handleDelete = (row) => {
  console.log(row)
}
</script>

<template>
  <pageContainer title="文章分类" btnName="添加分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            circle
            plain
            type="primary"
            @click="handleEdit(row, $index)"
            :icon="Edit"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            @click="handleDelete(row)"
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂时没有数据" />
      </template>
    </el-table>
  </pageContainer>
</template>
```

### 文章分类添加和编辑弹层

#### 使用 element 的 el-dialog 弹层组件

**如何控制显隐？**

通过修改 dialogVisible 的 boolean 值

```vue
import { ref } from 'vue'
// 弹层的显示隐藏
const dialogVisible = ref(false)
<template>
  <el-button plain @click="dialogVisible = true">
    Click to open the Dialog
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
```

给添加分类注册点击事件以便修改 dialogVisible 的值

```vue
// 添加分类操作
const onAddChannel = () => {
  dialogVisible.value = true
}
<template #extra>
  <el-button type="primary" 	@click="onAddChannel()">添加分类</el-button>
</template>
```

编辑操作同理可以直接修改 dialogVisible 来控制弹层组件

```js
// 表格的编辑按钮
const handleEdit = (row, $index) => {
  dialogVisible.value = true
  console.log(row, $index)
}
```

#### 封装弹层组件

添加分类和编辑分类两个操作都需要控制弹层组件，因此封装弹层组件 channelEdit

区别： 添加分类不需要数据

​	      编辑分类需要拿到数据，对表单进行初始化

通过组件 defineExpose 去往外暴露一个 open 方法，来判断当前是添加/编辑操作

**新建 /article/components/channelEdit.vue 封装组件**

```vue
<script setup>
import { ref } from 'vue'
// 弹层的显示隐藏
const dialogVisible = ref(false)
// 组件方法
const open = (obj) => {
  console.log(obj)
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="标题" width="500">
    <span>内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
```

在 articleChannel.vue 中使用

1. 使用前现导入组件，Vue 无需进行注册

```js
// 导入 channelEdit 组件
import channelEdit from './components/channelEdit.vue'
```

2. 使用 ref 绑定组件

```vue
const dialog = ref()
<channelEdit ref="dialog"></channelEdit>
```

3. 调用 channelEdit 的 open方法

```js
const onAddChannel = () => {
	dialog.value.open({})
}
```

#### 创建弹层表单

使用 el-form 创建弹层表单

通过 formData，rules，v-model， prop 实现表单数据的双向绑定与检验规则的绑定

```vue
<script>
  // 表单数据
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名称必须是1-15位字母或数字',
      trigger: 'blur'
    }
  ]
}
</script>
<el-form
      :model="formData"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formData.cate_name" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formData.cate_alias" />
      </el-form-item>
</el-form>
```

**channelEdit 表单数据回显**

open是组件暴露出去的方法，父组件调用后可以传参，把需要的表单数据传进来后赋值给表单数据 formData

```js
const open = (obj) =>  {
	formData.value = { ...obj }
  dialogVisible.value = true
}
```

#### 添加分类与编辑分类的提交操作

封装添加/编辑的接口

```js
// 添加文章分类的接口
export const articleAddChannels = (data) => {
  return request.post('/my/cate/add', data)
}

// 更新/编辑 文章分类的接口
export const articleEditChannels = (data) => {
  return request.put('/my/cate/info', data)
}
```

为 channelEdit 注册提交事件

1. 提交前预校验
2. 区分添加分类 / 编辑分类
3. 提交后关闭弹层
4. 提交成功后传递信号给父组件

```vue
<script>
// 提交表单数据
const formRef = ref()
const onSubmit = async () => {
  // 1. 提交数据前预校验
  await formRef.value.validate()
  // 2. 提交数据
  const isEdit = formData.value.id
  if (isEdit) {
    // 当前编辑分类操作
    await articleEditChannels(formData.value)
  } 
  else {
    // 当前是添加分类操作
    await articleAddChannels(formData.value)
  }
  // 3. 关闭弹层
  dialogVisible.value = false
  // 4. 传信号
  emit('success')
}
/* 
  关闭弹层后需要刷新 articleChannel 页面
  当成功添加或编辑的之后，给父组件信号 $emit
*/
const emit = defineEmits(['success'])
</script>
<el-button type="primary" @click="onSubmit()">

```

articleChannel 监听 $emit 信号重新获取分类列表

```vue
<channelEdit 
	ref="dialog" 
	@success="onSuccess"
>
</channelEdit>
// 接收channelEdit 组件的 success 信号后重新获取 分类列表
const onSuccess = () => {
  getChannelList()
}
```

#### 文章分类删除操作

封装文章分类删除的接口

1. 接口类型为 Delete
2. 接收参数为 query 参数

```js
// 删除文章分类的接口
export const articleDelChannels = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
```

给 articleChannel 删除按钮注册点击事件

1. 每行数据通过 el-table-column 的作用域插槽拿到

```vue
<template #default="{ row, $index }">
  <el-button
    circle
    plain
    type="danger"
    @click="handleDelete(row)"
    :icon="Delete"
  ></el-button>
</template>
```

2. 删除操作 handleDelete

```js
// 表格的删除操作
const handleDelete = (row) => {
  // console.log(row)
  ElMessageBox.confirm('是否确认删除该分类？', '温馨提示',{
    type: Warning,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(() => {
    return articleDelChannels(row.id)
  }).then(() => {
    ElMessage.success('删除成功')
    return getChannelList()
  }).catch((err) => {
    if(err !== 'cancel' && err !== 'close') {
      ElMessage.error('删除失败')
    }
  })
}
```

## 文章管理页面

本章偏向于 element 的强化训练，熟练使用 element 的组件

### 基本架子搭建

在 pageContainer 的默认插槽中，配合 element 的 el-form 表单， el-table 表格组件

#### 表单区域搭建

 el-form 组件，el-form-item 作为每一个字段输入的容器，使用各种输入表单项 select， input， radio， checkbox 等

1. 如何控制表单每一项的名称？

答： 表单每一项为 el-form-item， 通过修改 label="xxx" 属性的值，控制每一个字段的名称

2. 如何控制每一项的宽度？

答：通过 style 属性来控制宽度

3. 如何使表单单行显示

答： 为 form 表单添加 inline 属性，值为 boolean 值

4. 如何在表单每一项中给用户提示

答： 给输入表单项添加 placeholder 属性

```vue
<!-- 表单区域 -->
<el-form inline>
  <el-form-item label="文章分类" style="width: 200px">
    <el-select placeholder="请选择分类">
      <el-option label="书籍" value="101"></el-option>
      <el-option label="游戏" value="102"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="发布状态" style="width: 200px">
    <el-select placeholder="请选择状态">
      <el-option label="书籍" value="101"></el-option>
      <el-option label="游戏" value="102"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">搜索</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>
```

#### 表格区域搭建

el-table 组件，el-table-column 每一列

1. 如何给 table 填充数据？

答：在 el-table 元素中为 data 属性绑定对象数组，在 el-table-column 中用 prop 属性匹配对应的键名即可

2. 如何定义列名？

答：在 el-table-column 中通过 label 属性定义表格的列名

3. 如何修改列宽？

答：在 el-table-column 中使用 width 属性定义列宽

4. 如何自定义列内容？

答：通过 el-table-column 的作用域插槽可以实现自定义列内容的显示，并且可以通过参数 "scope" 获取到 row, column, $index, 和 store(table 内部的状态管理) 的数据

```jsx
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>   
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditArticle(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDeleteArticle(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

// 表格的假数据
const articleList = ref([
  {
    id: 5961,
    title: '新的文章1',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章2',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])
```

#### Element 组件中文化

**一. Element Plus 提供 ConfigProvider 组件用于全局配置本地化设置**

```vue
<script setup>
 import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<template>
  <!-- <h1>App</h1> -->
  <el-config-provider :locale="zhCn">
    <RouterView></RouterView>
  </el-config-provider>
</template>
<style scoped></style>
```

**二. Element Plus 提供全局配置选项**

```js
// main.js
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
  locale: zhCn,
})
```

### 封装分类选择组件

封装分类选择组件 ChannelSelect.vue 组件

新建 src/Article/components/channelSelect.vue

```vue
<template>
  <el-select>
    <el-option label="新闻" value="新闻"></el-option>
    <el-option label="体育" value="体育"></el-option>
  </el-select>
</template>
```

articleManage.vue 页面导入 channelSelect 组件

```jsx
import ChannelSelect from './components/ChannelSelect.vue'

<el-form-item label="文章分类：">
  <channel-select></channel-select>
</el-form-item>
```

调用获取文章分类接口，动态渲染下拉分类数据

```vue
<script setup>
import { articleGetChannels } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
const getChannelList = async () => {
  channelList.value = (await articleGetChannels()).data.data
}
getChannelList()
</script>
<template>
  <el-select>
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
```

父组件需要读取 channelSelect 组件选中的值，通过 v-model 语法进行绑定

```vue
// 表单数据
const modelValue = ref('')
<channelSelect v-model="modelValue"></channelSelect>
```

**一. 子组件通过 prop 和 emit 接收数据**

Vue3 中的 v-model => :modelValue 和 @update:modelValue

所以子组件中

​	需要接收的是 modelValue

​	需要返回的 emit 为 "updata:modelValue"

```vue
 defineProps({
   modelValue: {
     type: [ String, Number ]
   }
 })
 const emit = defineEmits(['update:modelValue'])
 
 <el-select
 	:modelValue="modelValue" 
 	@update:modelValue="emit('update:modelValue', $event)"
 >
```

**二. 子组件通过 defineModel 接收数据**

```js
const modelValue = defineModel({
  type: [String, Number]
})
<el-select v-model="modelValue">
```

配置表单参数

绑定分类 id ，以及状态参数

```
const params = () => {
	pagenum: '',
	pagesize: '',
	cate_id: '',
	state: ''
}
```

### 文章列表获取与渲染

封装获取文章列表的接口

1. 接口类型为 Get
2. 接收 query 形式，参数：*pagenum / *pagesize / cate_id / state

```js
// 获取文章列表的接口
export const articleGetList = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
```

获取数据

```js
// 表格的数据
const articleList = ref([])
// 总共获取几条数据
const total = ref()
// 获取表格数据
const getArticleList = () => {
  articleGetList(params.value).then((res) => {
    articleList.value = res.data.data
    articleList.value.forEach(item => item.pub_date = formatDate(item.pub_date))
    total.value = res.data.total
    loading.value = false
  })
}
getArticleList()
```

渲染数据

```vue
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" underline="never">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
```

#### 封装时间格式化工具

发布时间为 Date，需要进行格式化

新建 utils/date.js

使用 Element Plus 的时间格式化组件

1. 导入 dayjs 函数
2. 使用 .format 格式化方法

```
import { dayjs} from 'element-plus'
export formatDate = (date) => {
	return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
}
```

#### Promise 异步语法

```js
// 标准语法
/* 
	onFulfilled：成功回调（最常用）
	onRejected：失败回调（一般更推荐用 .catch()）
*/
promise.then(onFulfilled, onRejected)
// 常用语法
promise
  .then((value) => {
    // value = resolve(...) 传出来的数据
  })
  .catch((err) => {
    // 失败
  })
  .finally(() => {
    // 不管成功失败都会执行
  })
```

**Array forEach 遍历**

```js
array.forEach( item => item.xx = xx)
```

#### 分页渲染[ Element Plus 分页]

使用 Element Plus 的 pagination 组件

```jsx
const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
})  
// 总共获取几条数据
const total = ref(0)
// 分页
const onSizeChange = (size) => {
  // 每页请求的数据发生变化
  params.value.pagesize = size
  // 当 pagesize 数据发生变化，当前页面的数据不会对齐，所以可以直接回到第一页
  params.value.pagenum = 1
  // 重新根据新的参数获取文章列表
  getArticleList()
}
const onCurrentChange = (page) => {
  // 请求的页数发生变化
  params.value.pagenum = page
  getArticleList()
}
<!-- 分页区域 -->
<el-pagination
  v-model:current-page="params.pagenum"
  v-model:page-size="params.pagesize"
  :page-sizes="[2,3,5,7]"
  layout="jumper, total, sizes, prev, pager, next"
  background
  :total="total"
  @size-change="onSizeChange"
  @current-change="onCurrentChange"
  style="margin-top: 20px; justify-content: flex-end;"
>
</el-pagination>
```

搜索和重置功能

1. 为搜索和重置按钮注册点击事件
2. 绑定事件以及处理逻辑

```vue
<script>
// 表单的搜索和重置
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
</script>
<el-button type="primary" @click="onSearch">搜索</el-button>
<el-button @click="onReset">重置</el-button>
```

### 文章发布和编辑的抽屉

使用 Element Plus 的抽屉 el-drawer 组件

基础用法

1. 如何控制 Drawer 的显隐？

答： 为el-drawer 设置 v-model 属性来控制显隐

2. title 属性设置标题，:direction 属性控制抽屉方向 ltr、rtl、ttb、btt ，:before-close 属性关闭前需要处理的逻辑

```vue
<script>
  import { ref } from 'vue'
  const visibleDrawer = ref(false)
</script>
<el-drawer
	v-model="visibleDrawer"
	title="我是标题"
	:direction="rtl"
	:before-close="handleClose"
>
</el-drawer>
```

#### 封装抽屉组件

添加和编辑共用一个抽屉，类似 dialog 组件

新建 article/components/ArticleEdit.vue

使用组件 defineExpose 的方法 open，区分添加/编辑操作

open({})    => 添加

open(obj)  => 编辑

> [!NOTE]
>
> open 思想的本质是把子组件当成一个“弹窗服务”，父组件发命令，子组件处理细节
>
> open() 替代方案 v-model + props （声明式）
>
> 1. 声明式（ v-model ）
>
> 父组件说“你现在应该显示/隐藏” model 是 添加/编辑， 数据是 xxx
>
> 2. 命令式（ open() ）
>
> 父组件说“帮我打开编辑器，并带上这份数据”，其余逻辑在子组件实现



```vue
<script setup>
import { ref } from 'vue'
// 抽屉组件
const visibleDrawer = ref(false)
// 组件暴露 open 方法
const open = (obj) => {
  visibleDrawer.value = true
  console.log(obj)
}
defineExpose({
  open
})
</script>
<template>
  <!-- 抽屉组件 -->
  <el-drawer
    v-model="visibleDrawer"
    title="我是抽屉组件"
    direction="ltr"
  >
    <span>我是内容</span>
  </el-drawer>
</template>
```

articleManage 父组件导入

1. 导入 articleEdit 组件
2. 为添加和编辑按钮注册点击事件

```js
import articleEdit from './components/articleEdit.vue'
// articleEdit 组件的 ref 对象
const articleEditRef = ref()
// 表格的添加操作
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 表格编辑操作
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
  // console.log(row)
}
```

#### 完善抽屉组件表单结构

使用 Element Plus 的 el-form 组件完成表单的快速搭建

```vue
<!-- 抽屉组件 -->
<el-drawer
  v-model="visibleDrawer"
  :title="formData.id ? '编辑文章' : '添加文章'"
  direction="ltr"
  size="50%"
>
  <!-- 表单内容 -->
  <el-form :model="formData">
    <el-form-item label="文章标题" prop="title">
      <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="文章分类">
      <channelSelect v-model="formData.cate_id" width="100%"></channelSelect>
    </el-form-item>
    <el-form-item label="文章封面">文件上传</el-form-item>
    <el-form-item label="文章内容">
      <div class="editor">富文本编辑器</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">发布</el-button>
      <el-button type="info">草稿</el-button>
    </el-form-item>
  </el-form>
</el-drawer>
```

创建表单数据

```js
// 表单数据
// 默认表单数据
const defaultFormDate = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
const formData = ref({
  ...defaultFormDate.value
})
```

区分添加和编辑

```js
// 组件暴露 open 方法
const open = (obj) => {
  visibleDrawer.value = true
  console.log(obj)
  if(obj.id) {
    // 编辑操作
    formData.value = { ...obj }
    console.log('编辑操作')
  }
  else {
    // 添加操作
    formData.value = { ...defaultFormDate.value}
    console.log('添加操作')
  }
}
```

> [!NOTE]
>
> ​	{ ...obj } 展开运算符 是 整个对象替换，而不是“在原有对象上补字段”，所以 formData 之前的字段 { cate_id, cover_img, ... } 如果 obj 里面没有，就会被替换掉
>
> ```js
> // 如需保留默认字段，再覆盖已有数据
> formData = { ...defaultFormData.value, ...obj }
> // 如只改传入的字段，其他保留当前值
> Object.assign(formData.value, obj)
> ```

#### 文件上传[ Element Plus - 文件预览 ]

使用了 el-upload 组件

基础用法

1. :auto-upload 关闭自动上传
2. :show-file-list 显示上传列表
3. :on-change 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用

```vue
<el-upload
  class="avatar-uploader"
  :auto-upload="false"
  :show-file-list="true"
  :on-change="onUploadFile"
>
  <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="这是一张图片">
  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
</el-upload>
```

准备图片数据和图片的处理逻辑

```js
// 图片数据 File 对象
const imgUrl = ref('')
// 文件变动后的处理逻辑
// 通过 URL.createObjectURL() 语法生成临时的 blob 对象以供预览
const onUploadFile = (uploadFile) => {
	imgUrl.value = URL.createObjectURL(uploadFile.raw)
}
```

> [!NOTE]
>
> 通过 URL.createObjectURL(uploadFile.raw) 生成的是浏览器内存里的“临时引用”
>
> 1. 它不是公网/本地磁盘真实的 URL
> 2. 只在当前页面上下文有效，页面刷新、关闭、对象被释放后就失效
> 3. 仅作本地预览

样式美化

```scss
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
```

> [!CAUTION] 
>
> 这个文件上传使用的是封装的，需要了解一下文件如何上传，File 对象是什么？不使用组件，如何用 js 实现？

#### 富文本编辑器

使用 VueQuill 组件

文档： [VueQuill | Rich Text Editor Component for Vue 3](https://vueup.github.io/vue-quill/)

安装：

1.  `npm i @vueup/vue-quill@latest --save`
2. `yarn add @vueup/vue-quill@latest`

在 articleEdit 组件中注册 vue-quill 组件以及样式

```js
// 注册 Vue-quill 组件
import { QuillEditor } from '@vueup/vue-quill' 
// 导入 vue-quill 的样式
import '@vueup/vue-quill/dist/vue-quill.snow.css'
```

页面使用 QuillEditor 组件

```vue
<div class="editor">
  <!-- 使用 vue-quill -->
  <div class="editor">
    <QuillEditor
      theme="snow"
      v-model:content="formData.content"
      content-type="html"
    ></QuillEditor>
  </div>
</div>
```

修改样式

```css
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px
  }
}
```

#### 添加文章功能

封装发布文章的接口

```js
// 发布文章的接口 -> data 接收的参数为 application/form-data
export const articlePublish = (data) => {
  return request.post('/my/article/add', data)
}
```

为 articleEdit 组件发布和草稿按钮注册事件同时区分发布状态：'已发布'/'草稿'

```vue
<el-button @click="onPublish('已发布')" type="primary">发布</el-button>
<el-button @click="onPublish('草稿')" type="info">草稿</el-button>
```

对发布事件进行处理

1. formData 需要从 普通对象 转化为 FormData 对象
2. 当添加/编辑的时候走的接口不同需要区分
3. 添加成功后需要给父组件更新的信号

```js
// 发布文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formData.value.state = state
  // 将 formData 转化为 FormData 对象
  const fd = new FormData()
  for(let key in formData.value) {
    fd.append(key, formData.value[key])
  }
  if(formData.value.id) {
    // 编辑完成发布
  } 
  else {
    // 添加完成发布
    await articlePublish(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
```

父组件接收信号后获取文章列表重新渲染

1. 后端添加的数据在最后，并且返回的也在最后，所以需要渲染最后一页
2. 同时区分 添加/编辑

```js
// articleEdit 组件发布成功的回调
const onSuccess = (type) => {
  if(type === 'add') {
    // 添加
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
```

添加完成后需要进行表单的重置

方法

1. 在 articleEdit 组件打开的时候进行表单的重置
2. 在 发布后进行表单的重置

需要重置的数据： formData\ imgUrl\ quill-editor

```js
//  富文本编辑器对象
const editorRef = ref()
formData.value = { ...defaultFormData.value }
imgUrl.value = ''
editorRef.value = setHTML('')
```

> [!Warning]
>
> 控制台报错：" setHTML() " function is not defined
>
> 表示 ： 当前富文本编辑器没有渲染完成，DOM 还没有渲染好，所以没有办法找到 editorRef 组件，
>
> 解决： 使用 nextTick() 
>
> ​	nextTick(() => editorRef.value = setHTML(''))

#### 编辑文章数据回显

编辑操作许哟啊通过 id 查找文章详情做数据回显

封装接口，根据 id 查找详情

```js
// 获取文章详情的接口 get 请求 query 参数
export const articleGetDetail = (id) => {
  return request.get('/my/article/info', {
    params: { id }
  })
}
```

articleEdit 的 open 方法中在编辑的判断中调用接口获取数据

1. 接口返回的数据中 cover_img 非完整地址，需要与项目基地址拼接，才能正常展示图片
2. 富文本编辑器中的文本如若未显示，查看 content-type 属性 "html"

```js
  if (obj.id) {
    // 编辑操作
    // 需要通过获取文章详情来做数据回显
    const res = await articleGetDetail(obj.id)
    formData.value = res.data.data
    // 返回的 cover_img 是一个字符串不是完整的地址
    // 需要与 BaseUrl 进行拼接组成完整的地址
    imgUrl.value = baseURL + formData.value.cover_img
    console.log(formData.value)
    console.log('编辑操作')
  }
```

#### 编辑文章（更新）功能

封装编辑接口

```js
// 编辑文章（更新）接口 put 请求 Body 参数
export const articleEdit = (data) => {
  return request.put('my/article/info', data) 
}
```

当编辑文章完成需要提交的时候调用

1. **接口接收的数据类型为 application/form-data**
2. cover_img 是 File 对象，需要将网络图片转换为 File 对象，
   1. 当编辑回显图片的时候把网络图片转换为File对象
   2. 调用 imageUrlToFile(imgUrl.value, FileName)方法

```js
const imageUrlToFile = async (url, fileName) => {
  // 将网络图片转化为 File 对象
  try {
    // 1. 使用 axios 获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data
    // 2. 将图片数据转换为 Blob 对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })
    // 3. 创建一个新的 File 对象
    const file = new File([blob], fileName, { type: blob.type })
    // console.log(file)
    return file
  } catch (error) {
    ElMessage.error('图片转换错误')
    throw error
  }
}
```

```js
  if (formData.value.id) {
    // 编辑完成发布
    // console.log(fd.getAll())
    await articleEdit(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  }
```

#### 文章删除

1. 封装删除接口

```jsx
export const artDelService = (id) => request.delete('my/article/info', { params: { id } })
```

2. 页面中添加确认框调用

```jsx
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
```

## 个人中心页面

借助 AI 实现

Element Plus 表单 + 校验

Element Plus 用户头像 + 本地预览 + 用户当前头像显示

