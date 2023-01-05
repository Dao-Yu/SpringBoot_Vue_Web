<template>
    <div class="publishDynamics">
        <span>发布动态</span>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="spaceImages" v-show="false">
                <el-input v-model="ruleForm.spaceImages"></el-input>
            </el-form-item>

            <div hidden>
                <span name="imgUrls"></span>
            </div>

            <el-form-item label="发布内容" prop="spaceData">
                <el-input type="textarea"  v-model="ruleForm.spaceData"></el-input>
            </el-form-item>

            <!--        图片上传-->
            <el-form-item label="上传图片">
                <el-upload
                        action="http://localhost:8081/user/upload"
                        list-type="picture-card"
                        accept=".png,.jpeg,.jpg"
                        :limit="1"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-exceed="handleExceed"
                        :before-upload="handleBeforeIpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>


    </div>

</template>

<script>
    //导入工具
    import storage from "@/util/storage";


    export default {
        name: "PublishDynamics",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                fileType: ["png", "jpg", "jpeg","image"],
                fileList:'',
                ruleForm: {
                    //图片地址
                    spaceImages:'',
                    //发布内容
                    spaceData: '',
                    //用户id
                    userId:'',
                    //用户账号
                    userName:"",
                    //用户昵称
                    userNickname:''
                },
            };
        },
        methods: {
            //上传成功后的回调函数
            handleSuccess(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw);
                let formData = new FormData();
                formData.append("file",file.raw);
                //将后端返回的图片地址存入fileList中
                let imgUrl = response.content;
                // this.fileList.push(imgUrl)
                this.fileList = imgUrl;
                this.$message({
                    message: '添加图片成功',
                    type: 'success'
                });
            },
            //上传之前
            handleBeforeIpload(file) {
                // let type  = ['image/jpeg','image/gif','image/png']
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!this.fileType) {
                    this.$message.error('上传的图片只能是 image、jepg、png、jpg 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传的图片大小不能超过 5MB!');
                }

                return this.fileType && isLt2M;
            },
            //上传图片个数限制
            handleExceed(files, fileList) {
                this.$message.warning(`只能选择上传一张图片`);
            },
            //删除上传的图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.$message({
                    message: '已取消添加',
                    type: 'success'
                });
            },
            //点击文件已上传的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //点击发布按钮事件
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //获取图片地址
                        let imgUrls = this.fileList
                        this.ruleForm.spaceImages = imgUrls;
                        //获取登录的用户id、昵称、账号
                        let LoginUser = storage.getSessionObject("loginUser");
                        //用户id
                        this.ruleForm.userId = LoginUser.sysUserVo.userId;
                        //用户账号
                        this.ruleForm.userName = LoginUser.sysUserVo.userName;
                        //用户昵称
                        this.ruleForm.userNickname = LoginUser.sysUserVo.nickName;
                        this.$store.dispatch("UPLOADS",this.ruleForm).then((resp)=>{
                            // console.log(resp.data.success)
                            if(resp.data.success){
                                // this.$refs[formName].resetFields();
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                //刷新页面
                                location.reload();
                            }else {
                                this.$message.error('发布时出现了错误...');
                            }
                        })
                    } else {
                        this.$message.error('发生了错误，不能发布哦！');
                        return false;
                    }
                });
            },

            //重置按钮
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    .publishDynamics span{
        font-size: 24px;
        font-weight: 700;
    }
    .input_textarea{
        width: 100%;
        /*min-height: 200px;*/
        /*height: auto;*/
        /*max-height: 500px;*/
        /*height: 500px;*/
        /*background-color: red;*/

        border-radius: 10px;
        border-color: #777777;
    }

</style>