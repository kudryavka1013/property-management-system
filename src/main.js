import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'https://www.fastmock.site/mock/10d77a2256638358995afacbffc337c3/anj';


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')