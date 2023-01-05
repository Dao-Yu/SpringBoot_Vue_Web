import {toLogin,toLogOut,toRegister,toUploads,UpdateAvatar,UpdateUser} from "@/api/user/index.js"
//导入工具
import storage from "@/util/storage";
import {getUserDynamicsList} from "@/api/user/index";
const user={
    state:{
        userName:'',
        nickName:'',
        token:''
    },
    getters:{

    },
    mutations:{
        SAVE_USERNAME(state,userName){
            state.userName=userName
        },
        SAVE_NICKNAME(state,nickName){
            state.nickName=nickName
        },
        SAVE_TOKEN(state,token){
            state.token=token
        },
    },
    actions:{
        //登录
        LOGIN({commit},user){
            return new Promise(function (resolve) {
                toLogin(user).then(resp=>{
                    //需要将获取的数据保存起来
                    if(resp.data.success===true){
                        commit("SAVE_USERNAME",resp.data.content.sysUserVo.userName);
                        commit("SAVE_NICKNAME",resp.data.content.sysUserVo.nickName);
                        commit("SAVE_TOKEN",resp.data.content.token);
                        //将整个用户信息保存到storage
                        storage.saveSessionObject("loginUser",resp.data.content)
                        resolve(resp);
                    }else {
                        return false;
                    }

                })
            })
        },
        //登出
        LOGOUT({commit},){
            return new Promise(function (resolve) {
                toLogOut().then(resp=>{
                    //需要将获取的数据保存起来
                    // console.log(resp)
                    if(resp.data.success===true){
                        commit("SAVE_USERNAME",'');
                        commit("SAVE_NICKNAME",'');
                        commit("SAVE_TOKEN",'');
                        //将整个用户信息保存到storage
                        storage.remove("loginUser")
                        resolve(resp);
                    }else {
                        return false;
                    }

                })
            })
        },
        //注册
        REGISTER({commit},user){
            return new Promise(function (resolve) {
                toRegister(user).then(resp=>{
                    //需要将获取的数据保存起来
                    // console.log(resp)
                    if(resp.data.success===true){
                        //将整个用户信息保存到storage
                        storage.saveSessionObject("registerUser",resp.data.content)
                        resolve(resp);
                    }else {
                        return false;
                    }

                })
            })
        },
        //上传图片
        UPLOADS({commit},data){
            return new Promise(function (resolve) {
                toUploads(data).then(resp=>{
                    resolve(resp);
                })
            })
        },
        //修改头像
        UPDATEAVATAR({commit},user){
            return new Promise(function (resolve) {
                UpdateAvatar(user).then((resp)=>{
                    resolve(resp)
                })
            })
        },
        //修改用户基本信息UpdateUser
        UPDATEUSER({commit},user){
            return new Promise(function (resolve) {
                UpdateUser(user).then((resp)=>{
                    resolve(resp)
                })
            })
        },

    }

}

export default user