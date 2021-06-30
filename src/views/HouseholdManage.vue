.<template>
  <v-card tile class="ma-4">
    <v-card-title class="mx-2">
      <span>房产管理</span>
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
    <household-info-table
      :dataset="householdInfo"
      :search="search"
      :isLoading="isLoading"
      :communityInfo="communityInfo"
      :ownerInfo ="ownerInfo"
    >
    </household-info-table>
  </v-card>
</template>

<script>
import HouseholdInfoTable from "../components/HouseholdInfoTable.vue";
import {
  apiAdminFindAllHousehold,
  apiAdminFindAllCommunity,
  // apiGetRealEstateInfo,
  // apiGetBuildingByCode,
  // apiGetCommunityByCode
} from "@/config/api.js";
import { apiAdminFindAllOwner } from '../config/api';
export default {
  name: "HouseholdManage",
  components: {
    HouseholdInfoTable,
  },
  data: () => ({
    householdInfo: [],
    communityInfo: [],
    ownerInfo:[],
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
      this.householdReq();
    },
    householdReq: function () {
      var that = this;
      apiAdminFindAllHousehold()
        .then((res) => {
          console.log(res);
          that.householdInfo = res.results;
          that.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          that.isLoading = false;
        });
      apiAdminFindAllCommunity()
        .then((res) => {
        for (let i = 0; i < res.results.length; i++) {
          let temp = {
            communityCode: res.results[i].code,
            communityName: res.results[i].name,
          };
          this.communityInfo[i] = temp;
        }
      }).catch((err)=>{
          console.log(err)
      });
      apiAdminFindAllOwner()
      .then((res) => {
          for(let i =0;i< res.results.length;i++){
              let temp = {
                  ownerId: res.results[i].id,
                  ownerName: res.results[i].username
              }
              this.ownerInfo[i] = temp;
          }
      })
    },
  },
  mounted: function () {
    this.isLoading = true;
    this.householdReq();
  },
};
</script>

<style>
</style>