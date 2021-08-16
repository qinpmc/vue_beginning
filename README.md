# Vue入门

vscode的帮助： ctrl+shift+p

 vue-property-decorator用法
 - https://www.jianshu.com/p/d8ed3aa76e9b


// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)，与上行代码等价
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')


 
- 1，	tslint.json 添加：
    "no-string-literal": false  解决类似  obj[“key”] 报错的问题

- 2，	src目录下增加 typings目录，typings目录下增加 vue-extend.d.ts文件，           
解决在vue原型上添加属性后（如Vue.prototype.Bus = new Vue();）编译报错的问题， vue-extend.d.ts内容为:
import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        readonly Bus: any;
    }
}
- 3，	window.xxx  改为 （window as any）.xxx解决编译错误
- 4，	tsconfig.json中 编译选项改为非严格模式
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
"strict": false,
…

- 5，	编译报错，不允许使用位运算，添加 // tslint:disable-next-line:no-bitwise 注释解决

    public newGuid() {
        const g = function () {
            // tslint:disable-next-line:no-bitwise
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g());
    }











