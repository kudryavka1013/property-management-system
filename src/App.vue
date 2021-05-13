<template>
  <v-app>
    <layout/>
    <v-main id="app">
      <!-- 过渡动画，先滑出旧元素再滑入新元素，原本会有旧元素占位的bug -->
      <v-slide-x-transition mode="out-in" appear>
        <!-- 主页面 -->
        <keep-alive>
          
          <router-view></router-view>
          
        </keep-alive>
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import layout from './layout/layout.vue';
axios
  .get("/api/json", {
    params: {},
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
export default {
  components: { layout },
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
};
</script>

<style lang="scss" scoped>
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
