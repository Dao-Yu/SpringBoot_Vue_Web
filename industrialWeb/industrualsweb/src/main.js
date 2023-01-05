import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'


//注册页面权限
import "@/router/permission"
//页面css初始化
import "@/assets/css/common.css"
//引入字体
import './assets/fonts/font.css'

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// VueAxios 与 axios 的位置不能交换，否则出现 TypeError: Cannot read property 'protocol' of undefined
Vue.use( VueAxios , axios)

// axios.defaults.withCredentials = true



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
