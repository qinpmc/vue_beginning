# Vue生命周期

### 参考：
1. https://segmentfault.com/a/1190000008010666?utm_source=tag-newest

###  生命周期初步理解
使用demo：生命周期1.html，查看控制台：

- beforecreated：el 和 data 并未初始化
- created:完成了 data 数据的初始化，el没有
- beforeMount：完成了 el 和 data 初始化 . 注意，此时挂载点仍为：

```
<div id="app">
    <p>{{ message }}</p>
</div>
```
这里应用的 Virtual DOM（虚拟Dom）技术，先把坑占住，到mounted挂载的时候再把值渲染进去。

- mounted ：完成挂载.
此时挂载点变为：

```
<div id="app">
    <p>haha is boy</p>
</div>
```
- beforeUpdate，updated
控制台输入： app.message= 'koko'，触发update，
beforeUpdate、updated函数执行（可查看控制台输出）

beforeUpdate函数中输出的 this.$el.innerHTML 为 <p>haha is boy</p>
updated函数中输出的 this.$el.innerHTML 为 <p>koko</p>

- beforeDestroy、destroyed
控制台输入： app.$destroy()，销毁vue实例。
beforeDestroy、destroyed 函数执行


再重新改变message的值，控制台输入 app.message= 'hhh',vue不再对此动作进行响应,但是原先生成的dom元素还存在.


额外调试1：

注释掉 //el: '#app', 会发现控制台只运行到created 就结束；
在控制台输入： app.$mount("app")，vue实例开始mount
beforeMount、mounted 函数执行
