## 条件渲染

### v-show 与 v-if

 - v-show  不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。   
 - v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。   
 - 因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。  


### 切换多个元素(在 <template> 元素上使用 v-if 条件渲染分组)


v-if 是一个指令，所以必须将它添加到**一个元素上**。      
但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。        
最终的渲染结果将不包含 <template> 元素。   

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
 
### 用 key 管理可复用的元素
添加一个具有唯一值的 key 属性,不复用已有元素(如下例中 input不复用),如下：    
 <label> 元素仍然会被高效地复用，因为它们没有添加 key 属性。
 
```
<div id="app3">
    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
    </template>
 </div>

```
    




