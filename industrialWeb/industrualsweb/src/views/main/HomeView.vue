<template>
    <div class="home">

       <div class="main">

           <el-row :gutter="20">
               <!--            左侧用户资料-->
               <el-col :span="8">
                   <div class="grid-content bg-purple" >

                       <el-card class="user_header">
                           <div>
                               <!--                        用户头像-->
                               <div class="user_headerimg">
                                   <img style="width: 200px;height: 200px;border-radius: 50%" :src= this.user_avatar>
                               </div>
                               <!--                        用户昵称，签名-->
                               <div class="user-title">
                               <span class="user-title-span" >
                                   {{ span_title }}
                               </span><br>
                               </div>
                           </div>
                       </el-card>

                       <div class="button-box">

                           <div  class="el_link_left">
                               <el-link :underline="false" @click="loginOut()" type="info" >退出登录</el-link>
                           </div>

                           <div class="el_link">
                               <el-link :underline="false" @click="drawer = true" type="primary" >点击编辑</el-link>
                           </div>
                           <el-drawer title="用户信息修改" :visible.sync="drawer" :with-header="true" :before-close="handleClose">
                               <updata-user-info></updata-user-info>
                           </el-drawer>
                       </div>

                       <br>
                       <br>

                       <!--                        分割线-->
                       <el-divider content-position="left">
                           <p style="font-size: 20px;font-weight: 700">用户信息</p>
                       </el-divider>

                       <br>

                       <div>
                           <el-card class="userinfo">
                               <p>账号：{{ userName }}</p>
                               <p>邮箱：{{ user_email }}</p>
                               <p>创建时间：{{createTime}}</p>
                               <!--                           <p>个性签名：<span>{{user_data}}</span></p>-->
                               <!--                           <p><i class="el-icon-location"></i>湖南省长沙市</p>-->
                           </el-card>
                       </div>

                       <br>
                        <!--                        分割线-->
                       <el-divider content-position="left">
                           <p style="font-size: 20px;font-weight: 700">今日份天气</p>
                       </el-divider>

                       <br>

<!--                       用户标签栏改为天气显示，不要标签-->
                       <div class="weather">
                           <el-card shadow="hover" class="weather_card">
                               <el-descriptions >
                                   <span slot="title">{{span_title}}，你好。</span>
                                   <el-descriptions-item label="位置">{{weather.city}}</el-descriptions-item>
                                   <el-descriptions-item label="天气">{{weather.type}}</el-descriptions-item>
                                   <el-descriptions-item label="空气质量">{{weather.aqi_name}}</el-descriptions-item>
                                   <el-descriptions-item label="最低">{{weather.low}}</el-descriptions-item>
                                   <el-descriptions-item label="最高">{{weather.hight}}</el-descriptions-item>
                                   <el-descriptions-item label="风向">{{weather.fengxiang}}</el-descriptions-item>
                                   <el-descriptions-item label="风力级别">{{weather.femgji}}</el-descriptions-item>
                                   <el-descriptions-item label="星期">{{weather.week}}</el-descriptions-item>
                                   <el-descriptions-item label="日期">{{weather.date}}</el-descriptions-item>
                                   <el-descriptions-item label="注意事项">{{weather.tip}}</el-descriptions-item>
                               </el-descriptions>
                           </el-card>
                       </div>


                   </div>
               </el-col>

               <!--            右侧用户动态-->
               <el-col :span="16"><div class="grid-content bg-purple">

                   <div class="user_Active">
                       <el-card style="border: none">
                           <el-tabs v-model="activeName" @tab-click="handleClick">
<!--                               用户个人动态-->
                               <el-tab-pane  name="UserDynamics"><span slot="label" class="tab_label">个人动态</span>
                                   <user-dynamics></user-dynamics>
                               </el-tab-pane>
<!--                               用户发布动态-->
                               <el-tab-pane  name="PublishDynamics"><span slot="label" class="tab_label">发布动态</span>
                                   <publish-dynamics></publish-dynamics>
                               </el-tab-pane>
<!--                               好友列表-->
                               <el-tab-pane  name="UserFriends"><span slot="label" class="tab_label">关注列表</span>
                                   <user-friends></user-friends>
                               </el-tab-pane>
<!--                               搜索用户-->
                               <el-tab-pane name="SearchFriend"><span slot="label" class="tab_label">搜索用户</span>
                                   <search-friend></search-friend>
                               </el-tab-pane>
<!--                               消息管理-->
                               <el-tab-pane  name="UserCenter"><span slot="label" class="tab_label">消息管理</span>
                                    <user-center></user-center>
                               </el-tab-pane>
                           </el-tabs>
                       </el-card>
                   </div>

               </div></el-col>
           </el-row>

       </div>

    </div>
</template>

<script>
    import UserDynamics from "@/views/main/user/UserDynamics";
    import PublishDynamics from "@/views/main/user/PublishDynamics";
    import UpdataUserInfo from "@/views/main/user/UpdataUserInfo";
    import UserFriends from "@/views/main/usershow/UserFriends";
    import UserCenter from "@/views/main/usershow/UserCenter";

    //导入工具
    import storage from "@/util/storage";
    import SearchFriend from "@/views/main/usershow/SearchFriend";

    export default {
        name: 'HomeView',
        components: {
            SearchFriend,
            UserCenter,
            UserFriends,
            UpdataUserInfo,
            PublishDynamics,
            UserDynamics
            
        },
        data () {
            return {
                //导航栏
                activeIndex: '1',

                //
                activeName: 'UserDynamics',
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                drawer: false,

                // 页面需要刷新的数据
                user_avatar:null,//用户头像
                span_title:null,//用户昵称
                userName:null,//账号
                user_email:null,//邮箱
                createTime:null,//账号创建时间
                // user_data:"这个人很懒，什么都没写哦",

                //天气详细信息
                weather:{
                    //位置
                    city:'',
                    //时间：年月日
                    date:'',
                    //星期
                    week:'',
                    //天气
                    type:'',
                    //最高温度
                    hight:'',
                    //最低温度
                    low:'',
                    //风向
                    fengxiang:'',
                    //风级
                    femgji:'',
                    //空气质量
                    aqi_name:'',
                    //注意事项
                    tip:''
                }


            }
        },
        methods: {
            //获取用户的个人基本信息
            getList(){
                // alert("自动执行了")
                // this.axios.post('http://localhost:8081/user/userlist',)
               let UserList = storage.getSessionObject("loginUser");

                this.span_title = UserList.sysUserVo.nickName;
                this.userName = UserList.sysUserVo.userName;
                this.user_email = UserList.sysUserVo.email;
                this.createTime = UserList.sysUserVo.createTime;
                this.user_avatar = UserList.sysUserVo.avatar;
            },
            //登出
            loginOut(){
                // alert(11)
                this.$store.dispatch("LOGOUT").then((resp)=>{
                    // console.log(resp)
                    //清空登录状态
                    localStorage.clear();
                    this.$router.push({name:"Login"})
                    this.$message('退出成功');
                })
            },


            handleClick(tab, event) {
                // console.log(tab, event);
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },

            //天气api
            getWeather(){
                this.axios.get("https://api.vvhan.com/api/weather").then((resp=>{
                    // console.log("获取状态："+resp.data.success)
                    // console.log("天气api(获取地名：):"+resp.data.city)
                    // console.log("获取详细天气信息："+resp.data.info.date)

                    //位置
                    this.weather.city=resp.data.city;
                    //时间：年月日
                    this.weather.date=resp.data.info.date;
                        //星期
                    this.weather.week=resp.data.info.week;
                        //天气
                    this.weather.type=resp.data.info.type;
                        //最高温度
                    this.weather.hight=resp.data.info.high;
                        //最低温度
                    this.weather.low=resp.data.info.low;
                        //风向
                    this.weather.fengxiang=resp.data.info.fengxiang;
                        //风级
                    this.weather.femgji=resp.data.info.fengli;
                        //空气质量
                    this.weather.aqi_name=resp.data.info.air.aqi_name;
                    //注意事项
                    this.weather.tip = resp.data.info.tip;
                }))
            }
        },
        //自动执行
        created() {
            this.getList();
            //天气api
            this.getWeather();
        }

    }
</script>

<style scoped lang="less">

    .home{
        /*background: #d3dce6;*/
        background: white;
        /*background: linear-gradient(#6190E8,#A7BFE8);*/
        width: 100%;
        height: 100vh;
        margin-top: 20px;
        /*background: url("@/assets/img/tu1.jpg");*/
    }


    .bg-purple {

    }
    .grid-content {
        /*border: none;*/
        /*border-radius: 100px;*/
        height: 980px;
    }

    .user_header{
        text-align: center;
        background-color: white;
        /*background: linear-gradient(to right,pink,skyblue);*/
        width: 100%;
        border-radius: 20px;
        margin: auto;
        .user_headerimg{
            padding-top: 20px;
        }

        .user-title{

            .user-title-span{
                font-size: 28px;
                font-weight: 600;
            }
        }
    }
    .user_header:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }
    .button-box{
        margin-top: 20px;

        .el_link{

            float: right;
            /*left: 70%;*/
            margin-right: 5%;

        }
        .el_link_left{
            float: left;
            margin-left: 5%;
            border-radius: 10px;
        }
    }



    .main{
        width: 90%;
        /*margin-top: 20px;*/
        margin-left: 5%;
    }

    /*用户信息*/
    .userinfo{
        width: 100%;
        border-radius: 20px;
        background: white;
        font-size: 18px;
        font-weight: 600;
    }
    .userinfo:hover{
        box-shadow: 0px 0px 30px 0px #999;
    }

    /*天气显示*/
    .weather{
        width: 100%;
        margin: 0 auto;

        .weather_card{
            /*background-color: #72baa7;*/
            border-radius: 20px;
        }
        .weather_card:hover{
            box-shadow: 0px 0px 30px 0px #999;
        }
    }


    /*用户动态*/
    .user_Active{
        border: none;
        width: 100%;
        min-height: 900px;
        overflow-y:auto;
        overflow-x:auto;


        .tab_label{
            font-size: 20px;
            font-weight: 600;
        }
    }


</style>
