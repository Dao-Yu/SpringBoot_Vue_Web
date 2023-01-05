<template>
    <div class="home-box">
<!--        <p>用户好友详情及聊天界面</p>-->
        <el-row :gutter="20">
            <!--            左侧用户资料-->
            <el-col :span="8">
                <div class="grid-content bg-purple" >
                    <el-card class="AvatarAndNickName-box">
                        <!--                   头像和昵称-->
                        <div>
                            <!--                        头像-->
                            <div class="avatar-box">
                                <img :src=UserFriendFrom.avatar>
                            </div>
                            <!--                        昵称-->
                            <div class="nickname-box">
                                <span>{{UserFriendFrom.nickName}}</span>
                            </div>
                        </div>
                    </el-card>

                    <el-card :body-style="{ padding: '0px' }" class="attention-box">
                        <div @click="Addattention">
                            <span>{{attention}}</span>
                        </div>
                    </el-card>

                    <el-divider content-position="left"><h2>好友信息</h2></el-divider>

                    <br>

                    <el-card class="friendFrom-box">
                        <!--                    账号信息及其他信息-->
                        <div>
                            <p>账号:{{UserFriendFrom.username}}</p>
                            <p>邮箱:{{UserFriendFrom.email}}</p>
                            <p>加入屿空间的时间:{{UserFriendFrom.createTime}}</p>
                        </div>
                    </el-card>

                </div>
            </el-col>

            <!--            右侧动态框-->
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <div class="chat-box">
                        <el-container>
                            <el-header>{{UserFriendFrom.nickName}}的动态</el-header>
                            <el-main>
                                <div class="DynamicsFrom-box" v-for="space in DynamicsFrom">
                                    <el-card class="Dynamics-box" :body-style="{ padding: '0px' }">
                                        <div class="left-box">
                                            <div class="createTime-box">
                                                <span>发布于&nbsp; {{space.createTime}}</span>
                                            </div>
                                            <br>
                                            <div class="item-box">
                                                <!--                                评论-->
                                                <span style="cursor:pointer;"><i class="el-icon-chat-dot-round"></i>{{space.spaceComment}}评论</span>
                                                <!--                                收藏-->
                                                <span style="cursor:pointer;"><i class="el-icon-star-off"></i>{{space.spaceCollect}}收藏</span>
                                                <!--                                转发-->
                                                <span style="cursor:pointer;"><i class="el-icon-position">{{space.spaceShare}}转发</i></span>
                                            </div>
                                            <br>
                                            <div class="spaceData-box">
                                                <span>{{space.spaceData}}</span>
                                            </div>
                                        </div>
                                        <div class="right-box">
                                            <img :src=space.spaceImages>
                                        </div>
                                    </el-card>
                                </div>
<!--                                空状态显示-->
                                <div v-show="!flag">
                                    <el-empty description="没有动态哦..."></el-empty>
                                </div>

                                <!--           分页-->
                                <div class="block" v-show="flag">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="this.query.page"
                                            :page-size="this.query.size"
                                            :page-sizes="[4, 8, 14 ]"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="this.total">
                                    </el-pagination>
                                </div>

                            </el-main>
                        </el-container>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //导入工具
    import storage from "@/util/storage";

    export default {
        name: "UserShowFriend",
        data(){
            return{
                //控制div显示
                flag:'true',
                //是否关注
                attention:'',
                //分页
                total:0,
                query:{
                    page:1,
                    size:4,
                },
                //用户基本信息
                UserFriendFrom:{
                    //头像
                    avatar:'',
                    //昵称
                    nickName:'',
                    //账号
                    username:'',
                    //邮箱
                    email:'',
                    //账号创建时间
                    createTime:''
                },
                //用户动态
                DynamicsFrom:null,
                //添加好友
                AddFrom:{
                    userId:'',
                    userName:'',
                    userNickname:'',
                    userFriendid:'',
                    userFriendname:'',
                    userFriendnicaname:''
                }

            }
        },
        methods:{
            //查询用户信息
            getUserList(){
                let userName = storage.getSessionString("UserFriendUserName");
                this.axios.get("http://localhost:8081/user/getUserFriend",{
                    params:{
                        userName:userName
                    }
                }).then((resp)=>{
                    // console.log("用户的基本信息："+resp.data.content.userId)
                    this.UserFriendFrom.avatar = resp.data.content.avatar
                    this.UserFriendFrom.nickName = resp.data.content.nickName;
                    this.UserFriendFrom.username = resp.data.content.userName
                    this.UserFriendFrom.email = resp.data.content.email
                    this.UserFriendFrom.createTime = resp.data.content.createTime;
                    //添加好友需要用到信息
                    this.AddFrom.userFriendid = resp.data.content.userId;
                    this.AddFrom.userFriendname = resp.data.content.userName;
                    this.AddFrom.userFriendnicaname = resp.data.content.nickName;

                })
            },
            //查询用户动态
            getUserDynamicsList(){
                let userName = storage.getSessionString("UserFriendUserName");
                this.axios.get("http://localhost:8081/user/userDynamics",{
                    params:{
                        userName:userName,
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then((resp)=>{
                    // console.log("用户动态："+resp.data.content.space)
                    this.DynamicsFrom = resp.data.content.space;
                    this.total = resp.data.content.total;
                    if(this.DynamicsFrom==""){
                        this.flag = false;
                    }

                })
            },
            //分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.size = val;
                this.getUserDynamicsList();
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.page = val;
                this.getUserDynamicsList();
            },
            //查询用户是否关注了
            getDelFlag(){
                let userFriendName = storage.getSessionString("UserFriendUserName");
                let userName = storage.getSessionObject("loginUser").sysUserVo.userName;
                // console.log("登录的用户为："+userName);
                // console.log("登录用户的好友为："+userFriendName);
                this.axios.get("http://localhost:8081/user/getDelFlag",{
                    params:{
                        userFriendname:userFriendName,
                        userName:userName
                    }
                }).then((resp)=>{
                    // console.log(resp)
                    if(resp.data.success){
                        //已关注
                        if(resp.data.content.delFlag=="0"){
                            this.attention = '取消关注';
                        }else{
                            this.attention = '关注';
                        }
                    }else{
                        //未关注
                        this.attention = '关注';
                    }
                })
            },
            //点击关注事件
            Addattention(){
                this.AddFrom.userId = storage.getSessionObject("loginUser").sysUserVo.userId;
                this.AddFrom.userName = storage.getSessionObject("loginUser").sysUserVo.userName;
                this.AddFrom.userNickname = storage.getSessionObject("loginUser").sysUserVo.nickName;

                let userFriendName = storage.getSessionString("UserFriendUserName");
                let userName = storage.getSessionObject("loginUser").sysUserVo.userName;
                if(this.attention==='取消关注'){
                    //取消关注
                    this.axios.get("http://localhost:8081/user/deleteUserFriend",{
                        params:{
                            userName:userName,
                            userFriendname:userFriendName
                        }
                    }).then((resp)=>{
                        // console.log(resp.data.success);
                        if(resp.data.success){
                            this.attention = '关注';
                            this.$message({
                                showClose: true,
                                message: resp.data.message
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: resp.data.message,
                                type: 'error'
                            });
                        }
                    })
                }
                if(this.attention==='关注'){
                    this.axios.post("http://localhost:8081/user/addUserFriend",this.AddFrom).then((resp)=>{
                        // console.log(resp.data);
                        if(resp.data.success){
                            this.attention = '取消关注';
                            this.$message({
                                showClose: true,
                                message: resp.data.message
                            });

                        }else{
                            this.$message({
                                showClose: true,
                                message: resp.data.message,
                                type: 'error'
                            });
                        }
                    })
                }
            }

        },
        mounted(){
            this.getUserList();
            this.getUserDynamicsList();
            this.getDelFlag();
        }
    }
</script>

<style scoped lang="less">
    .bg-purple {
        /*background: #d3dce6;*/
        background: white;

    }
    .grid-content {
        border-radius: 5px;
        height: 920px;
    }



    .home-box{
        width: 90%;
        margin: auto;
        margin-top: 20px;
    }

    .AvatarAndNickName-box{
        width: 100%;
        margin: auto;
        border-radius: 20px;
        /*background: #afdfe4;*/
        background: white;
    }
    .AvatarAndNickName-box:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }
    .avatar-box{
        width: 200px;
        height: 200px;
        margin: auto;
        padding-top: 20px;
        border-radius: 50%;
    }
    .avatar-box img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
    //关注
    .attention-box{
        margin-top: 10px;
        width: 20%;
        height: 50px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        line-height: 50px;
        text-align: center;
        border-radius: 10px;
        margin-left: 78%;
    }
    .attention-box:hover{
        box-shadow: 0px 0px 5px 0px #999;
    }


    .nickname-box{
        margin-top: 20px;
        text-align: center;
    }
    .nickname-box span{
        font-size: 28px;
        font-weight: 600;
    }
    .friendFrom-box{
        width: 100%;
        border-radius: 20px;
        font-size: 18px;
        font-weight: 600;
        /*background: #90d7ec;*/
        background: white;
    }
    .friendFrom-box:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }
    //聊天框
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
    //::-webkit-scrollbar-track-piece  内层滚动槽
    //::-webkit-scrollbar-button 滚动条两端的按钮
    //::-webkit-scrollbar-corner 边角

    .DynamicsFrom-box{
        margin-bottom: 20px;
    }
    //动态展示样式
    .Dynamics-box{
        width: 100%;
        height: 280px;
        background-color: white;
        /*background: linear-gradient(to right,#afdfe4,#90d7ec);*/
        border-radius: 20px;
        .left-box{
            /*text-indent: 30px;*/
            float: left;
            width: 50%;
            height: 100%;
            /*background-color: #42b983;*/
            border-radius: 20px;
            .createTime-box{
                margin-top: 20px;
                text-indent: 30px;
                span{
                    font-size: 18px;
                    font-weight: 600;
                }
            }
            .item-box{
                text-indent: 15px;
            }
            .spaceData-box{
                margin-left: 20px;
                text-indent: 10px;
                font-size: 16px;
            }

        }
        .right-box{
            float: right;
            width: 50%;
            height: 100%;
            /*background-color: #409EFF;*/
            border-radius: 20px;


            img{
                width: 100%;
                height: 280px;
            }


        }
    }
    .Dynamics-box:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }
    .block{
        margin-top: 10px;
        float: right;
    }

</style>