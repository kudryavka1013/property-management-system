.<template>
  <v-card tile class="ma-4">
    <v-card-title class="mx-2">
      <span>楼栋管理</span>
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
    <building-info-table
      :dataset="buildingInfo"
      :search="search"
      :isLoading="isLoading"
      :communityInfo="communityInfo"
    >
    </building-info-table>
  </v-card>
</template>

<script>
import BuildingInfoTable from "../components/BuildingInfoTable.vue";
import {
  apiAdminFindAllBuilding,
  // apiGetRealEstateInfo,
  // apiGetBuildingByCode,
  // apiGetCommunityByCode
} from "@/config/api.js";
import { apiAdminFindAllCommunity } from "../config/api";
export default {
  name: "BuildingManage",
  components: {
    BuildingInfoTable,
  },
  data: () => ({
    buildingInfo: [],
    communityInfo: [],
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
      this.buildingReq();
    },
    buildingReq: function () {
      var that = this;
      apiAdminFindAllBuilding()
        .then((res) => {
          console.log(res.results);
          that.buildingInfo = res.results;
          that.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          that.isLoading = false;
        });
      apiAdminFindAllCommunity().then((res) => {
        for (let i = 0; i < res.results.length; i++) {
          let temp = {
            communityCode: res.results[i].code,
            communityName: res.results[i].name,
          };
          this.communityInfo[i] = temp;
        }
      });
    },
  },
  mounted: function () {
    this.isLoading = true;
    this.buildingReq();
  },
};
</script>

<style>
</style>