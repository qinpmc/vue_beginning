import Vue from "vue"
import app from "./App.js"

new Vue({
    template:"<div>Manual myapp" +
    "<myapp></myapp>" +
    "</div>", //
    components:{
		"myapp":app   // 使用myapp 作为app 的名称
	}
}).$mount("#app")