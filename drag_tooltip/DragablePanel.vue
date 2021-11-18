<template>
    <div class="my_dialog" v-show="visible">
        <div class="my_dialog_box" id="my_dialog_box" v-drag  :style="{width: width }">
            <!-- 标题 -->
            <div class="my_dialog_title">
                {{title}}
                <span class="my_dialog_close" @click="closeFunc" :style="{  backgroundImage: 'url(/image/gis/popup_close.png)'  }"></span>
            </div>
            <!-- 内容 -->
            <div class="my_dialog_content">
                <slot></slot>
            </div>
            <!-- 底部按钮 -->
            <div class="my_dialog_bottom" v-if="showconform">
                <button class="btn confirmBtn" @click="confirmFunc">{{confirmtext}}</button>
                <button class="btn cancelBtn" v-if="showCancelButton" @click="cancelFunc">{{canceltext}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DragablePanel",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            name: String,
            title: String,
            showconform:{
                type:Boolean,
                default:false
            },
            confirmtext: {
                type: String,
                default: '确定'
            },
            canceltext: {
                type: String,
                default: '取消'
            },
            showCancelButton: {
                type: Boolean,
                default: false
            },
            sure:{
                type:Function,
            },
            cancel:{
                type:Function
            },
            close:{
                type:Function
            },
            width:{
                type:String,
                default:"400px"
            }
        },
        data: function () {
            return {
                isShow: this.visible
            }
        },
        methods: {
            cancelFunc: function () {
                // .sync 实现弹窗显示 or 隐藏
                //this.$emit("update:visible", false);
                //this.$emit("cancel",this.name);
                this.isShow = false;
                this.$parent.visible = false;
                if(!!this.cancel){
                    this.cancel.call();
                }
            },
            confirmFunc: function () {
                if(!!this.sure){
                    this.sure.call();
                }
                this.$emit("confirm");
            },
            closeFunc:function () {
                this.isShow = false;
                this.$parent.visible = false;
                if(!!this.close){
                    this.close.call();
                }
            }
        },
        directives: {
            drag: {
                inserted: function (el, binding, vnode) {
                    vnode = vnode.elm
                    el.onmousedown = ((event) => {
                        if (event.target.className !== "my_dialog_title") {
                            return
                        }
                        // (clientX, clientY)点击位置距离当前可视区域的坐标(x，y)
                        // offsetLeft, offsetTop 距离上层或父级的左边距和上边距


                        // 获取鼠标在弹窗中的位置
                        let mouseX = event.clientX - vnode.offsetLeft
                        let mouseY = event.clientY - vnode.offsetTop

                        // 绑定移动和停止函数
                        document.onmousemove = ((event) => {
                            let left, top

                            // 获取新的鼠标位置(event.clientX, event.clientY)
                            // 弹窗应该在的位置(left, top)
                            left = event.clientX - mouseX
                            top = event.clientY - mouseY

                            // offsetWidth、offsetHeight 当前元素的宽度
                            // innerWidth、innerHeight 浏览器可视区的宽度和高度

                            // 获取弹窗在页面中距X轴的最小、最大 位置
                            // let minX = vnode.offsetWidth / 2
                            // let maxX = window.innerWidth - vnode.offsetWidth / 2
                            // if (left <= minX) {
                            //     left = minX
                            // } else if (left >= maxX) {
                            //     left = maxX
                            // }
                            // // 获取弹窗在页面中距Y轴的最小、最大 位置
                            // let minY = vnode.offsetHeight / 2
                            // let maxY = window.innerHeight - vnode.offsetHeight / 2
                            // if (top <= minY) {
                            //     top = minY
                            // } else if (top >= maxY) {
                            //     top = maxY
                            // }
                            // 赋值移动
                            vnode.style.left = left + 'px'
                            vnode.style.top = top + 'px'
                        })
                        document.onmouseup = (() => {
                            document.onmousemove = document.onmouseup = null
                        })
                    })
                    window.onresize = (() => {
                        vnode.style.left = "50%"
                        vnode.style.top = "50%"
                    })
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "~@/assets/style/publicGis";
</style>
<style >

    .my_dialog {
        position: fixed;
        z-index: 99;
        left: 10px;
        top: 15%;
        bottom: 0;
        right: 0;
        width: 640px;
        height: 200px;

    }

    .my_dialog_mask {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #000;
        opacity: 0.5;
    }

    .my_dialog_box {
        position: absolute;
        width: 550px;
        color: #fff;
        top: 80%;
        left: 50%;
        border-radius: 3px;
        overflow: hidden;
        transform: translate(-50%, -20%);
        /* border: 1px solid blue; */
        background: url(/image/gis/bg_bh.png) no-repeat center;
        background-size: 100% 100%;
        
    }

    .my_dialog_content {
        min-height: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        padding: 20px;
        text-align: left;
        box-sizing: border-box;
        
    }
    .my_dialog_title {
        cursor: all-scroll;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        top: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        /* border-bottom: 1px solid #e7e8eb; */
        /* color: #000; */
        font-size: 18px;
        font-family: \5fae\8f6f\96c5\9ed1;
        padding: 0 31px 0 18px;
        text-align: left;
        user-select: none;
          color: #fff;
    background: url("/image/gis_tit_bg.png") no-repeat center;
    background-size: 100% 100%;
    padding-left: 15px !important;
    }

    .my_dialog_close {
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top: -8px;
        right: 20px;
        width: 20px;
        height: 20px;
        line-height: 16px;
        color: #ccc;
    }

    .my_dialog_close:hover {
        color: #409eff;
    }

    .my_dialog_bottom {
        margin: 0;
        padding: 16px 0;
        text-align: center;
        border-top: 1px solid transparent;
    }

    .btn {
        min-width: 60px;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        padding: 5px 15px;
        border-radius: 3px;
        text-decoration: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .my_dialog_bottom .cancelBtn:focus,
    .my_dialog_bottom .cancelBtn:hover {
        color: #409eff;
        background: #ecf5ff;
        border: 1px solid #b3d8ff;
    }

    .my_dialog_bottom .confirmBtn:focus,
    .my_dialog_bottom .confirmBtn:hover {
        background: #66b1ff;
        border: 1px solid #66b1ff;
        color: #fff;
    }

    .my_dialog_bottom .confirm_btn .marginLeft {
        margin-left: 10px;
    }

    .cancelBtn {
        border: 1px solid #dcdfe6;
        background-color: #fff;
        color: #606266;
    }

    .confirmBtn {
        border: 1px solid #409eff;
        background-color: #409eff;
        color: #fff;
    }

    button + button {
        margin-left: 15px;
    }
    
</style>
