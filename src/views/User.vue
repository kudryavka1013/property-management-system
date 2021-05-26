<template>
  <div>
    <v-card tile class="ma-4">
      <v-card-title class="mx-2">
        <span>房产管理</span>
        <v-btn
          icon
          class="ms-2"
          color="primary"
          :loading="isLoading"
          @click="refreshTable"
          ><v-icon>mdi-refresh</v-icon></v-btn
        >
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <real-estate-info-table
        :dataset="realEstateInfo"
        :search="search"
        :isLoading="isLoading"
      ></real-estate-info-table>
    </v-card>
  </div>
</template>

<script>
import RealEstateInfoTable from "../components/RealEstateInfoTable.vue";
// @ is an alias to /src
import { apiGetRealEstateInfo } from "@/config/api.js";
export default {
  name: "User",
  components: {
    RealEstateInfoTable,
  },
  data: () => ({
    realEstateInfo: [],
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
      this.realReq(this.account);
    },
    realReq: function (id) {
      var that = this;
      apiGetRealEstateInfo({ id: id })
        .then((res) => {
          console.log(res);
          that.realEstateInfo = res.realEstateInfo;
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
    this.realReq();
  },
};
</script>
