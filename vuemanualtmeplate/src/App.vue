<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
    </div>

</template>
<script>
    import navbar from "./components/nav.vue";
    export default {
        name:'app',
        components: {navbar}
    }
</script>

