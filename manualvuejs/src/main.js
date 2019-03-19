import Vue from "vue"
import app from "./App.js"

new Vue({
	template:"<div>main<myapp></myapp></div>", // 可直接简写为<myapp></myapp>
	components:{
		"myapp":app
	}
}).$mount("#app")