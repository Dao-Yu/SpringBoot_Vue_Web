<template>

    <div class="usercenter">
        <el-container>
            <el-header>
                <div>
                    <span style="font-size: 20px;font-weight: 700;color: #777777">{{Center60sFrom.name}}</span>
                </div>
            </el-header>

            <el-main>

                <div class="usercenter_div" v-for="center in Center60s">
                    <el-card class="box-card">
                        <el-row :gutter="20">
                            <el-col :span="16"><div class="grid-content bg-purple">
                       <span style="font-size: 18px;font-weight: 700">
                           {{Center60sFrom.time[0]}}|
                           {{Center60sFrom.time[1]}}|
                           {{Center60sFrom.time[2]}}
                       </span>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">
                                {{center}}
                            </div></el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        data(){
            return{
                //消息发布者和推送的时间
                Center60sFrom:{
                  name:'',
                  time:''
                },
                //消息内容
                Center60s:[],
            }
        },
        methods:{
            //每日60s读懂世界消息
            getCenter60s(){
                this.axios.get("https://api.vvhan.com/api/60s?type=json").then((resp)=>{
                    // console.log(resp.data);
                    this.Center60sFrom.name = resp.data.name;
                    this.Center60sFrom.time = resp.data.time;
                    this.Center60s=resp.data.data;
                })
            },
        },
        created(){
            this.getCenter60s();
        }
    }
</script>

<style scoped lang="less">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        /*background: #99a9bf;*/
    }
    .bg-purple {
        /*background: #d3dce6;*/
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .box-card{
        border-radius: 10px;
        /*background: linear-gradient(to right,pink,skyblue);*/
        background: white;
    }
    .box-card:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }

    .usercenter{
        width: 100%;
        height: 930px;
        /*overflow-y:auto;*/
        /*overflow-x:auto;*/
    }
    .el-header{
        /*background-color: #B3C0D1;*/
        color: #333;
        text-align: left;
        line-height: 60px;
        font-size: 18px;
        font-weight: 600;
        border-bottom: dashed 1px #777777;
    }
    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        /*text-align: center;*/
        height: 855px;
    }
    /*滚动条样式*/
    // 滚动条整体部分，可以设置宽度啥的
    .el-main::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
    }
    //滚动的滑块
    .el-main::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    // 外层轨道
    .el-main::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .usercenter_div{
        margin-top: 5px;
        margin-bottom: 20px;
    }

</style>