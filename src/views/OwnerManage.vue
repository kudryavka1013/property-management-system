<template>
  <v-card tile class="ma-4">
    <v-card-title class="mx-2">
      <span>业主管理</span>
      <v-btn
        icon
        class="ms-2"
        color="primary"
        :loading="isLoading"
        @click="refreshTable"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <owner-info-table
      :dataset="ownerInfo"
      :search="search"
      :isLoading="isLoading"
    >
    </owner-info-table>
  </v-card>
</template>

<script>
import OwnerInfoTable from "../components/OwnerInfoTable.vue";
import { apiAdminFindAllOwner } from '../config/api';
export default {
  name: "OwnerManage",
  components: {
    OwnerInfoTable,
  },
  data: () => ({
    ownerInfo: [],
    search: "",
    isLoading: false,
  }),
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  methods: {
    refreshTable: function () {
      this.isLoading = true;
      this.ownerReq()
    },
    ownerReq: function () {
      var that = this;
      apiAdminFindAllOwner()
        .then((res) => {
          console.log(res);
          that.ownerInfo = res.results;
          that.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          that.isLoading = false;
        });
    },
  },
  mounted: function () {
    this.isLoading = true;
    this.ownerReq();
  },
};
</script>

<style>
</style>