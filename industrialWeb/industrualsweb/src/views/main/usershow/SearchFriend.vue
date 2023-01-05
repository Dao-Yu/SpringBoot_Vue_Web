<template>
    <div class="home-box">
<!--        搜索-->
        <div class="search-box">

            <el-row>

                <el-col :span="8"><div class="grid-content bg-purple">
                    <div class="search-title" v-show="flag">
                        <el-page-header @back="goBack">
                        </el-page-header>
                    </div>
                </div></el-col>

                <el-col :span="8"><div class="grid-content bg-purple-light">
                    <div class="input-search">
                        <el-input
                                placeholder="输入用户昵称或者“all”"
                                prefix-icon="el-icon-search"
                                v-model="inputText">
                        </el-input>
                    </div>
                </div></el-col>

                <el-col :span="8"><div class="grid-content bg-purple">
                    <div class="button-box">
                        <button @click="selectFriend">搜索</button>
                    </div>
                </div></el-col>

            </el-row>

        </div>

<!--        空状态-->
        <div v-show="!flag">
            <el-empty description="空空如也"></el-empty>
        </div>

<!--        数据表格-->
        <div v-show="flag">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="nickName"
                        label="用户昵称"
                        width="400">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        prop="createTime"
                        width="120"
                        label="创建账号时间">
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="120">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--           分页-->
        <div class="block" v-show="flag">
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
</template>

<script>
    //导入工具
    import storage from "@/util/storage";

    export default {
        name: "SearchFriend",
        data(){
            return{
                //分页
                total:0,
                query:{
                    page:1,
                    size:12,
                },
                //输入框的数据
                inputText:'',
                //控制返回按键是否显示
                flag:false,
                //数据
                tableData: []
            }
        },
        methods:{
            //搜索所有用户或者一个用户
            selectFriend(){
                // console.log(this.inputText)
                let nickName = this.inputText;
                this.axios.get("http://localhost:8081/user/getuserList",{
                    params:{
                        nickName: nickName,
                        page: this.query.page,
                        size: this.query.size
                    }
                }).then((resp)=>{
                    // console.log(resp.data);
                    if(resp.data.success){
                        this.flag=true;
                        this.total = resp.data.content.total;
                        this.tableData = resp.data.content.userList;
                        this.$notify({
                            title: '成功',
                            message: '成功查询到数据',
                            type: 'success'
                        });
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: resp.data.message,
                        });
                    }
                })

            },
            //分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.size = val;
                this.selectFriend();
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.page = val;
                this.selectFriend();
            },
            //返回
            goBack() {
                this.flag=false;
                this.tableData = []
                // console.log('go back');
            },
            //查看详情
            handleEdit(index, row) {
                // console.log(row.userName);
                let userName = row.userName;
                if(userName===null){
                    this.$message.error('出现了错误！');
                }else{
                    storage.saveSessionString("UserFriendUserName",userName);
                    this.$router.push({path:"userShowFriend"});
                }
            },

        },
    }
</script>

<style scoped lang="less">
.home-box{
    width: 100%;
    height: 900px;
    /*height: 100%  ;*/
    overflow-y:auto;
    overflow-x:auto;
}
.bg-purple {
    /*background: #d3dce6;*/
}
.bg-purple-light {
    /*background: #e5e9f2;*/
}
.grid-content {
    border-radius: 4px;
    min-height: 50px;
    line-height: 50px;
}
//搜索
.search-box{
    width: 100%;
    height: 50px;
    /*background: #42b983;*/
    line-height: 50px;

    .search-title{
        margin-top: 10px;

    }
    .input-search{
        width: 100% ;
    }
    .button-box{
        text-align: center;
        button{
            width: 150px;
            height: 40px;
            border: none;
            background: #409EFF;
            color: white;
            border-radius: 10px;
        }
    }
}
.block{
    margin-top: 20px;
    float: right;
}
</style>