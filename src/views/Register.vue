<template>
  <div class="wrapper">
    <v-card class="register pa-6">
      <v-card-title>
        <v-btn icon to="login">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span class="ms-4">新账号激活</span>
      </v-card-title>

      <v-card-text>
        <change-password-form btnTitle="激活" :account="account" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";
export default {
  name: "Register",
  components: { ChangePasswordForm },
  data: () => ({
    account: 1234,
  }),
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