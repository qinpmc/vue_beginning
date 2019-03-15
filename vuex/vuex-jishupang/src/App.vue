<template>
<div>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>{{$store.state.count}}</h3>
    </div>
    <div>
        <button @click="$store.commit('add')">+</button>
        <button @click="$store.commit('reduce')">-</button>
    </div>
</div>
</template>

<script>


export default {

        data(){
            return {
                msg:'hello vuex'
            }
        }
}
</script>
