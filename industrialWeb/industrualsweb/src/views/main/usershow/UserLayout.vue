<template>
<!--    用户好友列表-->
    <div class="home">
        <el-container style="height: 100vh; border: 1px solid #eee;background-color: white">
            
<!--            这层是aside(侧边栏)-->
            <el-aside width="23%" style="background-color: rgb(238, 241, 246)">

                <el-menu :default-openeds="['1']" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-user"></i>好友列表</template>
                        <el-menu-item index="userFriends">我的好友</el-menu-item>
                        <el-menu-item index="">我的关注</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>消息列表</template>
                        <el-menu-item index="userCenter" @click="getuserCenterTitle"><span>{{UserCenterSpan}}</span></el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-user-solid"></i>好友管理</template>
                        <el-menu-item index="3-1">黑名单</el-menu-item>
                        <el-menu-item index="3-2">屏蔽</el-menu-item>
                    </el-submenu>

                </el-menu>

            </el-aside>

<!--            这层是header和main-->
            <el-container>

                <el-main>
                    <router-view></router-view>
                </el-main>



            </el-container>

        </el-container>
    </div>
</template>

<script>

    export default {
        name: "UserLayout",
        data(){

            return{
                UserCenterSpan:"系统通知",
            }
        },
        methods:{
            getuserCenterTitle:function () {
                // alert("已点击")


            }
        }
    }
</script>

<style scoped lang="less">
.home{
    width: 100%;
    height: 100vh;
    /*background-color: greenyellow;*/
}
.el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

</style>