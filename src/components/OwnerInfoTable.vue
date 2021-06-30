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
              新增业主信息
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">新增业主</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.id"
                      label="用户ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.username"
                      label="用户名"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="初始密码"
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
      <!-- <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { apiAdminAddOwner, apiAdminDeleteOwner } from '../config/api';

export default {
  name: "CommunityInfoTable",
  props: ["dataset", "search", "isLoading"],
  data: () => ({
    headers: [
      {
        text: "用户ID",
        value: "id",
      },
      {
        text: "用户名",
        value: "username",
      },
      {
        text: "是否激活",
        value: "init",
      },
      {
        text: "操作",
        value: "actions",
      },
    ],
    dialog: false,
    editedItem: {
      id: "",
      username: "",
      password: "",
    },
    defaultItem: {
      id: "",
      username: "",
      password: "",
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
        apiAdminDeleteOwner({
          id: item.id,
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
        // apiAdminEditCommunity({
        //   code: this.editedItem.code,
        //   name: this.editedItem.name,
        //   address: this.editedItem.address,
        //   area: parseFloat(this.editedItem.area),
        // });
      } else {
        // 新增
        apiAdminAddOwner({
          id: this.editedItem.id,
          username: this.editedItem.username,
          password: this.editedItem.password,
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