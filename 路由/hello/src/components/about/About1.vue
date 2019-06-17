<template>
  <div>
    <h1>{{ msg }}</h1>
   
  </div>
</template>

<script>
export default {
  name: 'About1',
 
  data(){
      return{
          msg:"about1"
      }
  },
  mounted(){
      console.log(this.$route);
      console.log(this.$router)
  }

/*
$route:  

{name: "about1", meta: {…}, path: "/about/ab1", hash: "", query: {…}, …}
fullPath: "/about/ab1"
hash: ""
matched: (2) [{…}, {…}]
meta: {}
name: "about1"
params: {}
path: "/about/ab1"
query: {}
__proto__: Object


$router:

VueRouter {app: Vue, apps: Array(1), options: {…}, beforeHooks: Array(0), resolveHooks: Array(0), …}
afterHooks: []
app: Vue {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
apps: [Vue]
beforeHooks: []
fallback: false
history: HTML5History {router: VueRouter, base: "", current: {…}, pending: null, ready: true, …}
matcher: {match: ƒ, addRoutes: ƒ}
mode: "history"
options: {mode: "history", base: "/", routes: Array(2)}
resolveHooks: []
currentRoute: (...)
__proto__:
addRoutes: ƒ addRoutes(routes)
afterEach: ƒ afterEach(fn)
back: ƒ back()
beforeEach: ƒ beforeEach(fn)
beforeResolve: ƒ beforeResolve(fn)
forward: ƒ forward()
getMatchedComponents: ƒ getMatchedComponents(to)
go: ƒ go(n)
init: ƒ init(app /)
match: ƒ match( raw, current, redirectedFrom )
onError: ƒ onError(errorCb)
onReady: ƒ onReady(cb, errorCb)
push: ƒ push(location, onComplete, onAbort)
replace: ƒ replace(location, onComplete, onAbort)
resolve: ƒ resolve( to, current, append )
constructor: ƒ VueRouter(options)
currentRoute: (...)
get currentRoute: ƒ ()
__proto__: Object


*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
 
</style>
