<template>
  <div>
    <v-text-field
      type="text"
      autofocus
      readonly
      prefix="当前用户名"
      prepend-icon="mdi-account-outline"
      v-model="username"
      :disabled="isLoading"
    ></v-text-field>
    <v-text-field
      type="text"
      prefix="新的用户名"
      prepend-icon="mdi-account-outline"
      v-model="nusername"
      :disabled="isLoading"
      :rules="[rules.username]"
      hint="2-8位"
      maxlength="8"
    ></v-text-field>
    <v-btn
      color="primary"
      block
      large
      tile
      depressed
      class="mt-4"
      @click="$emit('formsubmit', userinput)"
      :loading="isLoading"
      :disabled="isLoading"
    >
      {{ btnTitle }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ChangeUserinfoForm",
  data: () => ({
    nusername: "",
    rules: {
      username: (value) => value.length >= 2 || "请输入正确格式的用户名",
    },
  }),
  props: ["btnTitle", "isLoading", "username", "account"],
  computed: {
    userinput() {
      return {
        account: this.account,
        nusername: this.nusername,
      };
    },
  },
};
</script>

<style>
</style>