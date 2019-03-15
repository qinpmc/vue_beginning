<template>
<div>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>$store.state.count:{{$store.state.count}}</h3>
        <h3>count: {{count}}</h3>
        <h3>mycount: {{mycount}}</h3>
    </div>
    <div>
        <button @click="$store.commit('add')">+</button>
        <button @click="$store.commit('reduce')">-</button>
    </div>
</div>
</template>



<script>
import store from './store.js'
import {mapState} from 'vuex';

export default {
        // computed:{
        //     count(){
        //         return this.$store.state.count;
        //     }
        // },


        // computed:mapState({
        //     count:state => state.count
        // }),

        //computed:mapState(["count"]),
        
        computed:{
            ...mapState(["count"]),
            //mycount:() => mapState(["count"]).count
        },

        data(){
            return {
                msg:'hello vuex'
            }
        },
        //store:store
}
</script>

 