import { Component, Prop, Vue } from 'vue-property-decorator';
//import Detail from "@/components/detail/Detail";
import Detail from "@/components/detail/Detail.vue";


@Component({
    components:{
        Detail
    }
})
export default class Info extends Vue {
    title: any = "详情信息"
}