import Vue from 'vue'
import App from './App.vue'
import router from './router'


new Vue({
    //template:'<app></app>',
	render: h => h(App),
    router,
    components: { App },
	//el: '#app',

}).$mount('#app') 