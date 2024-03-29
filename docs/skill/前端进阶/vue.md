---
id: vue
slug: /skill/前端进阶/vue
title: vue
keywords:
  - 笔记
---
# VUE

## 前端简介

vue是一个渐进式框架， 核心库只关注视图层（HTML+CSS+js），遵循SOC原则(关注点分离)

网络通信: axios

视图跳转: vue-router

状态管理: vuex

vue-UI: ice，elementUI

css预处理器: SASS(基于Ruby)，LESS(基于node.js)

js框架:

- Jquery，优点是简化了dom操作，缺点是dom操作太多，影响性能
- angular，java工程师开发的框架，将后端的MVC思想搬到了前端（MVCC），使用TS开发
- React，脸书推出的，有虚拟dom的概念，缺点是需要学习jsx语言
- vue，有模块化和虚拟dom
- axios，前端通信框架

UI框架：

- Ant-Design：阿里巴巴推出的，基于React
- ElementUI，iview，ice：饿了么出品，基于vue的
- BootStrap：推特推出的开源工具包
- AmazeUI：跨屏的前端框架

构建工具：

- Babel：编译es6，ts
- webpack：模块打包

## vue入门

### MVVM

M（Model）：模型层，这里指js对象

V（View）：视图层

VM（ViewModel）：连接模型和视图的中间件，可以监听到数据的变化刷新到视图上，也可以监听视图的变化刷新到数据上

### 第一个VUE程序

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>第一个VUE程序</title>
</head>
<body>
    <h1 id="app">
        // 取出数据值
        {{message2}} + {{message}}
    </h1>
    // 导入vue
    <script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
    <script>
        // new出一个vue对象
        let app = new Vue({
            // 指定元素
            el: "#app",
            // 数据值
            data:{
                message: "Hello, vue!",
                message2: "Hello, vue2!"
            }
        });
    </script>
</body>
</html>
```

### vue指令

带v-开头的都是vue的指令

#### V-bind

```
// 在html标签中，使用v-bind:属性 = “data名”可以对标签的属性进行动态绑定
v-bind:value="msg"
```

#### v-if

根据数据的值判断是否显示某个标签

```
<span v-if="bool">Yes</span>
<span v-else>No</span>
// 可以多条件判断
<h1 v-if="c==='A'">AAA</h1>
<h1 v-else-if="c==='B'">BBB</h1>
<h1 v-else-if="c==='C'">CCC</h1>
<h1 v-else>啥也不给</h1>
```

#### v-for

items是一个数组

```
<div v-for="item in items">
    <span>{{item}}</span>,
</div>
// 带下标
<div v-for="(item,index) in items">
    <span>{{item}}-{{index}}</span>,
</div>
```

#### v-on

用于绑定事件，先在vue对象中定义methods，然后在标签上使用 v-on:事件="方法名"来指定

```html
<span v-on:click="add">{{item}}-{{index}}</span>

methods: {
    add(event){
        console.log("aaa");
    }
}
```

#### v-model

用于双向绑定，在一些input标签中动态接收输入的值

```html
<form id="app">
    <label for="username">输入内容: {{username}}</label>
    <hr/>
    <input v-model="username" name="username" id="username">
</form>

<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script>
    let app = new Vue({
        el: "#app",
        data: {
            username:null
        }
    });
</script>
```

### vue组件

组件就是一套可复用的vue模板

```
<div id="app">
 // 将外部的msg传给内部的imsg
    <jzab v-bind:imsg="msg"></jzab>
</div>

<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script>
 // 定义组件
    Vue.component("jzab",{
     // 接收外部传入的参数
        props: ["imsg"],
        template: `
            <div>
             // 使用外部传入的参数
                <h1>你好,{{imsg}}</h1>
                <h2>你好,UML</h2>
            </div>
        `
    });
    
    let app = new Vue({
        el: "#app",
        data: {
            msg: "数据1"
        }
    });
</script>
```

### axios

```
// 从cdn导入包
<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
    let app = new Vue({
        el: "#app",
        // 渲染前进行获取
        mounted(){
         // get请求
            axios.get("data.json").then(response=>{
             // 回调函数
                console.log(response);
                this.msg = response.data;
            });
        },
        data: {
            msg: ""
        }
    });
</script>
```

### 计算属性

计算出来的结果保存在属性中，内存中运行，使用虚拟dom

与方法不同，调用方法每次都需要计算，计算属性内部使用的其他属性不更新时，无需重新计算

```html
<div id="app">
    <p>1: {{time1()}}</p>
    <p>2: {{time2}}</p>
</div>

<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script>
    let app = new Vue({
        el: "#app",
        methods: {
            time1(){
                return Date.now();
            }
        },
        computed: {
            time2(){
                return Date.now();
            }
        }
    });
</script>
```

### 插槽

在页面上留一个口方便插入元素

```html
<div id="app">
    // 父组件内部套子组件,子组件指定使用的插槽并传参
    <todo>
        <todo-title slot="s1" :title="title"></todo-title>
        <todo-item slot="s2" v-for="item in items" :item="item"></todo-item>
    </todo>
</div>


<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script>
    // 定义父组件,内部有两个插槽,名字分别为s1,s2
    Vue.component("todo",{
        template: `
            <div>
                <slot name="s1"></slot>
                <ul>
                    <slot name="s2"></slot>
                </ul>
            </div>
        `
    });
 
    // 标题子组件
    Vue.component("todo-title",{
        props: ['title'],
        template: `<h1>{{title}}</h1>`
    });

    // 列表项子组件
    Vue.component("todo-item",{
        props: ['item'],
        template: `<li>{{item}}</li>`
    });

    let app = new Vue({
        el: "#app",
        data: {
            title: "标题五个字",
            items: ['你好','中国','世界','万岁']
        }
    });
</script>
```

### 自定义事件

```html
<todo>
    <todo-title slot="s1" :title="title"></todo-title>
    // 定义事件remove发生时调用vue的remove函数
    <todo-item slot="s2" v-for="(item,index) in items" :item="item" :index="index" @remove="remove"></todo-item>
</todo>

Vue.component("todo-item",{
    props: ['item','index'],
 // 点击删除按钮调用下面的函数
    template: `<li>{{index}}--{{item}}<button @click="show">删除</button></li>`,
    methods: {
  // 函数内产生remove事件,把this的index属性传递过去
        show(){
         this.$emit("remove",this.index);
        }
    }
});

let app = new Vue({
    el: "#app",
    data: {
        title: "标题五个字",
        items: ['你好','中国','世界','万岁']
    },
    methods: {
  // 接收传进来的下标,进行删除操作
        remove(index){
            console.log(index);
            this.items.splice(index,1);
        }
    }
});
```

## vue-cli

安装vue-cli

```shell
cnpm install vue-cli -g
```

列出所有的模板

```shell
vue list
```

从模板创建项目

```shell
vue init webpack vue01
```

进入项目目录并安装npm的依赖

```shell
cd vue01
npm install
```

运行启动

```shell
npm run dev
```

### vue-router

安装

```shell
cnpm install vue-router --save-dev
```

创建组件在components文件夹下

```
<template>
  <h1>子页面</h1>
</template>

<script>
export default {
  name: "cone"
}
</script>

<style scoped>

</style>
```

在router/index.js里面进行配置

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import mains from '@/components/mains'
import cone from '@/components/cone'

// 安装路由
Vue.use(VueRouter)

// 路由的配置
export default new VueRouter({
  // 路由表
  routes: [
    {
      // 路径
      path: '/content',
      // 名称
      name: 'cone',
      // 组件
      component: cone
    },
    {
      // 路径
      path: '/',
      // 名称
      name: 'mains',
      // 组件
      component: mains
    }
  ]
})
```

在App.vue中进行使用

```
<template>
  <div id="app">
<!--    <mains></mains>-->
<!--    <cone></cone>-->
 <!-- router-view表示要显示子组件的位置 -->
    <router-view/>
    <router-link to="/">首页</router-link>
    <router-link to="/content">子页面</router-link>

  </div>
</template>

<script>
import cone from "./components/cone";
import mains from "./components/mains";
export default {
  name: 'App',
  components: {cone,mains}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

#### 路由嵌套

在一个大的路由里面配置子路由，

```javascript
{
    // 路径
    path: '/',
    // 名称
    name: 'main',
    // 组件
    component: Main,
    children: [
        {path:'/user/',component: UserList},
        {path:'/user/info',component: UserInfo}
    ]
}
```

在大组件的内部配置子组件的跳转

```html
<template>
  <div>
    <h1>首页</h1>
    <router-link to="/user/">用户列表</router-link>
    <router-link to="/user/info">用户详情</router-link>
    <router-view/>
  </div>
</template>
```

#### 路由传参

先在组件中定义传参

```html
<router-link :to="{name:'info', params:{id:1}}">用户详情</router-link>
```

路由中配置参数和路由名，若开启props为true，则可以直接使用使用参数名展示

```js
{path:'/user/info/:id',name:"info", component: UserInfo, props: true}
```

另一个组件中展示参数

```html
<template>
  <h1>用户详情 {{$route.params.id}}{{id}}</h1>
</template>

<script>
export default {
  props: ["id"],
  name: "UserInfo"
}
</script>
```

#### 重定向

在路由中进行配置即可

```js
{
  path: '/home',
  redirect: '/'
}
```

#### 路由模式

将路由模式设置成history可以去除url中的#

```js
export default new VueRouter({
  mode: "history",
  ...})
```

#### 404页面配置

```
{
  path: '*',
  component: NotFound
}
```

#### 路由钩子

```
beforeRouteEnter:(to,from,next)=>{
  console.log(from);
  console.log(to);
  alert("进入路由之前");
  next();
},
beforeRouteLeave:(to,from,next)=>{
  console.log(from);
  console.log(to);
  alert("离开路由之前");
  next();
}

next() 进入下一页面
next('/path') 进入指定路由
next(false) 返回原来的页面
next((vm)=>{})仅在beforeRouteEnter中可以用,vm是组件实例
```

### axios

安装

```shell
cnpm install axios -S
```

配置在main.js中

```js
import axios from 'axios'
Vue.prototype.$axios = axios
```

使用

```js
beforeRouteEnter:(to,from,next)=>{
  console.log(from);
  console.log(to);
  // alert("进入路由之前");
  next((vm)=>{
    vm.getData();
    console.log(vm);
  });
},
beforeRouteLeave:(to,from,next)=>{
  console.log(from);
  console.log(to);
  // alert("离开路由之前");
  next();
},
methods:{
  getData: function (){
    this.$axios.get("/static/data.json").then((response)=>{
      console.log(response.data);
    });
  }
}
```

## element-UI

初始化

```shell
# 创建vue项目
vue init webpack vue02
cd vue02
# 安装vue-router
cnpm install vue-router@3.5.2 --save-dev
# 安装element-ui
cnpm install element-ui -S
# 安装依赖
cnpm install 
#安装sass加载器
cnpm install sass-loader node-sass
# 启动测试
npm run dev
```

### 在main.js中配置

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'

// 引入elementUI和他的css文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Router)
// 使用elementUI
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  // 配置elementUI
  render: h => h(App)
})
```
