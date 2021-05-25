<template>
  <div class="home">
    <v-card tile class="ma-4">
      <v-card-title class="mx-2">
      <span>房产管理</span>
      <v-btn icon class="ms-2" color="primary" :loading="isLoading"><v-icon>mdi-refresh</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <real-estate-info-table :dataset="houseinfo" :search="search" :isLoading="isLoading"></real-estate-info-table>
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
  data:()=>({
    houseinfo:[],
    search:'',
    isLoading: false
  }),
  mounted: function () {
    this.isLoading = true
    var that = this
    this.$axios({
      url: "owner/gethouseinfo",
      method: "get",
    }).then(function (response) {
      console.log(response)
      that.houseinfo = response.data.houseinfo
      that.isLoading = false
    });
  },
};
</script>
