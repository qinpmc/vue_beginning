import Vue from 'vue'
import App from './App.vue'
import router from './router'


new Vue({
    //template:'<app></app>', // 效果等同 render: h => h(App),
	render: h => h(App),
    router,
    components: { App },
	el: '#app',  // 效果等同.$mount('#app')

})//.$mount('#app') 