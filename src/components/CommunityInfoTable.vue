<template>
  <v-data-table :headers="headers" :items="dataset" :items-per-page="5" :search="search" :loading="isLoading"
    loading-text="数据加载中，请稍后">

  </v-data-table>
</template>

<script>
  export default {
    name: "CommunityInfoTable",
    props: ["dataset", "search", "isLoading"],
    data: () => ({
      headers: [{
          text: "小区编号",
          value: "code"
        },
        {
          text: "地址",
          value: "address"
        },
        {
          text: "小区名称",
          value: "communityName"
        },
        {
          text: "占地面积",
          value: "buildingCode"
        }
      ],
    }),
  };
</script>

<style>
</style>