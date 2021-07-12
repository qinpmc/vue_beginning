## 列表渲染

### v-for 把一个数组对应为一组元素
 
###  v-for 里使用对象

```
<div id="app">
    <!--遍历数组-->
    <ul id="ul_1" >
        <li v-for="item in ul_1">{{item}}</li>
    </ul>

    <!--遍历对象数组-->
    <ul id="ul_2" >
        <li v-for="item in ul_2">{{item.name}}</li>
    </ul>

    <!--index 索引从0开始-->
    <ul id="ul_22" >
        <li v-for="(item,index) in ul_2">{{item.name}} --{{ index}}</li>
    </ul>

    <!--用 v-for 通过一个对象的属性来迭代-->
    <ul id="ul_23" >
        注意：对象遍历默认显示的是value值，而非键
        <li v-for="value in object">
            {{ value }}
        </li>
    </ul>

    <ul id="ul_24" >

        <li v-for="(value,key,index ) in object">
            键：{{ key}} --- 值：{{ value }}---序号{{index}}
        </li>
    </ul>
</div>
```

```
var app = new Vue({
    el:"#app",
    data:{
        ul_1:[11,12,13],
        ul_2:[{name:"qq1"},{name:"qq2"}],
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    }
});

```
详见示例：指令6(v-for).html
 

### 数组更新检测
 
Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength

一、解决根据索引修改某项值：

第一种：Vue.set(vm.items, indexOfItem, newValue)
第二种：vm.items.splice(indexOfItem, 1, newValue)
第三种：vm.$set(vm.items, indexOfItem, newValue)

二、解决根据length修改数组：
为了解决第二类问题，你可以使用 splice：
vm.items.splice(newLength)



### 对象更新检测

由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
 - 1. Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性
 - 2. 还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名
```
var vm = new Vue({
    data: {
    a: 1
    }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的

```

### 在组件上使用 v-for


```
<my-component v-for="item in items" :key="item.id"></my-component>

..........
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>

```

v-for : 不能支持 div等的循环，会产生错误。