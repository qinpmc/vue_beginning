## 模板语法

在底层的实现上，Vue 将模板编译成**虚拟 DOM 渲染函数**。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。
如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。

### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值

```
<span>Message: {{ msg }}</span>
```

### Attribute

Mustache 语法**不能作用在 HTML attribute 上**，遇到这种情况应该使用 v-bind 指令：

```
<div v-bind:id="dynamicId"></div>
```

### 使用 JavaScript 表达式

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 **v-html 指令**：

```
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

渲染为：

```
Using mustaches: <span style="color: red">This should be red.</span>
Using v-html directive: This should be red.
```





