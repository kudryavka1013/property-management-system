<template>
  <div>
    <!-- 侧边导航栏 -->
    <v-navigation-drawer app>
      <!-- 导航栏标题 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 什么辣鸡Web应用 </v-list-item-title>
          <v-list-item-subtitle> 我写的辣鸡玩意 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group mandatory>
          <v-list-item
            :to="item.route"
            v-for="(item, i) in navigation"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
          
        </v-list-item-group>
        <v-list-group  no-action prepend-icon="mdi-home">
          <template v-slot:activator>
            <v-list-item-title>一级菜单</v-list-item-title>
          </template>
          <v-list-group sub-group >
            <template v-slot:activator>
              <v-list-item-content>
              <v-list-item-title>二级菜单</v-list-item-title>
            </v-list-item-content>
            </template>
            <v-list-item>
              <v-list-item-title>1234</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>1234</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>1234</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import navigation from "../config/navigation";
export default {
  name: "layout",
  data: () => ({
    navigation: navigation,
  }),
};
</script>

<style scoped>
</style>