## 数据与方法


当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”

```

// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3


```

## !! 添加一个新的 property，比如：

```
vm.b = 'hi'
```

那么对 b 的改动将不会触发任何视图的更新

解决------------- 如果后续需要使用某个属性，仅需要设置一些初始值。比如：
(唯一的例外是使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化)
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}



### Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 $
- vm.$data  ：Vue 实例观察的数据对象 app3.$data, this.$data
    
    
- vm.$el, this.$el
- vm.$watch
 
```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

```



 
    










