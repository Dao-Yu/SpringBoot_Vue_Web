<template>
   <div class="userFriends">

       <div class="userFriends-box">
           <el-table :data="tableData" style="width: 100%">

               <el-table-column prop="userFriendnicaname" label="我的关注" width="500"></el-table-column>

               <el-table-column prop="addTime" label="关注日期" fixed="right" width="220"></el-table-column>
               
               <el-table-column
                       fixed="right"
                       label="操作"
                       width="120">
                   <template slot-scope="scope">

                       <el-button
                               @click="handleEdit(scope.$index, scope.row)"
                               type="text"
                               size="small">
                           详情
                       </el-button>

                       <el-divider direction="vertical"></el-divider>

                       <el-button
                               @click="handleDelete(scope.$index, scope.row)"
                               type="text"
                               size="small">
                           删除
                       </el-button>


                   </template>
               </el-table-column>

           </el-table>
<!--           分页-->
           <div class="block">
               <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.query.page"
                       :page-size="this.query.size"
                       :page-sizes="[12, 20, 30 ]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.total">
               </el-pagination>
           </div>

       </div>
   </div>

</template>

<script>
    //导入工具
    import storage from "@/util/storage";

    export default {
        name: "UserFriends",
        data() {
            return {

                //分页
                total:0,
                query:{
                    page:1,
                    size:12,
                },
                user:{
                    //用户id
                    userId:storage.getSessionObject("loginUser").sysUserVo.userId,
                    //用户账号
                    userName:storage.getSessionObject("loginUser").sysUserVo.userName,
                },
                tableData: []
            }
        },
        methods: {
            //查询用户好友
            getUserFriends(){
                this.axios.get("http://localhost:8081/user/userFriends",{
                    params:{
                        userName:this.user.userName,
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then((resp)=>{
                    // console.log(resp.data.content.sysUserfriends)
                    this.total = resp.data.content.total;
                    this.tableData = resp.data.content.sysUserfriends;
                })
            },
            //分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.size = val;
                this.getUserFriends();
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.page = val;
                this.getUserFriends();
            },

            //查看详情
            handleEdit(index, row) {
                let userName = row.userFriendname;
                if(userName===null){
                    this.$message.error('出现了错误！');
                }else{
                    storage.saveSessionString("UserFriendUserName",userName);
                    this.$router.push({path:"userShowFriend"});
                }

            },

            //删除
            handleDelete(index, row) {
                // console.log(row.userFriendname);
                let userName = row.userName;
                let userFriendname = row.userFriendname;
                this.axios.get("http://localhost:8081/user/deleteUserFriend",{
                    params:{
                        userName:userName,
                        userFriendname:userFriendname
                    }
                }).then((resp)=>{
                    // console.log(resp.data.success);
                    if(resp.data.success){
                        this.$message({
                            showClose: true,
                            message: resp.data.message
                        });

                        this .getUserFriends();
                    }else{
                        this.$message({
                            showClose: true,
                            message: resp.data.message,
                            type: 'error'
                        });
                    }
                })
            },


        },
        //自动执行
        mounted() {
            this.getUserFriends();
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
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content-left {
        text-align: center;
        border-radius: 4px;
        min-height: 100px;
    }
    .grid-content-right{
        border-radius: 4px;
        min-height: 100px;

    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .divspan{
        padding-top:20px;
        padding-left: 10px;
    }
    .userFriends{
        width: 100%;
        height: 900px;
        /*height: 100%  ;*/
        overflow-y:auto;
        overflow-x:auto;
    }
    /*滚动条样式*/
    // 滚动条整体部分，可以设置宽度啥的
    .userFriends::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
    }
    //滚动的滑块
    .userFriends::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    // 外层轨道
    .userFriends::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .block{
        float: right;
    }
</style>