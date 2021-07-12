



elementui 中select 绑定的value是对象，显示标签内容不正确的问题，使用  value-key="content" 

<el-select v-model="formData.personInCharge" value-key="content" placeholder="请选择负责人"  :popper-append-to-body="false">
                <el-option v-for="(item,index) in persons" :key="index" :label="item.content" :value="item"></el-option>
              </el-select>







