.<template>
    <v-card tile class="ma-4">
        <v-card-title class="mx-2">
            <span>房产管理</span>
            <v-btn icon class="ms-2" color="primary" :loading="isLoading" @click="refreshTable">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details></v-text-field>
        </v-card-title>
        <household-info-table :dataset="realEstateInfo" :search="search" :isLoading="isLoading">
        </household-info-table>
    </v-card>
</template>

<script>
    import HouseholdInfoTable from '../components/HouseholdInfoTable.vue'
    import {
        apiAdminFindAllHousehold
        // apiGetRealEstateInfo,
        // apiGetBuildingByCode,
        // apiGetCommunityByCode
    } from "@/config/api.js";
    export default {
        name: "HouseholdManage",
        components: {
            HouseholdInfoTable
        },
        data: () => ({
            householdInfo: [],
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
                        that.householdInfo = res.results;
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
            this.householdReq()
        }
    }
</script>

<style>

</style>