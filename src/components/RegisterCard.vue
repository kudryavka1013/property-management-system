<template>
  <v-card class="register pa-6">
    <v-card-title>
      <v-btn icon @click="$emit('change-card', 'tologin')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span class="ms-4">新账号激活</span>
    </v-card-title>

    <v-card-text>
      <change-password-form btnTitle="激活" :account="account"/>
    </v-card-text>
  </v-card>
</template>

<script>
import ChangePasswordForm from "../ChangePasswordForm.vue";
export default {
  components: { ChangePasswordForm },
  name: "LoginCard",
  data: () => ({
      account: 1234
  }),
};
</script>

<style scoped>
.register {
  width: 450px;
}
</style>