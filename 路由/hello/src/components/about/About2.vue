<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="goBack()">goBack</button>
   
  </div>
</template>

<script>
export default {
  name: 'About2',
 
  data(){
      return{
          msg:"about2"
      }
  },
  methods: {
    goBack () {
      console.log(this.$route)
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
 
</style>
