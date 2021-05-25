<template>
  <div class="wrapper">
    <v-card tile class="login px-6 py-2">
      <v-card-title class="mb-4">
        <v-icon large color="green">mdi-home-city-outline</v-icon>
        <span class="ms-4">安居小区管理系统，请先登录</span>
      </v-card-title>
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
            :disabled="isLoading"
          ></v-text-field>
          <v-text-field
            :type="showpsw ? 'text' : 'password'"
            label="密码"
            :append-icon="showpsw ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showpsw = !showpsw"
            maxlength="16"
            hint="6-16位的字母、数字、字符和下划线"
            :rules="[rules.password]"
            prepend-icon="mdi-lock-outline"
            @keyup="onPasswordKeyup"
            @keydown="onPasswordKeydown"
            v-model="password"
            :disabled="isLoading"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn
          color="primary"
          large
          depressed
          tile
          @click="login"
          :loading="isLoading"
          :disabled="isLoading"
        >
          登 录
        </v-btn>
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="remember"
          label="记住密码"
          :disabled="isLoading"
        ></v-checkbox>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  validAccountKeyup,
  accountKeydownIsValid,
  validPasswordKeyup,
  passwordKeydownIsValid,
  checkAccountValid,
  checkPasswordValid,
} from "@/utils/checkValidate.js";

export default {
  name: "Login",
  data: () => ({
    showpsw: false,
    isLoading: false,
    account: "",
    password: "",
    remember: false,
    rules: {
      account: (value) =>
        (value != null && value.length == 11) || "请输入正确格式的手机号",
      password: (value) => value.length >= 6 || "请输入正确格式的密码",
    },
  }),
  methods: {
    // 输入验证
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
      // 判断用户输入是否符合要求
      var accountIsValid = checkAccountValid(this.account);
      var passwordIsValid = checkPasswordValid(this.password);
      // console.log(accountIsValid)
      // console.log(passwordIsValid)
      if (accountIsValid && passwordIsValid) {
        this.isLoading = true;
        this.loginreq(this.account, this.password);
      } else {
        alert("请检查你的输入");
      }
    },
    loginreq: function (act, psw) {
      //login
      let that = this;
      this.$axios({
        method: "post",
        url: "/owner/login",
        data: {
          id: act,
          password: psw,
        },
      })
        .then(function (response) {
          that.isLoading = false;
          // console.log(response)
          // 拿到username account和其它会话信息，去判断怎么响应
          if (response.data.msg == 'success') {
            that.loginsuccess(response.data);
          } else {
            that.loginfail();
          }
        })
        .catch(function (error) {
          that.isLoading = false;
          console.log(error);
          alert("登录超时，请检查您的网络设置");
        });
    },
    loginsuccess: function (data) {
      //记住密码功能，这里要在登录成功后执行
      if (this.remember) {
        localStorage.setItem("account", this.account);
        localStorage.setItem("password", this.password);
      } else {
        localStorage.removeItem("account");
        localStorage.removeItem("password");
      }
      this.$store.commit("upgradeAccount", data.result.id);
      this.$store.commit("upgradeUsername", data.result.username);
      this.$store.commit("login")
      if (data.result.init) {
        this.$router.push("register");
      } else {
        this.$store.commit("activate")
        this.$router.push("home");
      }
    },
    loginfail: function () {
      alert("账号或密码错误，请重新输入");
    },
    checkLocalRemember: function () {
      let raccount = localStorage.getItem("account");
      let rpassword = localStorage.getItem("password");
      if (raccount != null && rpassword != null) {
        this.account = raccount;
        this.password = rpassword;
        this.remember = true;
      }
    },
  },
  computed: {},
  created: function () {
    this.checkLocalRemember();
  },
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