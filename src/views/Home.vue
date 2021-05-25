<template>
  <div class="home">
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

export default {
  name: "Home",
  components: {
    RealEstateInfoTable,
  },
  data: () => ({
    realEstateInfo: [],
    search: "",
    isLoading: false,
  }),
  methods: {
    refreshTable: function () {
      this.isLoading = true;
      this.realReq();
    },
    realReq: function () {
      var that = this;
      // this.realEstateInfo = [];
      this.$axios({
        url: "owner/getRealEstateInfo",
        method: "get",
        data: {
          id: that.$store.state.account,
        },
      })
        .then(function (response) {
          // console.log(response);
          that.realEstateInfo = response.data.realEstateInfo;
          that.isLoading = false;
        })
        .catch(function (error) {
          console.log(error);
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
