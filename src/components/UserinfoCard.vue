<template>
  <v-card class="ma-4 py-2 px-2" tile>
    <v-card-title class="mx-2">我的账户</v-card-title>
    <div class="px-4 pb-4 mx-2">
      <div class="mb-2">
        <span class="tit">用户名</span>
        <span>用户名啊</span>
      </div>
      <div>
        <span class="tit">账号</span>
        <span>123412</span>
      </div>
    </div>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions class="ma-2">
      <v-btn tile text class="me-4" color="primary">
        <v-icon left>mdi-account-edit-outline</v-icon>
        <span>修改个人信息</span>
      </v-btn>
      <v-btn tile text color="primary">
          <v-icon left>mdi-shield-edit-outline</v-icon>
        <span>修改密码</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserinfoCard",
  props: ["userinfo"],
};
</script>

<style scoped>
.tit{
    font-weight: bold;
    font-size: 14px;
}
span {
  display: block;
}
</style>