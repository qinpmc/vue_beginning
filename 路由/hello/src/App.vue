<template>
  <div id="app">
    <h3>{{ $route.name }}</h3>
    <h3>{{ $router.name }}</h3>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/about/ab1">About1-1</router-link>
      <router-link to="/about/ab2">About1-2</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
 
</style>
 
 
