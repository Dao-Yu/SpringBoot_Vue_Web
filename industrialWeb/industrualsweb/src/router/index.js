import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/main/HomeView.vue'
import Layout from "@/views/Layout.vue";
import Login from '../views/main/login/Login.vue'
import Register from '../views/main/login/Register.vue'
import UserDynamics from "@/views/main/user/UserDynamics.vue";
import PublishDynamics from "@/views/main/user/PublishDynamics.vue";
import UpdataUserInfo from "@/views/main/user/UpdataUserInfo.vue";
import UserLayout from "@/views/main/usershow/UserLayout.vue";
import UserFriends from "@/views/main/usershow/UserFriends.vue";
import UserCenter from "@/views/main/usershow/UserCenter.vue";
import UserShowFriend from "@/views/main/usershow/UserShowFriend.vue";
import SearchFriend from "@/views/main/usershow/SearchFriend.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        //主页显示
        path: '',
        name: 'home',
        component: HomeView,
        meta:{
          isLogin:true
        }
      },
      {
        //用户个人动态
        path: '/userDynamics',
        name: 'UserDynamics',
        component: UserDynamics,
        meta:{
          isLogin:true
        }
      },
      {
        //发布动态
        path: '/publishDynamics',
        name: 'PublishDynamics',
        component: PublishDynamics,
        meta:{
          isLogin:true
        }
      },
      {
        //用户信息修改
        path: '/updateUserInfo',
        name: 'UpdataUserInfo',
        component: UpdataUserInfo,
        meta:{
          isLogin:true
        }
      },
      {
        //  用户好友列表显示页
        path: '/userFriends',
        name: 'UserFriends',
        component: UserFriends,
        meta:{
          isLogin:true
        }
      },
      {
        //  用户消息列表
        path: '/userCenter',
        name: 'UserCenter',
        component: UserCenter,
        meta:{
          isLogin:true
        }
      },
      {
        //用户页面中的好友列表
        path: '/userLayout',
        name: 'UserLayout',
        component: UserLayout,
        meta:{
          isLogin:true
        }
      },
      {
        //用户好友详情显示页及好友动态
        path: '/userShowFriend',
        name: 'UserShowFriend',
        component: UserShowFriend,
        meta: {
          isLogin: true
        }
      },
      {
        //用户搜索好友
        path: '/searchFriend',
        name: 'SearchFriend',
        component: SearchFriend,
        meta: {
          isLogin: true
        }
      }
    ]
  },

  {
    //登录页面
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    //注册页面
    path: '/register',
    name: 'Register',
    component: Register
  }

]

const router = new VueRouter({
  routes
})



Vue.use(VueRouter)
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

export default router
