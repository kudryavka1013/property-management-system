<template>
  <v-data-table
    :headers="headers"
    :items="dataset"
    :items-per-page="5"
    :search="search"
    :loading="isLoading"
    loading-text="数据加载中，请稍后"
  >
  
  </v-data-table>
</template>

<script>
export default {
  name: "RealEstateInfoTable",
  props: ["dataset", "search", "isLoading"],
  data: () => ({
    headers: [
      { text: "房产编号", value: "houseId" },
      { text: "所属小区", value: "communityName" },
      { text: "楼栋", value: "building" },
      { text: "房间号", value: "roomNumber" },
      { text: "面积", value: "roomSize" },
      { text: "入住时间", value: "checkinTime" },
    ],
  }),
};
</script>

<style>
</style>