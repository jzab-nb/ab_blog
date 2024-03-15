---
id: vue3+element-plus
slug: /vue3+element-plus
title: vue3+element-plus创建流程
date: 2024-03-14
tags: [前端,教程]
keywords: [前端,教程]
---
提示：此处的创建为使用vite的方式

## 一、创建项目

```cmd
npm create vue@latest
```

使用如下命令启动项目

```cmd
npm run dev
```

修改vite.config.ts文件可以更换启动端口

```typescript
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{port: 8081}
})
```

## 二、下载element-plus

```cmd
cnpm install element-plus --save
```

导入element-plus

```typescript
import ElementPlus from 'element-plus' // 导入js
import 'element-plus/dist/index.css' // 导入css
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus) // 使用ElementPlus
app.mount('#app')
```

## 三、书写请求工具类

需要提前下载axios

```cmd
cnpm install axios
```

utils/request.js

```js
import axios from 'axios'
import { ElMessage } from 'element-plus'

/**
 * axios的传参方式：
 * 1.url 传参 一般用于Get和Delete 实现方式：config.params={JSON}
 * 2.body传参 实现方式：config.data = {JSON}，且请求头为：headers: { 'Content-Type': 'application/json;charset=UTF-8' }
 * 3.表单传参 实现方式：config.data = qs.stringify({JSON})，且请求头为：且请求头为：headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
 */
const LOCAL_URL = "http://localhost:8080/api"
const CLOUD_URL = "http://39.106.58.236:8080/api"
// axios实例
const service = axios.create({
    baseURL: LOCAL_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['token'] = sessionStorage.getItem("token");
        config.headers['random'] = Math.floor(Math.random()*1000);
        config.headers['timeStamp'] = new Date().getTime();
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText || 'Error'))
        }

        const res = response.data
        // 响应成功 TODO 这里要填上业务成功的状态码
        if (res.code === 0) {
            return res
        }

        // 错误提示
        ElMessage.error(res.message)

        return Promise.reject(new Error(res.message || 'Error'))
    },
    error => {
        ElMessage.error(error.message)
        return Promise.reject(error)
    }
)

// 导出 axios 实例
export default service
```

