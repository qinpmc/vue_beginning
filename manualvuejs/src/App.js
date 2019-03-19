import cp1 from "./components/cp1.js"

export default{
	template:`
		<div>
			<h1>Vue manual</h1>
			<cp1 msg="hello"></cp1>
		</div>
	`,
	components:{
		"cp1":cp1
	}
	
}