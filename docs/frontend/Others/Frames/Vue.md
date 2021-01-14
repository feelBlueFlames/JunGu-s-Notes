---
title: VUE框架
---

## 1 生命周期

![Vue生命周期](./img/Vue/lifecycle.png)

### 1.1 创建前后

- **beforeCreate**：在实例初始化之后，el 和 data 并未初始化（这个时期，this 变量还不能使用，在 data 下的数据，和 methods 下的方法，watcher 中的事件都不能获得到；）
- **created**：完成了 data 数据的初始化，el 没有（这个时候可以操作 vue 实例中的数据和各种方法，但是还不能对"dom"节点进行操作；）

### 1.2 挂载前后

- **beforeMount**：vue 实例的\$el 与 data 都初始化了，但还没挂载虚拟 Dom
- **mounted**：vue 实例挂载完成，和双向绑定,完成挂载 DOM 和渲染

### 1.3 更新前后

- **beforeUpdate**：data 变化后，触发钩子函数
- **updated**：数据更新后，完成虚拟 DOM 的重新渲染

### 1.4 销毁前后

- **beforeDestory**：在 vue 实例销毁前触发，一般在这里处理解除手动绑定的事件、定时器等
- **destoryed**：实例销毁后，触发钩子

## 2 父子组件传值

### 2.1 父向子传值--props

```js
//父组件 Parent
<template>
  <Child :value="value"/>
</template>
<script>
  export default {
    data(){
      return {
        value:"value"
      }
    }
  }
</script>

// 子组件 Child
<script>
 export default {
  props:{
    value:{
      type:String,
      required:true
    }
  }
 }
 </script>
```

### 2.2 子向父传值--\$emit

```js
//父组件 Parent
<Child @customEventName="handler"/>
 export default  {
  methods:{
    handler(value){
      console.log('子组件传过来的值',value)
    }
  }
}

// 子组件 Child
<button @click="$emit('customEventName','test')"></button>
```

### 2.3 父主动获取子数据

1.  **\$refs**
    ::: tip 用法
    this.$refs.组件名.方法 this.$refs.组件名.属性
    :::
2.  **\$children**
    ::: warning 缺点
    无法确定子组件的顺序，也不是响应式的
    :::

### 2.4 子主动获取父数据--\$parent

::: tip 用法
this.$parent.属性
this.$parent.方法
:::

### 2.4 inheritAttrs

> 这是@2.4 新增的属性和接口。inheritAttrs 属性控制子组件 html 属性上是否显示父组件的提供的属性。设置为 false,多余的属性就不会渲染到子组件的根元素上。

```js
//父组件 Parent
<template>
  <Child :value="value" :message="message"/>
</template>

<script>
  export default {
    data(){
      return {
        value:"value",
        message:"message"
      }
    }
  }
</script>

// 子组件 Child
<script>
 export default {
  inheritAttrs:false
  props:{
    value:{
      type:String,
      required:true
    }
  }
 }
 </script>
```

### 2.5 \$attrs

> 作用：可以获取到没有使用的注册属性，如果需要，可以通过`v-bind="$attrs"`方式往下继续传递。如上例中`$attrs={message:'message'}`。

### 2.6 provide/inject

> 当组件嵌套多层时传递数据

```js
// 父组件
<template>
  <Child/>
<template/>
<script>
  export default {
    name: "Parent",
    provide: {
      for: "demo"
    },
    components:{
      Child
    }
  }
 </script>

// 子组件-Child
<template>
  <Grandson/>
</template>


// 孙组件-Grandson
<template>
  <h1>{{demo}}</h1>
</template>

<script>
  export default {
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
 </script>
```

## 3 自定义指令

> 通过 Vue.directive() 来定义全局指令。[官网指令文档](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})
```

#### 钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置；
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)；
- `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前；
- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用；
- `unbind`：只调用一次，指令与元素解绑时调用。

## 4 Watch 与 Computed 区别

`Computed`：

1. 有缓存机制；
2. 不能接受参数；
3. 可以依赖其他 computed，甚至是其他组件的 data；
4. 不能与 data 中的属性重复。

`Watch`：

1. 可接受两个参数；
2. 监听时可触发一个回调；
3. 监听的属性必须是存在的；
4. 允许异步。

::: tip 总结
当有一些数据需要随着另外一些数据变化时，建议使用 computed
当有一个通用的响应数据变化的时候，要执行一些业务逻辑或异步操作的时候建议使用 watch
:::

## 5 路由钩子

### 5.1 全局导航守卫

**全局前置守卫**

```js
router.beforeEach((to, from, next) => {
  // do someting
})
```

**全局后置守卫**（没有 next 参数）

```js
router.afterEach((to, from) => {
  // do someting
})
```

**全局解析守卫**

> 2.5.0 新增

在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

### 5.2 路由独享守卫

```js
cont router = new  VueRouter({
 routes: [
  {
    path: '/file',
    component: File,
    beforeEnter: (to, from ,next) => {
       // do someting
    }
   }
 ]
});
```

### 5.3 组件内的导航钩子

> 组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。他们是直接在路由组件内部直接进行定义的

**beforeRouteEnter**

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

:::tip 提示
`beforeRouteEnter`不能获取组件实例 this，因为当守卫执行前，组件实例被没有被创建出来，我们可以通过给`next`传入一个回调来访问组件实例。在导航被确认时，会执行这个回调，这时就可以访问组件实例了。
仅仅是`beforRouteEnter`支持给`next`传递回调，其他两个并不支持，因为剩下两个钩子可以正常获取组件实例 this
:::

## 6 路由组件传参

### 6.1 params

```js
//传参
this.$router.push({
  name: 'detail',
  params: {
    name: 'xiaoming'
  }
})
//接受
this.$route.params.name
```

### 6.2 query

```js
//传参
this.$router.push({
  path: '/detail',
  query: {
    name: 'xiaoming'
  }
})
//接受
this.$route.query.id
```

### 6.3 params 与 query 区别

1. 携带`query`跳转 (path 和 name 的跳转都可以携带 query 参数) 。query 相当于 get 请求，请求参数都会显示在浏览器地址栏。

**路由**

```js
var router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    { name: 'register', path: '/register', component: register }
  ]
})
```

**导航**

```js
// 注意：这是 query 两种传参方式 一种是直接跳转把字符串传过去 一种是传描述目标位置的对象
<router-link to="/login?id=10&name=zs">登录</router-link>
<router-link :to="{path:'/register',query:{id:5,name:'lili'}}">注册</router-link>
<router-link :to="{name:'register',query:{id:5,name:'lili'}}">注册</router-link>

//等同于：
this.$router.push('/login?id=10&name=zs')
this.$router.push({path:'/register',query:{id:5,name:'lili'}})
this.$router.push({name:'register',query:{id:5,name:'lili'}})
```

2. 携带`params`跳转（只有 name 指定的跳转才可以携带 params）。params 相当于 post 请求，请求参数不会显示在地址栏，并且刷新页面后参数会消失。

**路由**

```js
var router = new VueRouter({
  routes: [
    // 这里不传入对应的参数（:/id/:name） 刷新页面 参数会消失,页面中就丢失了数据
    { path: '/login/:id/:name', component: login },
    { name: 'register', path: '/register/:id/:name', component: register }
  ]
})
```

**导航**

```js
// 注意：这是 params 两种传参方式 一种是直接跳转把字符串传过去 一种是传描述目标位置的对象
<router-link to="/login/12/ls">登录</router-link>
<router-link :to="{name:'register',params:{id:10,name:'lili'}}">注册</router-link>

//等同于：
this.$router.push('/login/12/ls')
this.$router.push({name:'register',params:{id:10,name:'lili'}})
```

## 7 $router与$route 区别

`$router`为 VueRouter 实例，想要导航到不同 URL，则使用\$router.push 方法；`$route` 为当前 router 跳转对象，里面可以获取 name、path、query、params 等

## 8 vue-router 原理

> vue-router 有两种模式，hash 模式和 history 模式

**hash 模式**

URL 的 hash 是以#开头，是基于`Location.hash`来实现的。`Location.hash`的值就是 URL 中#后面的内容。当 hash 改变时，页面不会因此刷新，浏览器也不会请求服务器。
同时，hash 改变时，并会出发相应的 hashchange 时间，所以，hash 很适合被用来做前端路由。当 hash 路由发生跳转，便会触发 hashchange 回掉，回掉里面就可以实现页面的更新操作，从而达到跳转页面的效果。

```js
window.onhashchange = function(event) {
  console.log(event.oldURL, event.newURL)
  let hash = location.hash.slice(1)
  document.body.style.color = hash
}
```

**history 模式**

> 主要是 HTML5 的 History API 为浏览器的全局 history 对象增加的扩展方法，分为切换和修改。

1. 切换历史状态，包括`back`,`forward`,`go`三个方法，对应浏览器的前进，后退，跳转操作。

```js
history.go(-2) //后退两次
history.go(2) //前进两次
history.back() //后退
hsitory.forward() //前进
```

2. 修改历史状态，包括了`pushState`,`replaceState`两个方法,这两个方法接收三个参数:stateObj,title,url。

**pushState**

需要三个参数：一个状态对象, 一个标题(目前被忽略), 和一个 URL

- state, 状态对象 state 是一个 JavaScript 对象，popstate 事件触发时，该对象会传入回调函数
- title, 目前所有浏览器忽略
- url, 新的 url 记录

**replaceState**

history.replaceState()的使用与 history.pushState()非常相似，区别在于 replaceState()是修改了当前的历史记录项而不是新建一个。

**onpopstate**

需要特别注意的是,调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，比如点击后退、前进按钮【或者调用 JS 中的 history.back()、history.forward()、history.go()】才会触发该事件。
如果当前处于激活状态的历史记录条目是由 history.pushState()方法创建，则 popstate 事件对象的 state 属性包含了这个历史记录条目的 state 对象的一个拷贝。

> 通过 pushstate 把页面的状态保存在 state 对象中，当页面的 url 再变回这个 url 时，可以通过 event.state 取到这个 state 对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到 state 的里面。

```js
history.pushState({color:'red'}, 'red', 'red'})
window.onpopstate = function(event){
  console.log(event.state)
  if(event.state && event.state.color === 'red'){
    document.body.style.color = 'red';
  }
}
history.back();
history.forward();
```

::: warning 缺点
1：hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如http://www.a12c.com,因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。

2：history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致。如http://www.a12c.com/book/a。如果后端缺少对/book/a 的路由处理，将返回 404 错误
:::
