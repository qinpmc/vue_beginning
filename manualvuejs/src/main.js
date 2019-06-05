import Vue from "vue"
import app from "./App.js"

new Vue({
	template:"<div>main<myapp></myapp></div>", // ��ֱ�Ӽ�дΪ<myapp></myapp>
	components:{
		"myapp":app
	}
}).$mount("#app")