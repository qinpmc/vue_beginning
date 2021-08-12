
- https://blog.csdn.net/csdn15002274757/article/details/108366582

分为三大类：全局守卫、路由守卫、组件守卫

全局守卫
1. beforeEach   2. beforeResolve  3. afterEach   

全局前置守卫
router.beforeEach  

全局解析守卫
router.beforeResolve


全局后置钩子
router.afterEach((to, from) => {
  // ...
})



路由守卫

在路由配置上直接定义 beforeEnter 守卫：

 

组件守卫
beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave


























