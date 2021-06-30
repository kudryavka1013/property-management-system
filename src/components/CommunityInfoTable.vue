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
              新增小区信息
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">编辑小区</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="小区名称"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address"
                      label="地址"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.area"
                      label="占地面积"
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
  apiAdminAddCommunity,
  apiAdminEditCommunity,
  apiAdminDeleteCommunity,
} from "../config/api";
export default {
  name: "CommunityInfoTable",
  props: ["dataset", "search", "isLoading"],
  data: () => ({
    headers: [
      {
        text: "小区编号",
        value: "code",
      },
      {
        text: "小区名称",
        value: "name",
      },
      {
        text: "地址",
        value: "address",
      },
      {
        text: "占地面积",
        value: "area",
      },
      {
        text: "操作",
        value: "actions",
      },
    ],
    dialog: false,
    editedItem: {
      code: "",
      name: "",
      address: "",
      area: "",
    },
    defaultItem: {
      code: "",
      name: "",
      address: "",
      area: "",
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
      // const index = this.dataset.indexOf(item);
      console.log(item.code)
      if (confirm("确定要删除该项吗")) {
        apiAdminDeleteCommunity({
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
        apiAdminEditCommunity({
          code: this.editedItem.code,
          name: this.editedItem.name,
          address: this.editedItem.address,
          area: parseFloat(this.editedItem.area),
        });
      } else {
        // 新增
        apiAdminAddCommunity({
          name: this.editedItem.name,
          address: this.editedItem.address,
          area: this.editedItem.area,
        })
        .then((res)=>{
          if(res.msg == "添加成功"){
            alert("添加成功")
          }
        })
        .catch((err)=>{
          console.log(err)
        });
      }
      this.close();
    },
  },
};
</script>

<style>
</style>