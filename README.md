# Vue入门

vscode的帮助： ctrl+shift+p

vscode 折叠展开代码：

使用Ctrl+Shift+p搜索fold和unfold，以查看 折叠和展开快捷键


vscode 默认单击资源管理器里的文件时，会使用预览模式打开，再单击另一资源管理器中的文件时，会使用同一个 tab页 预览，而不是在一个新的 tab页 打开文件；标签页上的文件是斜体的样式；

- 可以双击标题栏这个斜体的文字；
- 双击资源管理器里的文件时，会在新的标签页打开；
- 若是不想预览模式，可以file-preferences-settings 在设置中搜索 workbench.editor.enablePreview ,找到此项后，保持不勾选状态，这样就会局关闭了预览模式，打开的文件都会生成新的标签页；



 vue-property-decorator用法
 - https://www.jianshu.com/p/d8ed3aa76e9b


// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)，与上行代码等价
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')



vue使用 elementui 时，在用表单验证是，el-form需添加 :model="form" ， prop 需和 model名称一致(如下happenTime)：

```
<el-form-item label="发生时间" prop="happenTime">
                            <el-date-picker v-model="form.happenTime" :picker-options="pickerOptions" type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间"></el-date-picker>
                        </el-form-item>
```
 
部分完整的示例：

```
<template>
    <!-- 创建任务 -->
    <div class=" cuntent">
        <div class="title-t title-panel">
            <div class="title">新建上报</div>
            <div class="close" @click="close"></div>
        </div>
        <el-scrollbar style="height: 326px" ref="scrollbar">
		<!--  ！！！！  el-form需添加 :model="form"  -->
            <el-form ref="form" :rules="rules" :model="form" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="类型：" prop="reportType">
                            <el-select v-model="form.reportType" placeholder="请选择" @change="changeType">
                                <el-option v-for="item in reportTypes" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="locationTitle" prop="address">
                            <el-input style="width: 100%" v-model="form.address" @click.native="getEndAddress"
                                      maxlength="800" suffix-icon="el-icon-location" size="small"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="发生时间" prop="happenTime">
                            <el-date-picker v-model="form.happenTime" :picker-options="pickerOptions" type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div v-if="form.reportType == 1">
                            <stagnant-water :stagnantParams="stagnantParams"></stagnant-water>
                        </div>
                        <div v-if="form.reportType == 2">
                            <flood :floodParams="floodParams"></flood>
                        </div>
                        <div v-if="form.reportType == 3">
                            <disaster :disasterParams="disasterParams"></disaster>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注说明：" prop="description">
                            <el-input size="small" style="width: 100%" type="textarea" v-model="form.description"
                                      maxlength="200" :rows="3" resize="none" suffix-icon="el-icon-location"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="现场照片(图片/视频)：" prop="">
                            <div>
                                <div id="uplpoadContainer">
                                    <ul id="fileList" class="fileList"></ul>
                                    <div>
                                        <label for="readFile" style="font-size: 40px;">+</label>
                                        <input type="file" id="readFile" value="" multiple="multiple" hidden/>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-scrollbar>
        <div class="btns borderBtns" style="margin-top:0">
            <el-button type="primary" class="dialog-cancel" @click="save" :disabled="uploadReady">提交</el-button>
            <el-button type="primary" class="dialog-sure" @click="cancel">取消</el-button>
        </div>
        <el-dialog :close-on-click-modal="false" title="详细地址" :visible.sync="addressShow" class="newaddDialog"
                   :append-to-body="true" @close="addressShow = false" v-dialogDrag:{dialogDrag}="dialogDrag">
            <MapPick ref="address" @close="addressShow = false" :isShow="addressShow" @boundary="endAddress"
                     @poi="endAddress"></MapPick>
        </el-dialog>
        <el-dialog id="previewContainer" :close-on-click-modal="false" title="查看图片视频" :visible.sync="previewShow"
                   class="newaddDialog meetDialog" :append-to-body="true" @close="previewShow = false"
                   v-dialogDrag:{dialogDrag}="dialogDrag">
            <div id="previewImgVideo"></div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    //import MapPick from "../../../../systemPicture/dialogs/MapPick";
    import MapPick from "../../../../gis/componets/MapPick2.vue";
    import stagnantWater from "./stagnantWater.vue";
    import flood from "./flood.vue";
    import disaster from "./disaster.vue"

    export default {
        components: {MapPick, stagnantWater,flood,disaster},
        props: {},
        data: function () {
            return {
                reportTypes: [
                    {
                        value: 1,
                        label: "内涝积水处置",
                    },
                    {
                        value: 2,
                        label: "工程险情处置",
                    },
                    {
                        value: 3,
                        label: "人员转移",
                    },
                    {
                        value: 4,
                        label: "物资调度",
                    },
                    {
                        value: 5,
                        label: "力量调度",
                    }
                ],
                //禁用选择未来日期
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                form:{
                    happenTime: "",
                    reportType: 0,
                    address: "",
                    description: "",
                },
                dialogDrag: true,
                lngLat: [],
                addressShow: false,
                previewShow: false,
                attachFiles: [],
                uploadReady: false, // 1,上传图片视频可选；2,只有上传图片视频 过程中 才禁用提交按钮; 3,图片视频上传完成可以提交
                locationTitle: "积水位置",
                stagnantParams: {
                    impact: 1,
                    depth: 1,
                    area: 1
                },
                floodParams: {
                    type: 1,
                    depth: 1,
                    area: 1
                },
                disasterParams:{
                    personChecked:true,
                    personNumber:null,
                    facilityChecked:false,
                    facilityNumber:null,
                },
                rules:{
                    happenTime:[{ type: 'string',required: true,message: "时间必填", trigger: 'blur'}]
                }
            };
        },
        methods: {
 
            endAddress: function (poi) {
                this.addressShow = false;
                this.form.address = poi.address;
                this.lngLat = poi.lngLat;
            },
            save: function () {
  
                if (this.lngLat.length != 2) {
                    this.$message.warning("请选择地址!");
                    return;
                }
                const that = this;
				
				// 提交前验证表单 
                that.$refs["form"].validate((valid, object) => {
                    if (!valid) {
                        this.$nextTick(() => {
                            let isError = document.getElementsByClassName("is-error");
                            this.$refs.scrollbar.wrap.scrollTop = isError[0].offsetTop;
                        });
                        return;
                    }
                })
            },
            cancel: function () {
                this.$emit("close");
            },
            close() {
                this.$emit("close");
            },
            getEndAddress() {
                this.addressShow = true;
            },
            checkImg(type) {
                const types = ["image/jpeg", "image/jpg", "image/png"];
                return types.indexOf(type) !== -1;
            },
            checkVideo(type) {
                const types = ["video/mp4", "video/avi", "video/wmv"];
                return types.indexOf(type) !== -1;
            },
            changeType(val) {
                console.log(val);
                this.form.reportType = val;
                if (val == 1) {
                    this.locationTitle = "积水位置";
                } else if (val == 2) {
                    this.locationTitle = "洪水位置";
                } else if (val == 3) {
                    this.locationTitle = "灾情位置";
                }

            },
        },
        created: function () {
            this.form.reportType = 1;
        },
        mounted() {

        },
    };
</script>

<style  scoped>

</style>

```


elementui 下拉框默认值不正确的几个情况：

1， 父子组件
 
父组件：

```
// 父组件定义的data 
 dangerParams: {
                    address:"",
                    lngLat:[],
                    happenTime:"",
                    type:1,
                    area:null,  // 注意这里写成 了null
                    personNumber:null,
                    attachFiles:[]
                },
				
				

// 父组件中 引用子组件：engineering-danger	，并通过属性:engineeringDangerParams传递给子组件（ engineeringDangerParams）
<!--工程险情-->
<div v-if="form.reportType == 2" style="margin-left:-50px;">
	<engineering-danger :engineeringDangerParams="engineeringDangerParams"></engineering-danger>
</div>
```

子组件：
```
// 子组件 属性 ---接受父组件传递的值
props: {
            engineeringDangerParams:{
                address:"",
                happenTime:"",
                type:"",
                area:0,
                personNumber:0,
                attachFiles:[],
                lngLat:[]
            }
        },
		
		
	
// 子组件的data中定义了 areas
areas: [
                    {
                        value: 1,
                        label: "1000m²以下",
                    },
                    {
                        value: 2,
                        label: "1000m²-3000m²",
                    },
                    {
                        value: 3,
                        label: "3000m²以上",
                    }
                ],	
				
				
				
// 子组件的页面 定义了如下的 下拉框：				
 <el-row>
                    <el-col :span="24">
                        <el-form-item label="影响面积：" prop="area">
                            <el-select v-model="engineeringDangerParams.area" placeholder="请选择">
                                <el-option v-for="item in areas" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>			
				
				
				
				
// 造成的结果是 子组件的下拉框没有默认值。。
// 修复：将父组件传递的值中的 area 从null 改为 1

engineeringDangerParams: {
                    address:"",
                    lngLat:[],
                    happenTime:"",
                    type:1,
                    area:1, // 这里从null改为1，从而使得子组件默认选定第一项
                    personNumber:null,
                    attachFiles:[]
                },				

```

## 项目中一些问题拾遗

- 1，	tslint.json 添加：
    "no-string-literal": false  解决类似  obj["key"] 报错的问题

- 2，	src目录下增加 typings目录，typings目录下增加 vue-extend.d.ts文件，           
解决在vue原型上添加属性后（如Vue.prototype.Bus = new Vue();）编译报错的问题， vue-extend.d.ts内容为:
import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        readonly Bus: any;
    }
}
- 3，	window.xxx  改为 （window as any）.xxx解决编译错误
- 4，	tsconfig.json中 编译选项改为非严格模式
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
"strict": false,
…

- 5，	编译报错，不允许使用位运算，添加 // tslint:disable-next-line:no-bitwise 注释解决

    public newGuid() {
        const g = function () {
            // tslint:disable-next-line:no-bitwise
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g());
    }


- 6  npm打包报错：

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed 
- JavaScript heap out of memory

```


setx NODE_OPTIONS --max_old_space_size=10240


- 7  vue 劫持问题

- 7.1 使用 vue-nonreactive
  - 安装， npm install vue-nonreactive --save
  - 引入，
  
  ```
  import Vuenoractive from 'vue-nonreactive';
  Vue.use(Vuenoractive);
  
  ```
  - 使用，
  
  ```
  (Vue as any).nonreactive(this.map);
  ```
  
- 7.2 重写vue Observer.prototype.walk

```

const Observer = new Vue().$data.__ob__.constructor;
const defineReactive$$1 = (Vue.util as any).defineReactive;
Observer.prototype.walk = function walk(obj: any) {
  if (obj.map && obj.map.targetId == 'g2map') {
    //delete obj.map.__ob__;
    return;
  }

  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === 'map' || keys[i] === 'injectContainer') {
      break;
    }
    defineReactive$$1(obj, keys[i]);
  }
};

```




















