<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <el-form-item label="" prop="nickName">
                <el-input type="text" v-model="ruleForm.nickName" autocomplete="off" prefix-icon="el-icon-user-solid" placeholder="请输入昵称"></el-input>
            </el-form-item>

            <el-form-item label="" prop="userName">
                <el-input type="text" v-model="ruleForm.userName" autocomplete="off" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item label="" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="" prop="phonenumber">
                <el-input type="text" v-model.number="ruleForm.phonenumber" autocomplete="off" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <div class="btns">
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </div>

        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Register",
        data() {
            var validatenickName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
                }
                if(value.length<0 || value.length>15){
                    callback(new Error('昵称长度在1至15之间'));
                }

            };
            var validateuserName = (rule, value, callback) => {
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
            var validateemail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                }
                if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)){
                    callback(new Error('输入邮箱的格式错误'));
                }
            };
            var validatephonenumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                }
                if(!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)){
                    callback(new Error('请输入正确的手机号'));
                }
            };

            return {
                //注册需要提交的数据
                ruleForm: {
                    nickName:'',
                    userName:'',
                    password: '',
                    email: '',
                    phonenumber:''
                },

                rules: {
                    nickName: [
                        { validator: validatenickName, trigger: 'blur' }
                    ],
                    userName: [
                        { validator: validateuserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatepassword, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validateemail, trigger: 'blur' }
                    ],
                    phonenumber: [
                        { validator: validatephonenumber, trigger: 'blur' }
                    ]
                }
            };

        },
        methods: {
            submitForm() {
                // console.log(this.ruleForm)
                // this.$refs[formName].validate((valid) => {
                //     if(this.ruleForm.nickName===''|| this.ruleForm.userName===''||this.ruleForm.password===''||this.ruleForm.email===''||this.ruleForm.phonenumber===''){
                //         this.$message.error('注册失败，请注意信息填写');
                //         return false;
                //     }else{
                //         if (valid) {
                //             console.log(this.ruleForm)
                //         } else {
                //             console.log('error submit!!');
                //             return false;
                //         }
                //     }
                // });

                if(this.ruleForm.nickName===''|| this.ruleForm.userName===''||this.ruleForm.password===''||this.ruleForm.email===''||this.ruleForm.phonenumber===''){
                    this.$message.error('注册失败，请注意信息填写');
                    // return false;
                }else{
                    // this.$store.dispatch("REGISTER",this.ruleForm).then((resp)=>{
                    //
                    //     let data = resp.data;
                    //     if(data.success){
                    //         this.$message({
                    //             message: data.message,
                    //             type: 'success'
                    //         });
                    //         //  vue页面跳转
                    //         this.$router.push({path:"/login"})
                    //         // location.reload();
                    //     }else {
                    //         this.$message({
                    //             message: data.message,
                    //             type: 'error'
                    //         });
                    //     }
                    // })

                    this.axios.post("http://localhost:8081/user/register",this.ruleForm).then((resp)=>{
                        let data = resp.data;
                        if(data.success){
                            this.$message({
                                message: data.message,
                                type: 'success'
                            });
                            //  vue页面跳转
                            this.$router.push({path:"/login"})
                            location.reload();
                        }else {
                            this.$message({
                                message: data.message,
                                type: 'error'
                            });
                        }
                    })
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>