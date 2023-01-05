<template>
    <div class="login">
        <div class="login_from">
            <p>岛屿</p>
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>

                <el-tab-pane label="登录" name="login">

                    <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" >

                        <el-form-item label="" prop="userName" class="elItem" >
                            <el-input type="text" v-model="loginForm.userName" autocomplete="off" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                        </el-form-item>


                        <el-form-item label="" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"  prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                        </el-form-item>


                        <el-form-item class="btns">
                            <el-button type="primary" @click="submitForm()">登录</el-button>
                            <el-button @click="resetForm('loginForm')">重置</el-button>
                        </el-form-item>

                    </el-form>

                </el-tab-pane>


                <el-tab-pane label="注册" name="register">
                    <register></register>
                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Register from "@/views/main/login/Register";
    // import {toLogin} from "@/api/user/index.js";

    export default {
        name: "Login",
        components: {Register},
        data() {
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('账号不能为空'));
                }else if(!/^[a-zA-Z0-9]{6,15}$/.test(value)){
                    callback(new Error('账号格式错误'));
                }
            };

            var validatepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                }else if(!/^[a-zA-Z0-9]{4,15}$/.test(value)){
                    callback(new Error('密码格式错误'))
                }
            };

            return {
                activeName: 'login',
                loginForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { validator: validateUsername, trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatepassword, trigger: 'blur' }
                    ]
                }
            };

        },
        methods: {
            handleClick(tab, event) {

            },
            submitForm() {

                this.$store.dispatch("LOGIN",this.loginForm).then((resp)=>{
                    let nickName = resp.data.content.sysUserVo.nickName;

                    if(resp.data.success===true){
                        this.$message({
                            message: '欢迎回来,'+nickName,
                            type: 'success'
                        });
                        this.$router.push({path:"/"})
                    } else if(resp.data.success===false) {
                        this.$message.error('账号或密码错误');
                    }else {
                        this.$message.error('登录时发生错误');
                    }

                });

                

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
.login{
    width: 100%;
    height: 100vh;
    background-image: url("../../../assets/img/bg.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;

    position: relative;
    .login_from{
        width: 420px;
        height: 520px;
        position: absolute;
        left: 78%;
        top: 50%;
        margin-left: -200px;
        margin-top: -150px;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px #777;

        /*毛玻璃效果*/
        /*!*设置阴影*!*/
        /*box-shadow: 20px 20px 50px rgba(0,0,0,0.5);*/
        /*!*设置圆角*!*/
        /*border-radius:15px;*/
        /*!*设置上边界和左边界亮纹，使card有一种层次感*!*/
        /*border-top: 1px solid rgba(255,255,255,0.5);*/
        /*border-left: 1px solid rgba(255,255,255,0.5);*/
        /*!*设置背景样式*!*/
        /*background: rgba(255,255,255,0.1);*/
        /*!*让透过card的底部元素模糊化,达到毛玻璃效果*!*/
        /*backdrop-filter: blur(5px);*/

        .btns{
            display: flex;
            justify-content: flex-end;
        }
    }
    p{
        font-size: 24px;
        font-weight: 1000;
        text-align: center;

    }
}





</style>