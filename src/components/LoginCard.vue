<template>
  <v-card class="login pa-6">
    <v-card-title>？系统，请先登录</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          type="text"
          label="账号"
          prepend-icon="mdi-account-outline"
          clearable
          hint="11位手机号"
          :rules="[rules.account]"
          maxlength="11"
        ></v-text-field>
        <v-text-field
          :type="showpsw ? 'text' : 'password'"
          label="密码"
          v-model="password"
          :append-icon="showpsw ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showpsw = !showpsw"
          maxlength="16"
          hint="6-16位的字符、数字和下划线"
          :rules="[rules.password]"
          prepend-icon="mdi-lock-outline"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="mx-2">
      <v-btn color="primary" large tile depressed class="mb-2" to="home">
        登录
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        large
        text
        tile
        class="mb-2"
        v-on:click="$emit('change-card', 'toregister')"
      >
        没有账号？注册
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginCard",
  data: () => ({
    showpsw: false,
    rules: {
      account: (value) => value.length == 11 || "请输入正确格式的手机号",
      password: (value) => value.length >= 6 || "请输入正确格式的密码",
    },
  }),
  methods: {
    check: function () {},
  },
};
</script>

<style scoped>
.login {
  width: 450px;
}
</style>