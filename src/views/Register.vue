<template>
  <div class="wrapper">
    <v-card tile class="register px-6 py-4">
      <v-card-title>
        <v-btn icon to="login">
          <v-icon color="primary">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="ms-4">新账号激活</span>
      </v-card-title>

      <v-card-text>
        <change-password-form
          btnTitle="激活"
          :account="account"
          v-on:formsubmit="formclick"
          :isLoading="isLoading"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { checkAccountValid, checkPasswordValid } from "@/utils/checkValidate";
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";
export default {
  name: "Register",
  components: { ChangePasswordForm },
  data: () => ({
    isLoading: false,
  }),
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  methods: {
    formclick: function (userinput) {
      var accountIsValid = checkAccountValid(userinput.account);
      var opasswordIsValid = checkPasswordValid(userinput.opassword);
      var npasswordIsValid = checkPasswordValid(userinput.opassword);
      var cpasswordIsValid = checkPasswordValid(userinput.cpassword);
      if (
        accountIsValid &&
        opasswordIsValid &&
        npasswordIsValid &&
        cpasswordIsValid &&
        userinput.npassword == userinput.cpassword
      ) {
        this.isLoading = true;
        this.registerreq(userinput);
      } else {
        alert("请检查你的输入");
      }
    },
    registerreq: function (userinput) {
      //register
      let that = this;
      this.$axios({
        method: "post",
        url: "/owner/register",
        data: {
          id: userinput.account,
          password: userinput.opassword,
          npassword: userinput.npassword,
        },
      })
        .then(function (response) {
          that.isLoading = false;
          console.log(response)
          //判断是否成功，执行相应操作
          if (response.data.msg == "success") {
            that.registersuccess();
          } else {
            that.registerfail();
          }
        })
        .catch(function (error) {
          that.isLoading = false;
          console.log(error);
          alert("激活超时，请检查您的网络设置");
        });
    },
    registersuccess: function () {
      alert("修改成功，请重新登录");
      this.isLoading = false;
      this.$store.commit("upgradeAccount", "");
      this.$router.push("login");
    },
    registerfail: function () {
      alert("密码错误，请重新输入");
    },
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
.register {
  width: 450px;
}
</style>