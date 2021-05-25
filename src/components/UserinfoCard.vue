<template>
  <v-card class="ma-4 py-2 px-2" tile>
    <v-card-title class="mx-2">我的账户</v-card-title>
    <div class="px-4 pb-4 mx-2">
      <div class="mb-2">
        <span class="">用户名</span>
        <span>{{ username }}</span>
      </div>
      <div>
        <span class="">账号</span>
        <span>{{ account }}</span>
      </div>
    </div>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions class="ma-2">
      <v-btn
        tile
        text
        class="me-4"
        color="primary"
        @click="$emit('changeview', 'change-userinfo')"
        disabled
      >
        <v-icon left>mdi-account-edit-outline</v-icon>
        <span>修改个人信息</span>
      </v-btn>
      <v-btn
        tile
        text
        color="primary"
        @click="$emit('changeview', 'change-password')"
      >
        <v-icon left>mdi-shield-edit-outline</v-icon>
        <span>修改密码</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserinfoCard",
  props: ["account", "username"],
};
</script>

<style scoped>
.tit {
  font-weight: bold;
  font-size: 14px;
}
span {
  display: block;
}
</style>