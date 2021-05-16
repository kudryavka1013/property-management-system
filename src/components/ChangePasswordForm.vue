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
    ></v-text-field>
    <v-text-field
      :type="showopsw ? 'text' : 'password'"
      label="当前密码"
      v-model="opassword"
      :append-icon="showopsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showopsw = !showopsw"
      prepend-icon="mdi-lock-outline"
      hint="6-16位的字符、数字和下划线"
      required
    ></v-text-field>
    <v-text-field
      :type="shownpsw ? 'text' : 'password'"
      label="新密码"
      v-model="npassword"
      :append-icon="shownpsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="shownpsw = !shownpsw"
      prepend-icon="mdi-lock-reset"
      hint="6-16位的字符、数字和下划线"
      required
    ></v-text-field>
    <v-text-field
      :type="showcpsw ? 'text' : 'password'"
      label="确认密码"
      v-model="cpassword"
            :append-icon="showcpsw ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showpsw = !showpsw"
      prepend-icon="mdi-lock-check-outline"
      hint="6-16位的字符、数字和下划线"
      required
    ></v-text-field>
    <v-btn color="primary" block large tile depressed class="mt-4 btn" @click="$emit('formclick')">
      {{ btnTitle }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordForm",
  props: ["account","opassword", "npassword", "cpassword", "btnTitle"],
  data: () => ({
    showopsw: false,
    shownpsw: false,
    showcpsw: false,
  }),
};
</script>

<style scoped>
</style>