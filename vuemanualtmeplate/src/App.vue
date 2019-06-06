<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
		<h3>test11</h3>
    </div>

</template>
<script>
    import navbar from "./components/nav.vue";
    export default {
        name:'app',
        components: {navbar}
    }
</script>

