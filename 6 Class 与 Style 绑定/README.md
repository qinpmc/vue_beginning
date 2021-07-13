## CSS 与Style

### 对象语法

``` 
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

和如下 data：

data: {
  isActive: true,
  hasError: true
}
```
 
结果渲染为：


``` 
<div class="static active text-danger"></div>
```

绑定的数据对象不必内联定义在模板里,以下和上面渲染结果一致：

```
<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': true
  }
}
```

### 数组语法

```
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```
<div class="active text-danger"></div>
```
数组语法 与 对象语法区别：

 - 对象语法中绑定的class名是数据中属性名   
 - 数组语法中绑定的class名是数据中属性值（class数组中是属性名） 
 - 测试发现：如果数组中值为 xxx-xxxxx,必须加引号，否则报错，而此时表明直接绑定为该类名(因为有引号，则表示直接是类名，，而不是vue的data中的值)
  即：数组中值不带引号，表明是变量，其值来自vue的data，而带引号，则表示直接引用该类名


 -在数组语法中也可以使用对象语法：
 
```
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

```


### 用在组件上

声明了组件：

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些 class：

```
<my-component class="baz boo"></my-component>
```


HTML 将被渲染为:

```
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

示例： style3.html



























