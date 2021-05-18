<template>
  <div class="wrapper">
    <v-card class="login pa-6">
      <v-card-title>安居智慧物业系统，请先登录</v-card-title>
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
            @keyup="onAccountKeyup"
            @keydown="onAccountKeydown"
            v-model="account"
          ></v-text-field>
          <v-text-field
            :type="showpsw ? 'text' : 'password'"
            label="密码"
            :append-icon="showpsw ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showpsw = !showpsw"
            maxlength="16"
            hint="6-16位的字符、数字和下划线"
            :rules="[rules.password]"
            prepend-icon="mdi-lock-outline"
            @keyup="onPasswordKeyup"
            @keydown="onPasswordKeydown"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn color="primary" large tile depressed class="mb-2" @click="login">
          登录
        </v-btn>
        <v-spacer></v-spacer>
        <v-checkbox v-model="remember" label="记住密码"></v-checkbox>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  validAccountKeyup,
  accountKeydownIsValid,
  validPasswordKeyup,
  passwordKeydownIsValid
} from "@/utils/checkValidate.js";
export default {
  name: "Login",
  data: () => ({
    showpsw: false,
    account: "",
    password: "",
    remember: false,
    rules: {
      account: (value) => (value!= null && value.length == 11) || "请输入正确格式的手机号",
      password: (value) => value.length >= 6 || "请输入正确格式的密码",
    },
  }),
  methods: {
    onAccountKeyup: function () {
      var string = this.account;
      this.account = validAccountKeyup(string);
    },
    onAccountKeydown: function (event) {
      if (accountKeydownIsValid(event.keycode)) {
        event.preventDefault();
      }
    },
    onPasswordKeyup: function () {
      var string = this.password;
      this.password = validPasswordKeyup(string);
    },
    onPasswordKeydown: function (event) {
      if (passwordKeydownIsValid(event.keycode)) {
        event.preventDefault();
      }
    },
    login: function () {
      this.$store.commit("upgradeAccount", this.account);
      this.$router.push("home");
    },
  },
  computed: {},
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login {
  width: 450px;
}
</style>