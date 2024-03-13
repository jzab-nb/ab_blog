---
id: vue3
slug: /vue3
title: vue3创建流程
date: 2024-03-13
tags: [前端,教程]
keywords: [前端,教程]
---
## 一、安装

### 1.安装node

推荐使用nvm来安装，可以灵活切换node版本

### 2.安装vue

```cmd
npm install -g @vue/cli
```

### 3.安装淘宝镜像

```shell
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

### 4.查看vue版本

```shell
vue --version
```

## 二、命令行创建

```shell
vue create 项目名
```

选择vue3进行创建，创建完毕后进入文件夹，输入如下命令启动

```cmd
npm run serve
```

若想修改启动的端口号，可以修改根目录下的vue.config.js

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 加入这一行指定端口
  devServer:{ port: 3000}
})
```

