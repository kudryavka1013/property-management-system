<template>
  <v-data-table :headers="headers" :items="dataset" :items-per-page="5" :search="search" :loading="isLoading"
    loading-text="数据加载中，请稍后">

  </v-data-table>
</template>

<script>
  export default {
    name: "RealEstateInfoTable",
    props: ["dataset", "search", "isLoading"],
    data: () => ({
      headers: [{
          text: "房产编号",
          value: "code"
        },
        {
          text: "所属小区",
          value: "communityName"
        },
        {
          text: "楼栋号",
          value: "buildingName"
        },
        {
          text: "房产名称",
          value: "name"
        },
      ],
    }),
  };
</script>

<style>
</style>