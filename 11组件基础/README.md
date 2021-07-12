#  组件
 
 
## 组件data

data **必须是一个函数**（https://cn.vuejs.org/v2/guide/components.html），并不是直接提供一个对象。

```
data: function () {
  return {
    count: 0
  }
}

/*
data: {
  count: 0
}
*/

```


示例：组件开始1.html


## 向子组件传递数据
组件通过 Prop 向子组件传递数据。

示例：组件开始-父组件传值子组件2.html



## 单个根元素
组件必须只有单个根元素。
示例：组件(根元素)3.html



## 监听子组件事件

示例：组件开始-监听子组件事件4.html


##  在组件上使用 v-model
示例：组件(v-model)5.html

  

## 插槽 

### 插槽内容
 
插槽内可以包含任何模板代码，包括 **HTML** ，甚至**其它的组件**。

示例：组件(插槽)6.html


## 动态组件
示例：组件(动态组件)7.html

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里,
可以通过 Vue 的** <component> 元素** 加一个特殊的 is attribute 来实现：

<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>

currentTabComponent 可以包括：

- 已注册组件的名字，或
- 一个组件的**选项对象**

示例：组件(动态组件2)7_2.html  -- 组件的**选项对象**

 

##  解析 DOM 模板时的注意事项

示例：组件8-解析DOM.html


























