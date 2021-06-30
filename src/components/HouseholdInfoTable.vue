<template>
  <v-data-table
    :headers="headers"
    :items="dataset"
    :items-per-page="5"
    :search="search"
    :loading="isLoading"
    loading-text="数据加载中，请稍后"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              新增房产数据
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">编辑房产</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.communityName"
                      label="所属小区"
                      disabled
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="4" sm="6" md="4">
                    <v-select
                      :items="buildingInfo"
                      v-model="editedItem.buildingCode"
                      item-text="buildingName"
                      item-value="buildingCode"
                      label="楼栋号"
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="房产名">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="buildingInfo"
                      v-model="editedItem.ownerCode"
                      label="持有人账户"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {
  apiAdminAddHousehold,
  apiAdminDeleteHousehold,
  apiAdminEditHousehold,
} from "../config/api";
export default {
  name: "HouseholdInfoTable",
  props: ["dataset", "search", "isLoading"],
  data: () => ({
    headers: [
      {
        text: "房产编号",
        value: "code",
      },
      {
        text: "所属小区",
        value: "communityName",
      },
      {
        text: "楼栋号",
        value: "buildingName",
      },
      {
        text: "房产名",
        value: "name",
      },
      {
        text: "持有人账户",
        value: "ownerCode",
      },
      {
        text: "操作",
        value: "actions",
      },
    ],
    dialog: false,
    editedItem: {
      code: "",
      communityName: "",
      buildingCode: "",
      buildingName: "",
      name: "",
      ownerCode: "",
    },
    defaultItem: {
      code: "",
      communityName: "",
      buildingCode: "",
      buildingName: "",
      name: "",
      ownerCode: "",
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    close: function () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem: function (item) {
      this.editedIndex = this.dataset.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: function (item) {
      //   const index = this.dataset.indexOf(item);
      //   confirm("确定要删除该项吗") && this.dataset.splice(index, 1);
      if (confirm("确定要删除该项吗")) {
        apiAdminDeleteHousehold({
          code: item.code,
        })
          .then((res) => {
            console.log(res);
            if (res.msg == "删除成功") {
              alert("删除成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    save: function () {
      if (this.editedIndex > -1) {
        // 编辑
        apiAdminEditHousehold({
          code: this.editedItem.code,
          name: this.editedItem.name,
          totalFloors: this.editedItem.totalFloors,
          communityCode: this.editedItem.communityCode,
        })
          .then((res) => {
            if (res.msg == "更新成功") {
              alert("更新成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // 新增
        apiAdminAddHousehold({
          name: this.editedItem.name,
          communityCode: this.editedItem.communityCode,
          totalFloors: this.editedItem.totalFloors,
        })
          .then((res) => {
            if (res.msg == "添加成功") {
              alert("添加成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.close();
    },
  },
};
</script>

<style>
</style>