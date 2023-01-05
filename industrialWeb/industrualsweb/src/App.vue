<template>
    <router-view/>
</template>
<script>
    export default {
        mounted(){
            //记录登录状态
            // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            // console.log(userInfo)
            // if(userInfo===null){
            //     this.$router.push({path:"login"});
            // }else {
            //     this.$router.push({path:"/"});
            // }
            // this.$router.push({name:"Login"});
            // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
            // window.onbeforeunload = function (e) {
            //     const storage = window.localStorage
            //     storage.clear()
            // }

        }
    }
</script>

<style lang="less">

    body{
        /*background-color: #d3dce6;*/
        background-color: white;
        margin: 0;
        padding: 0;
    }
</style>
