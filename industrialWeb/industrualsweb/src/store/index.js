// import Vue from 'vue'
// import Vuex from 'vuex'
// import user from "@/store/modules/user";
//
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     user
//   }
// })

import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

Vue.use(Vuex)
const store =  new Vuex.Store({
  modules: {
    user
  },
  actions,
  mutations
})

export default store
