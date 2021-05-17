import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import Vuex from 'vuex'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$axios = axios;

const store = new Vuex.Store({
  state: {
    account: '用户名',
  },
  mutations: {
    upgradeAccount(state,newAccount) {
      state.account = newAccount
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
