
# 深入组件



## 组件注册


### 全局注册
 
```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

### 局部注册

全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。


在一个假设的 ComponentB.js 或 ComponentB.vue 文件中，注册ComponentA 和 ComponentC，然后 都可以在 ComponentB 的模板中使用 

```
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```


### 组件名大小写
 

给予组件的名字可能依赖于你打算拿它来做什么。当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。


- 使用 kebab-case


```
Vue.component('my-component-name', { /* ... */ })
```



- 使用 PascalCase

```
Vue.component('MyComponentName', { /* ... */ })
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。
也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。
!! 注意，尽管如此，**直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的**(https://cn.vuejs.org/v2/guide/components-registration.html#%E7%BB%84%E4%BB%B6%E5%90%8D)。

示例： 组件名称大小写1.html




## Prop

### Prop 的大小写

当使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>


示例： 组件prop大小写2.html
       组件prop传值及参数校验2-2.html
       组件prop传值及参数校验2-3.html

### 传递静态或动态 Prop

给 prop 传入一个**静态**的值(title=)：

```
<blog-post title="My journey with Vue"></blog-post>
```

 通过 v-bind 给prop 动态赋值(v-bind:title)，例如：

```
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>
```


 数字、布尔值、数组、对象 即便是静态的，也应该使用动态方式v-bind:绑定赋值


```
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>
 

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

 
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

 
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>


```
!! **父组件传递给子组件的值，子组件接收后不能直接修改！！**
 
### 替换/合并已有的 Attribute
- https://cn.vuejs.org/v2/guide/components-props.html 

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：form-control date-picker-theme-dark。

## 自定义事件


### 事件名

不同于组件和 prop，事件名**不存在任何自动化的大小写转换**。而是触发的事件名需要完全匹配监听这个事件所用的名称,所以就没有理由使用 camelCase 或 PascalCase 了

并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。因此，**推荐始终使用 kebab-case 的事件名**




###  将原生事件绑定到组件

示例：11组件基础/组件开始-监听子组件事件4.html
示例： 组件绑定原生事件3.html


###  .sync 修饰符
示例： 组件监听子组件事件3_2.html

子组件 绑定click事件(@click="updateFontSize")，点击 后 执行子组件 updateFontSize 方法，  
该方法 为： this.$emit("update:font-size", 4);  
发生 "update:font-size" 事件， 其中 update: 为固定写法。    


父组件：<blog-post2 :font-size.sync="fontSize" ></blog-post2>，
点击子组件后  ，父组件通过 :font-size 绑定属性（对应传统的监听事件，@font-size），然后接收子组件的值（这里示例中为4），
父组件中data中的 fontSize 值更新为4 

```
// 子组件
Vue.component("blog-post2", {
        props: ["mes"], // 属性mes接收父组件传递的值
        template: `
        <div class="blog-post">
          <span>{{ mes.title }}</span>
          <button @click="updateFontSize">
            Enlarge text
          </button>
          <span v-html="mes.content"></span>
        </div>
        `,
        methods: {
          updateFontSize: function () {
            this.$emit("update:font-size", 4); // "update:fontSize" 会失效
            // v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。因此，**推荐始终使用 kebab-case 的事件名**
          },
        },
      });

// 父组件 dom
  <div id="app2" :style="{ fontSize: fontSize + 'em' }">
      <blog-post2
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:mes="post"
        :font-size.sync="fontSize"
      ></blog-post2>
    </div>


//父组件
      var app2 = new Vue({
        el: "#app2",
        data: {
          fontSize: 2,
          posts: [...],
        },
        methods: {},
        watch: {
          fontSize: {
            handler: function (newVal, oldVal) {
              console.log(newVal);
            },
          },
        },
      });

```



##  插槽

### 插槽内容

- 插槽内可以包含任何模板代码，包括 HTML 
- 甚至其它的组件 
- <slot></slot> 放在 子组件 中

示例：插槽4.html

```
// 子组件 <navigation-link> 的模板（slot 插槽放在子组件中） ：

<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>

// 父组件使用：

<navigation-link url="/profile">
  <!-- 添加一个 Font Awesome 图标 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>

```

### 编译作用域

- 父组件中不能使用子组件data中的数据 
- 子组件也不能直接使用父组件的数据[可以使用父子组件通信间接使用] 

(https://www.jianshu.com/p/3780035f2a79)



### 具名插槽
需要多个插槽可以使用具名插槽
 - <slot> 元素有一个特殊的 attribute：name。这个 attribute 可以用来定义额外的插槽
 - 向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称
 - 任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容
 

子组件<base-layout>：使用name="XXX" 为插槽命名

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件使用：一个**<template>元素**上使用 v-slot 指令

```
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 作用域插槽

- 插槽内容能够访问子组件中才有的数据

子组件中： 将data中的user绑定 <slot v-bind:user="user">
```
template: `<span>
          <slot v-bind:user="user">{{ user.lastName }}</slot>
          </span>`,

data: function () {
          return {
            user: {
              lastName: "pp",
              firstName: "qq",
            },
          };         

```

父组件中： <template v-slot="anyName">  v-slot="xxxx", "xxxx" 可以为任意名，此文简写写法

或者 完整写法：
<template v-slot:default="slotProps">

```
<current-user1>
    <template v-slot="anyName">
        {{ anyName.user.firstName }}
    </template>
</current-user1>


```










































# 组件注意事项：

1. table 中包括自定义组件，但是table，ul等元素中必须是指定的元素，如tr、td、li等     
    直接把组件放到table中，渲染的组件跑到table外部，使用is 属性解决，如：  
  <tr is="row" ></tr>

2. 子组件的data 必须是函数形式定义，不能直接定义成对象，如

```
    data:{
        content: "这是row组件"
    }
    替代为：
 
    data: function(){
        return {
            content: "这是row组件"
        }
    } 
 

```

3. Vue不推荐直接操作Dom元素，但在必须使用Dom的时候，可以通过$refs找到Dom元素

```
<counter @increase="handleIncrease()" ref="counter1"> </counter>  

console.log(this.$refs.counter1); // 获取到子组件
console.log(this.$refs.counter1.number);

```

4. 父子组件之间的传值，父组件向子组件传值用 props，子组件不能修改父组件传递的值(会引起数据的混乱)
子组件向父组件传值，使用$emit();

另外注意区别：
<child :content="123"></child>  向content属性传值为 数字123

<child content="123"></child>  向content属性传值为 字符串 '123'，这种形式下，传递的都是字符串


5. 非 Prop 的特性


一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。此时 该prop会显示在dom 元素的特性上
<div content="nice to meet you">child1</div>


如果，子组件定义了利用 props 来接收父组件传递的值，此时称为Prop  特性，此时该prop 不会显示在dom 元素的特性上
<div >child1 nice to meet you</div>





6. 具名插槽

```
    Vue 2.6 以后
    <shop>
            <template v-slot:shoes></template>
            
    </shop>


    Vue 2.6 以前
    <shop>
            <li slot="shoes"></li>
            
    </shop>


    Vue.component('shop', {
        template: `
            <div>
                <h3> 模板里东西</h3>
                <ul>
                    <li>模板里的鞋子</li>
                    <slot name='shoes' > 各种各样的鞋子</slot>
                </ul>
            </div>
        `
    })

```

7. 作用域插槽


插槽内容能够访问子组件中才有的数据是很有用的

```
/*  下列代码中
 :sonUser="user" 
 :sonUser2="user"

是将子组件的user 数据 绑定到了 sonUser 和sonUser2 属性上。


*/

 Vue.component('current-user', {
        template: `
            <div>
                <span>
                    <div> 组件urrent-user 的内容 </div>
                    <slot :sonUser="user">
                        {{ user.lastName }}
                    </slot>
                    <slot :sonUser2="user" name="other">
                        {{ user.firstName }}
                    </slot>
                </span>
            </div>
        `,

/* 父组件使用时，利用
v-slot:default="slotProps" ----默认的插槽
v-slot:other="slotProps"  -----具名的插槽other

表示 slotProps 接收子组件插槽中绑定的数据（user），使用方式为：
slotProps.sonUser 和  slotProps.sonUser2

*/

<div id="app">
        <current-user>
            <template v-slot:default="slotProps">
                {{ slotProps.sonUser.lastName }}
                <br>
            </template>
            
            <template v-slot:other="slotProps">
                    {{ slotProps.sonUser2.firstName }}
            </template>
        </current-user>
</div>

```

8. 动态组件
可以使用 v-once 优化性能      
v-once ：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。  


9. 组件注册

1）组件名


- 使用 kebab-case(短横线分隔命名)：   

```
Vue.component('my-component-name', { /* ... */ })

<my-component-name> 是可接受的。


```

- 使用 PascalCase(首字母大写命名) ：  

```
Vue.component('MyComponentName', { /* ... */ })

<my-component-name> 和 <MyComponentName> 都是可接受的。

```

2）全局注册 和 局部注册

全局注册： 

```
Vue.component('my-component-name', {
  // ... 选项 ...
})

```

 
全局注册在注册之后可以用在**任何**新创建的 Vue 根实例 (new Vue) 的模板中。


局部注册：   

```
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})

```


局部注册的组件在其**子组件中不可用**。例如，如果你希望 ComponentA 在 ComponentB 中可用，则你需要这样写：

```
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}


```


10. Prop 的大小写 (camelCase vs kebab-case)
HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。   <br>
这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名

```
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})

<!-- 在 HTML 中是 kebab-case 的 ,这里是将组件在父组件中使用  -->
<blog-post post-title="hello!"></blog-post>
```


11. 自定义事件

camelCased (驼峰式): myMessage
PascalCase(帕斯卡式) :  WinterOfDiscontent
kebab-case(短横线隔开式) ： post-title

不同于组件和 prop，**事件名不存在任何自动化的大小写转换**

推荐你始终使用 kebab-case 的事件名：

v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到




11. 自定义事件--监听原生事件

```
子组件绑定事件，@click，如果子组件不用$emit("click") 发射出去，点击（click）没有反应----因为这里认为监听的是子组件发射的click自定义事件。
<child1 content="点我没反应" @click="handleClick"></child1>
<hr>
为避免 用$emit("click") 发射出去 造成的过于麻烦，直接使用@click.native 即可。   
<child1 content="点我有反应" @click.native="handleClick"></child1>

```




