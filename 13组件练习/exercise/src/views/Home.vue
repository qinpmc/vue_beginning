<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <br>
    <button @click="showDragPanel">显示拖拽框</button>
    <DragablePanel title="信息框" :visible="isShowDragPanel" name="aaaa" :sure="sure" :cancel="cancel" :close="close"></DragablePanel>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import DragablePanel from '@/components/DragablePanel.vue'



export default {
  name: 'Home',
  components: {
    HelloWorld,
    DragablePanel
  },
  data:function(){
    return {
      isShowDragPanel:false
    }
  },
  methods:{
    showDragPanel(){
      this.isShowDragPanel = true;
    },
    sure(){
      console.log("sure");
    },
    cancel(){
      console.log("cancel");
    },
    close(){
      console.log("close");
    }
  }
}
</script>
