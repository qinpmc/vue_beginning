<template>
    <ul>
        <li><router-link to="home">Home</router-link></li>
        <li><router-link to="about">About</router-link></li>
        <li><router-link to="contact">Contact me</router-link></li>
    </ul>
</template>
<script>
    export default {
        name: "navbar" //一定不要用nav
    }
</script>