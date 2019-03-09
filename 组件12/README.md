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




