.<template>
    <v-card tile class="ma-4">
        <v-card-title class="mx-2">
            <span>小区总览</span>
            <v-btn icon class="ms-2" color="primary" :loading="isLoading" @click="refreshTable">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details></v-text-field>
        </v-card-title>
        <community-info-table :dataset="realEstateInfo" :search="search" :isLoading="isLoading">
        </community-info-table>
    </v-card>
</template>

<script>
    import CommunityInfoTable from '../components/CommunityInfoTable.vue'
    import {
        apiAdminFindAllCommunity
        // apiGetRealEstateInfo,
        // apiGetBuildingByCode,
        // apiGetCommunityByCode
    } from "@/config/api.js";
    export default {
        name: "CommunityManage",
        components: {
            CommunityInfoTable
        },
        data: () => ({
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
                this.realReq(this.account);
            },
            communityReq: function () {
                var that = this;
                apiAdminFindAllCommunity()
                    .then((res) => {
                        that.communityInfo = res.results;
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
            this.communityReq()
        }
    }
</script>

<style>

</style>