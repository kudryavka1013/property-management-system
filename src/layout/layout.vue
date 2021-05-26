<template>
  <div>
    <!-- 侧边导航栏 -->
    <v-navigation-drawer app v-model="drawer" v-if="showLayout">
      <!-- 导航栏标题 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>安居小区管理系统</v-list-item-title>
          <v-list-item-subtitle> 欢迎，{{ username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group mandatory color="primary">
          <v-list-item
            :to="item.route"
            v-for="(item, i) in navigation"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- 顶部标题栏 -->
    <v-app-bar app v-if="showLayout">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>欢迎</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn tile depressed v-on="on" @click="logout" class="logout-btn">
            <v-icon left>mdi-logout</v-icon>
            <span>退出登录</span>
          </v-btn>
        </template>
        <span>退出登录</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import navigation from "../config/navigation";
export default {
  name: "layout",
  computed: {
    showLayout() {
      switch (this.$route.name) {
        case "login":
        case "register":
          return false;
        default:
          return true;
      }
    },
    account() {
      return this.$store.state.account;
    },
    username() {
      return this.$store.state.username;
    },
  },
  data: () => ({
    drawer: null,
    navigation: navigation,
  }),
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.logout-btn:hover{
  color: #4CAF50;
}
</style>