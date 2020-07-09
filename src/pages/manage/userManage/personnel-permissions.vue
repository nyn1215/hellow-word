<template>
  <a-modal
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="请选择权限角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" v-for="(v,i) in valueList" :key='i'>
          <a-select
            placeholder="请选择"
            v-decorator="['role'+i, {rules: [{ required: true, message: '请选择' }]}]"
            @change='handleChange'
          >
            <a-select-option
              v-for="(item, index) in selectList"
              :key="index"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="title">
      <a-button type="primary"
       @click="addPermissions">添加权限</a-button>
    </template>
  </a-modal>
</template>
<script>
import { UPLOAD_HOST } from "@api/config";
import moment from "moment";
import { personnelRole, personnelEdit } from "@/api";
export default {
  data() {
    return {
      UPLOAD_HOST,
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      roleList: [],
      selectList: [],
      valueList:[null],
      record: {},
      loading: false,
      imageUrl: '',
      id: null,
      sex:''
    };
  },
  created() {
    this.getRole();
  },
  methods: {
    addPermissions(){
      this.valueList.push({})
    },
    handleChange(){
      this.form.validateFields((err, values) => {
        console.log(values);
      });
    },
    async getRole() {
      const { result, httpCode, message } = await personnelRole({});
      console.log(result, httpCode, message);
      if (httpCode === 200) {
        this.selectList = result;
      } 
    },
    async edit(record) {
      console.log(record);
      this.visible = true;
      await this.editList({id: record.id});
      this.$nextTick(() => {
        this.imageUrl = this.record.imageAddress;
        this.id = this.record.id;
        this.form.setFieldsValue({
          // imageAddress: this.record.imageAddress,
          // account: this.record.account,
          // name: this.record.name,
          // password: this.record.password,
          // sex: this.record.sex,
          // address: this.record.address,
          // telephone: this.record.telephone,
          // entryTime: this.record.entryTime ? moment(this.record.entryTime, 'YYYY-MM-DD HH:mm:ss') : '',
          // roleListids: this.record.roleList,
        })
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log("values", values);
          values.entryTime = moment(values.entryTime).format('YYYY-MM-DD HH:mm:ss');
          values.roleListids = values.roleListids.toString();
          values.imageAddress = this.imageUrl;
          values = this.id ? Object.assign({}, values, { id: this.id }) : values;
          this.$emit("ok", values);
        } else {
          this.confirmLoading = false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },

    async editList(form) {
      console.log(form);
    }
  }
};
</script>
