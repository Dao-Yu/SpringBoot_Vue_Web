<template>
    <div>
<!--        <p>用户信息修改</p>-->
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>

<!--            用户信息修改-->
            <el-tab-pane label="用户信息修改" name="first">

                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickName"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">点击修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>

                </el-form>

            </el-tab-pane>

<!--            用户修改头像-->
            <el-tab-pane label="用户头像修改" name="second">
                <div>
                    <el-form ref="form" :model="formimgUrl" label-width="35%">

                        <el-form-item label="活动名称" prop="spaceImages" v-show="false">
                            <el-input v-model="formimgUrl.avatar"></el-input>
                        </el-form-item>

                        <el-form-item >
                            <el-upload
                                    action="http://localhost:8081/user/upload"
                                    list-type="picture-card"
                                    accept=".png,.jpeg,.jpg"
                                    :limit="1"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="handleSuccess"
                                    :on-exceed="handleExceed"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>

                        <el-form-item >
                            <el-button type="primary" @click="onUpdateAvatar">确认修改头像</el-button>
                        </el-form-item>

                    </el-form>

                </div>

            </el-tab-pane>


        </el-tabs>
    </div>
</template>

<script>
    //导入工具
    import storage from "@/util/storage";

    export default {
        name: "UpdataUserInfo",
        data() {
            return {
                activeName: 'first',
                //用户信息修改
                form: {
                    userName:'',
                    nickName: '',
                    email:'',
                },
                //用户头像修改
                dialogImageUrl: '',
                dialogVisible: false,
                //用户上传图片的url
                formimgUrl:{
                    userName:'',
                    avatar:''
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            //用信息修改
            onSubmit() {
                // console.log(this.form);
                //获取登录的账号
                let LoginUser = storage.getSessionObject("loginUser");
                this.form.userName = LoginUser.sysUserVo.userName;

                //调用方法修改用户基本信息
                this.$store.dispatch("UPDATEUSER",this.form).then((resp)=>{
                    // console.log(resp.data.success);
                    if(resp.data.success){
                        this.$message({
                            message: resp.data.message,
                            type: 'success'
                        });
                        //刷新页面
                        location.reload();
                    }else {
                        this.$message({
                            message: resp.data.message,
                            type: 'error'
                        });
                    }
                })

            },
            //修改用户头像
            onUpdateAvatar(){
                // console.log(this.formimgUrl)
                //获取登录的账号
                let LoginUser = storage.getSessionObject("loginUser");
                this.formimgUrl.userName = LoginUser.sysUserVo.userName;
                // console.log(this.formimgUrl)
                //调用方法对头像进行修改
                this.$store.dispatch("UPDATEAVATAR",this.formimgUrl).then((resp)=>{
                    // console.log(resp.data.message)
                    // console.log(resp.data.success)
                    if(resp.data.success){
                        this.$message({
                            message: resp.data.message,
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: resp.data.message,
                            type: 'error'
                        });
                    }
                })
            },
            //用户头像修改
            //上传成功后的回调函数
            handleSuccess(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw);

                // console.log("返回的值为："+response.content)
                let avatarUrl = response.content;
                this.formimgUrl.avatar = avatarUrl;

                this.$message({
                    message: '添加图片成功',
                    type: 'success'
                });
            },
            //上传图片个数限制
            handleExceed(files, fileList) {
                this.$message.warning(`只能选择上传一张图片`);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style scoped lang="less">
    //用户头像修改
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>