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
            @keyup="checkAccountKeyup"
            @keydown="checkAccountKeydown"
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
            @keyup="checkPasswordKeyup"
            @keydown="checkPasswordKeydown"
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
export default {
  name: "Login",
  data: () => ({
    showpsw: false,
    account: "",
    password: "",
    remember: false,
    rules: {
      account: (value) => value.length == 11 || "请输入正确格式的手机号",
      password: (value) => value.length >= 6 || "请输入正确格式的密码",
    },
  }),
  methods: {
    checkAccountKeyup: function () {
      if (this.account != null) {
        var str = "";
        for (let i = 0; i < this.account.length; i++) {
          var charCode = this.account.charCodeAt(i);
          if (charCode >= 48 && charCode <= 57) {
            str += this.account.charAt(i);
          }
        }
        this.account = str;
      }
    },
    checkAccountKeydown: function (event) {
      var keyCode = event.keyCode;
      if (!(keyCode >= 48 && keyCode <= 57) && !(keyCode == 8)) {
        event.preventDefault();
      }
    },
    checkPasswordKeyup: function () {
      if (this.password != null) {
        var str = "";
        for (let i = 0; i < this.password.length; i++) {
          var charCode = this.password.charCodeAt(i);
          if (charCode >= 33 && charCode <= 127) {
            str += this.password.charAt(i);
          }
        }
        this.password = str.slice(0, 16);
      }
    },
    checkPasswordKeydown: function (event) {
      console.log(event);
      var keyCode = event.keyCode;
      if (!(keyCode >= 33 && keyCode <= 127) && !(keyCode == 8)) {
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