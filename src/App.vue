<template>
  <v-app>
    <layout />
    <v-main id="app">
        <!-- 主页面 -->
          <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import layout from './layout/layout.vue';
export default {
  components: { layout },
  data () {
      return {

      }
    },
};
</script>

<style scoped>

</style>
