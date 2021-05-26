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


new Vue({
  vuetify,
  store,
  router,
  // axios,
  render: h => h(App)
}).$mount('#app')