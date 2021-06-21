# Vue 生命周期

### 参考：

- 参考 1 https://segmentfault.com/a/1190000008010666?utm_source=tag-newest
- 参考 2 https://blog.csdn.net/weixin_44954172/article/details/101321283

### 生命周期初步理解

![lifecycle](./lifecycle.png)

使用 demo：生命周期 1.html，查看控制台：

- beforecreated：el 和 data 并未初始化。 参考 2： 创建之前不能获取 data 中的变量值，这样我们可以让 loading 显示或者检测页面授权。
- created:完成了 data 数据的初始化，el 没有。 参考 2：创建之后可以获取 data 中的变量，因此我们可以在这里发送 http 请求接口，从后端拿到数据，然后同步到页面中去
- beforeMount：完成了 el 和 data 初始化 . 注意，此时挂载点仍为：

```
<div id="app">
    <p>{{ message }}</p>
</div>
```

这里应用的 Virtual DOM（虚拟 Dom）技术，先把坑占住，到 mounted 挂载的时候再把值渲染进去。

参考 2：模板中的插值{{name}}或者一些指令 v-for、v-text 等还没有被解析出来（替换），所以如果生成的是一个 html 代码，那么你无法获取这个 dom 对象

- mounted ：完成挂载.
  此时挂载点变为：

```
<div id="app">
    <p>haha is boy</p>
</div>
```

参考 2：如果你的节点是动态添加的，那么你至少要在挂载之后才能获取的到。所以此钩子通常用于 dom 操作

- beforeUpdate，updated
  控制台输入： app.message= 'koko'，触发 update，
  beforeUpdate、updated 函数执行（可查看控制台输出）

beforeUpdate 函数中输出的 this.$el.innerHTML 为 <p>haha is boy</p>
updated函数中输出的 this.$el.innerHTML 为 <p>koko</p>

- beforeDestroy、destroyed
  控制台输入： app.$destroy()，销毁 vue 实例。
  beforeDestroy、destroyed 函数执行

再重新改变 message 的值，控制台输入 app.message= 'hhh',vue 不再对此动作进行响应,但是原先生成的 dom 元素还存在.

额外调试 1：

注释掉 //el: '#app', 会发现控制台只运行到 created 就结束；
在控制台输入： app.$mount("app")，vue 实例开始 mount
beforeMount、mounted 函数执行

## 模板优先级

render 函数选项 > template 选项 > outer HTML.
