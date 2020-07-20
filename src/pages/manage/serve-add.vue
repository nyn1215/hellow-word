<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-table
        :columns="columns"
        :pagination="false"
        rowKey="id"
        :dataSource="data"
        :rowSelection="{ type: 'radio', selectedRowKeys, onChange: this.onSelectChange }"
      >
        <span slot="avatar" slot-scope="record">
          <img :src="record" :style="{width: '80px', height: '80px',}" alt />
        </span>
        <span slot="action" slot-scope="record">
          <template>
            <a @click="$refs.createModal.edit(record)">分配</a>
            <a-divider type="vertical" />
            <a href="javascript:;">抢单</a>
          </template>
        </span>
      </a-table>
    </a-spin>
  </a-modal>
</template>

<script>
import { queryStaffs } from "@/api";
// import pick from "lodash.pick";
import moment from "moment";

const columns = [
  // {
  //   title: "编号",
  //   dataIndex: "id",
  //   align: "center"
  // },
  {
    title: "姓名",
    key: "name",
    dataIndex: "name",
    align: "center"
  }
];
const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 100,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: false,
  showQuickJumper: false
};

export default {
  data() {
    return {
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      columns,
      data: [],
      pagination,
      selectedRowKeys: [],
      selectedRows: [],
      id: null
    };
  },
  methods: {
    add() {
      this.title = "";
      this.visible = true;
    },
    edit(record, str) {
      console.log(record);
      this.title = "分配人员";
      this.visible = true;
      this.selectedRowKeys = record.staffId  || [];
      this.selectedRows = record.staffId  || [];
      this.id = record.id;
      this.getList(str);
      // console.log(pick(record, []));
      this.$nextTick(() => {
        // this.form.setFieldsValue(pick(record, []))
      });
    },
    handleSubmit() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择一名人员");
        return false;
      }
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        // values.selectedRowKeys = this.selectedRowKeys
        // values.id = this.selectedRowKeys
        this.$emit("ok", {k:this.selectedRowKeys, c:this.id});
      }, 1500);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys);
      // console.log(selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    handleCancel() {
      this.visible = false;
    },
    async getList(id) {
      const form = { roleId: id };
      const { result, httpCode, message } = await queryStaffs(form);
      if (httpCode === 200) {
        this.data = result.staffs;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
