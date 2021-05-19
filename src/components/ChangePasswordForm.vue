<template>
  <!-- 这里应该可以封装起来复用 -->
  <div>
    <span>请确认账号无误并修改密码</span>
    <v-text-field
      type="text"
      autofocus
      readonly
      prefix="账号"
      prepend-icon="mdi-account-outline"
      v-model="account"
      :disabled="isLoading"
    ></v-text-field>
    <v-text-field
      :type="showopsw ? 'text' : 'password'"
      label="当前密码"
      v-model="opassword"
      :append-icon="showopsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showopsw = !showopsw"
      prepend-icon="mdi-lock-outline"
      hint="6-16位的字母、数字、字符和下划线"
      required
      :rules="[rules.password]"
      @keyup="onOpasswordKeyup"
      @keydown="onOpasswordKeydown"
      :disabled="isLoading"
    ></v-text-field>
    <v-text-field
      :type="shownpsw ? 'text' : 'password'"
      label="新密码"
      v-model="npassword"
      :append-icon="shownpsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="shownpsw = !shownpsw"
      prepend-icon="mdi-lock-reset"
      hint="6-16位的字母、数字、字符和下划线"
      required
      :rules="[rules.password]"
      @keyup="onNpasswordKeyup"
      @keydown="onNpasswordKeydown"
      :disabled="isLoading"
    ></v-text-field>
    <v-text-field
      :type="showcpsw ? 'text' : 'password'"
      label="确认密码"
      v-model="cpassword"
      :append-icon="showcpsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showcpsw = !showcpsw"
      prepend-icon="mdi-lock-check-outline"
      hint="6-16位的字母、数字、字符和下划线"
      required
      :rules="[rules.password]"
      @keyup="onCpasswordKeyup"
      @keydown="onCpasswordKeydown"
      :error-messages="inconsistent ? '两次输入不一致' : ''"
      :disabled="isLoading"
    ></v-text-field>
    <v-btn
      color="primary"
      block
      large
      tile
      depressed
      class="mt-4 btn"
      @click="$emit('formsubmit', userinput)"
      :loading="isLoading"
      :disabled="isLoading"
    >
      {{ btnTitle }}
    </v-btn>
  </div>
</template>

<script>
import {
  validPasswordKeyup,
  passwordKeydownIsValid,
} from "@/utils/checkValidate.js";
export default {
  name: "ChangePasswordForm",
  props: ["account", "btnTitle", "isLoading"],
  data: () => ({
    showopsw: false,
    shownpsw: false,
    showcpsw: false,
    opassword: "",
    npassword: "",
    cpassword: "",
    inconsistent: false,
    rules: {
      password: (value) => value.length >= 6 || "请输入正确格式的密码",
    },
  }),
  computed: {
    userinput() {
      return {
        account: this.account,
        opassword: this.opassword,
        npassword: this.npassword,
        cpassword: this.cpassword,
      };
    },
  },
  methods: {
    onOpasswordKeyup: function () {
      var string = this.opassword;
      this.opassword = validPasswordKeyup(string);
    },
    onOpasswordKeydown: function (event) {
      if (passwordKeydownIsValid(event.keycode)) {
        event.preventDefault();
      }
    },
    onNpasswordKeyup: function () {
      var string = this.npassword;
      this.npassword = validPasswordKeyup(string);
      if (this.cpassword != this.npassword) {
        this.inconsistent = true;
      } else {
        this.inconsistent = false;
      }
    },
    onNpasswordKeydown: function (event) {
      if (passwordKeydownIsValid(event.keycode)) {
        event.preventDefault();
      }
    },
    onCpasswordKeyup: function () {
      var string = this.cpassword;
      this.cpassword = validPasswordKeyup(string);
      if (this.cpassword != this.npassword) {
        this.inconsistent = true;
      } else {
        this.inconsistent = false;
      }
    },
    onCpasswordKeydown: function (event) {
      if (passwordKeydownIsValid(event.keycode)) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
</style>