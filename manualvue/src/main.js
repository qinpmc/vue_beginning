import Vue from "vue"
import app from "./App.js"

new Vue({
	template:"<myapp></myapp>",
	components:{
		"myapp":app
	}
}).$mount("#app")