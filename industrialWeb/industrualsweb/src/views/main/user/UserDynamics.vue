<template>
<!--    个人动态-->
    <div class="UserDynamics">
        <el-timeline>

            <el-timeline-item timestamp  placement="top" v-for="userspace in space">
                    <el-collapse v-model="activeName" accordion>
                        <el-card>
                            <el-collapse-item>
                                <span slot="title">
                                    <span class="el-collapse-item-title">{{userspace.userNickname}}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="title_time">{{userspace.createTime}}</span>
                                </span>
                                <!--                        动态的内容-->
                                <div>
                            <span class="span_-text">
                                {{userspace.spaceData}}
                            </span>
                                </div>
                                <!--                        动态图片-->
                                <div class="div_imgs">
                                    <el-row :gutter="5">
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple">
                                                <img :src= userspace.spaceImages>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!--                                                    动态其他信息-->
                                <div>
                                    <el-badge class="item">
                                        <!--                                评论-->
                                        <span style="cursor:pointer;"><i class="el-icon-chat-dot-round"></i>{{userspace.spaceComment}}</span>
                                    </el-badge>
                                    <el-badge class="item">
                                        <!--                                收藏-->
                                        <span style="cursor:pointer;"><i class="el-icon-star-off"></i>{{userspace.spaceCollect}}</span>
                                    </el-badge>

                                    <el-badge  class="item" type="warning">
                                        <!--                                转发-->
                                        <span style="cursor:pointer;"><i class="el-icon-position"></i>{{userspace.spaceShare}}</span>
                                    </el-badge>
                                </div>
                            </el-collapse-item>
                        </el-card>
                    </el-collapse>
                </el-timeline-item>

        </el-timeline>

<!--        分页-->

        <div class="Pagination" v-show="flag">
            <el-card>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="this.query.page"
                        :page-sizes="[6, 5, 4 ]"
                        :page-size="this.query.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.total">
                </el-pagination>
            </el-card>
        </div>

<!--        空状态-->
        <div v-show="!flag">
            <el-empty description="没有动态哦...快去发布动态吧"></el-empty>
        </div>
    </div>


</template>

<script>
    //导入工具
    import storage from "@/util/storage";

    export default {
        name: "UserDynamics",
        data() {
            return {
                activeName: '1',
                flag:'true',
                //分页
                total:0,
                query:{
                    page:1,
                    size:6,
                },
                user:{
                    //用户id
                    userId:storage.getSessionObject("loginUser").sysUserVo.userId,
                    //用户账号
                    userName:storage.getSessionObject("loginUser").sysUserVo.userName,
                },
                //token(不为空可绕过拦截器)
                token:'',

                space:null,
                imgurls:null

            };
        },
        methods: {
            //获取用户所有动态
            getUserDynamics(){
                // this.$store.dispatch("GETUSERDYNAMICS",this.user,{
                this.axios.get("http://localhost:8081/user/userDynamics",{
                    params:{
                        userName:this.user.userName,
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then((resp)=>{
                    // console.log(resp)
                    //动态信息
                    this.space = resp.data.content.space;
                    if(this.space==""){
                        this.flag=false;
                    }
                    //动态图片
                    this.imgurls = resp.data.content.imgList;

                    this.total = resp.data.content.total;

                })
            },

            //分页功能

            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.size = val;
                this.getUserDynamics();
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.page = val;
                this.getUserDynamics();
            }
        },
        //自动执行
        created() {
            //每次进入动态展示页面就查询动态
            // this.getUserDynamics();
        },
        mounted() {
            this.getUserDynamics();
        }
    }
</script>

<style scoped lang="less">

    .UserDynamics{
        width: 100%;
        height: 930px;
        /*height: 100%;*/
        overflow-y:auto;
        overflow-x:hidden;
    }
    /*滚动条样式*/
    // 滚动条整体部分，可以设置宽度啥的
    .UserDynamics::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
    }
    //滚动的滑块
    .UserDynamics::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    // 外层轨道
    .UserDynamics::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }



    .el-collapse-item-title{
        font-size: 20px;
        font-weight: 700;
    }
    .title_time{
        color: #777777;
    }
    .span_-text{
        font-size: 16px;
        /*font-family: YUANSHENG;*/
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;

        span{
            color: #777777;
        }
    }
    /*图片*/
    .div_imgs{
        img{
            width: 100%;
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple {
            background: #d3dce6;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }

    /*底部分页*/
    .Pagination{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
    }


</style>