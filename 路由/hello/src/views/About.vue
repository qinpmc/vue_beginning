<template>
  <div >
    <h1>{{ msg}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"About",
  data(){
    return {
      msg: "About"
    }
  }
}
</script>
