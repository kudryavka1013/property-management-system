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
              新增楼栋数据
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">编辑楼栋</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4" sm="6" md="4">
                    <v-select
                      :items="communityInfo"
                      v-model="editedItem.communityCode"
                      item-text="communityName"
                      item-value="communityCode"
                      label="所属小区"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.communityCode"
                      label="所属小区编号"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="楼栋名"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.totalFloors"
                      label="楼层数"
                    ></v-text-field>
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
  apiAdminAddBuilding,
  apiAdminDeleteBuilding,
  apiAdminEditBuilding,
} from "../config/api";
export default {
  name: "BuildingInfoTable",
  props: ["dataset", "search", "isLoading", "communityInfo"],
  data: () => ({
    headers: [
      {
        text: "楼栋编号",
        value: "code",
      },
      {
        text: "所属小区",
        value: "communityName",
      },
      {
        text: "楼栋名称",
        value: "name",
      },
      {
        text: "楼层数",
        value: "totalFloors",
      },
      {
        text: "操作",
        value: "actions",
        sortable: false,
      },
    ],
    dialog: false,
    editedItem: {
      code: "",
      communityCode: "",
      communityName: "",
      name: "",
      totalFloors: "",
    },
    defaultItem: {
      code: "",
      communityCode: "",
      communityName: "",
      name: "",
      totalFloors: "",
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
        apiAdminDeleteBuilding({
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
        apiAdminEditBuilding({
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
        apiAdminAddBuilding({
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