<template>
  <div>
    <userinfo-card
      v-on:changeview="changeview"
      class="user-info"
      v-bind="userinfo"
    ></userinfo-card>
    <v-card tile class="ma-4 py-2 px-2 card" v-if="currentTab">
      <v-card-title>
        <span>{{ tabsName[currentTab] }}</span>
        <v-spacer></v-spacer>
        <v-btn icon large @click="changeview('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component
          :is="tabs[currentTab]"
          v-bind="componentData"
          v-on:formsubmit="formclick"
        ></component>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserinfoCard from "@/components/UserinfoCard.vue";
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";
import ChangeUserinfoForm from "@/components/ChangeUserinfoForm.vue";
import {
  checkAccountValid,
  checkPasswordValid,
  checkUsernameValid,
} from "@/utils/checkValidate";
import { apiChangePassword, apiChangeUserinfo } from "@/config/api.js";
export default {
  name: "Settings",
  components: {
    UserinfoCard,
    ChangePasswordForm,
    ChangeUserinfoForm,
  },
  data: () => ({
    tabs: ["", "ChangePasswordForm", "ChangeUserinfoForm"],
    tabsName: ["", "修改密码", "修改个人信息"],
    currentTab: 0,
    isLoading: false,
  }),
  methods: {
    changeview: function (event) {
      switch (event) {
        case "change-userinfo":
          this.currentTab = 2;
          break;
        case "change-password":
          this.currentTab = 1;
          break;
        case "close":
          this.currentTab = 0;
      }
    },
    formclick: function (userinput) {
      switch (this.currentTab) {
        case 1:
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
            this.changePasswordReq(userinput);
          } else {
            alert("请检查你的输入");
          }
          break;
        case 2:
          var usernameIsValid = checkUsernameValid(userinput.nusername);
          if (usernameIsValid) {
            this.isLoading = true;
            this.changeUserinfoReq(userinput);
          } else {
            alert("请检查你的输入");
          }
          break;
      }
    },
    changePasswordReq: function (userinput) {
      //change password
      let that = this;
      apiChangePassword({
        id: userinput.account,
        password: userinput.opassword,
        npassword: userinput.npassword,
      })
        .then((res) => {
          that.isLoading = false;
          //判断是否成功，执行相应操作
          if (res.msg == "success") {
            that.changePasswordSuccess();
          } else {
            that.changeFail();
          }
        })
        .catch((err) => {
          that.isLoading = false;
          console.log(err);
          alert("修改超时，请检查您的网络设置");
        });
    },
    changePasswordSuccess: function () {
      alert("修改成功，请重新登录");
      // this.isLoading = false;
      this.$store.commit("upgradeAccount", "");
      this.$store.commit("upgradeUsername", "");
      this.$store.commit("logout");
      this.$router.push("login");
    },
    changeUserinfoReq: function (userinput) {
      //change userinfo
      let that = this;
      apiChangeUserinfo({
        id: userinput.account,
        nusername: userinput.nusername,
      })
        .then((res) => {
          that.isLoading = false;
          if (res.msg == "success") {
            that.changeUserinfoSuccess(res.result);
          } else {
            that.changeFail();
          }
        })
        .catch((err) => {
          that.isLoading = false;
          console.log(err);
          alert("修改超时，请检查您的网络设置");
        });
    },

    changeUserinfoSuccess: function (result) {
      alert("修改成功");
      this.$store.commit("upgradeUsername", result.username);
      this.$router.push("user");
    },
    changeFail: function () {
      alert("修改失败，请检查输入");
    },
  },
  computed: {
    userinfo() {
      return {
        account: this.$store.state.account,
        username: this.$store.state.username,
        accountType: this.$store.state.accountType
      };
    },
    componentData() {
      return {
        btnTitle: "确认修改",
        account: this.$store.state.account,
        username: this.$store.state.username,
        isLoading: this.isLoading,
      };
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 450px;
  max-width: 450px;
}
.user-info {
  min-width: 450px;
}
</style>