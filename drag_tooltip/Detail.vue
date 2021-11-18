<template>
    <div>
        {{feature.getValue("name")}}
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import * as g2 from 'g2';

    @Component({

    })
    export default class Detail extends Vue {
        private container = window["container"];
        private configuration = this.container.resolve("configuration");
        private feature:any;
        private mounted() {
            console.log(this.feature);
            debugger
        }


    }
</script>
