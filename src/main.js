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
axios.defaults.baseURL = 'https://www.fastmock.site/mock/10d77a2256638358995afacbffc337c3/anj';

const store = new Vuex.Store({
  state: {
    account: '',
    username: '',
    isLogin: false,
  },
  mutations: {
    upgradeAccount(state, newAccount) {
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