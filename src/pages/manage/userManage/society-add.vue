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
      <a-form :form="form">
          <a-form-item label="头像" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
            <a-input
              v-show="false"
              v-decorator="['imageAddress', {rules: [{required: true, message: '请上传头像'}]}]"
              placeholder="请输入账户名称"
            />
           <a-upload
            name="file"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="UPLOAD_HOST"
            @change="handleChange"
          >
            <img v-if="imageUrl" style="width: 100px;" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload> 
        </a-form-item>
        
        <a-form-item label="账户名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['account', {rules: [{required: true, message: '请输入账户名称'}]}]"
            placeholder="请输入账户名称"
          />
        </a-form-item>
        <a-form-item label="姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['name', {rules: [{required: true, message: '请输入姓名'}]}]"
            placeholder="请输入姓名"
          />
        </a-form-item>
        <a-form-item label="账户密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            type="password"
            v-decorator="['password', {rules: [{required: true, message: '请输入账户密码'}]}]"
            placeholder="请输入账户密码"
          />
        </a-form-item>
         <a-form-item label="性别" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['sex', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="MAN">男</a-select-option>
            <a-select-option :key="2" value="WOMAN">女</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="确认密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc3', {rules: [{required: true, message: '请再次输入密码'}]}]"
            placeholder="请再次输入密码"
          />
        </a-form-item> -->
        <a-form-item label="住址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['address', {rules: [{required: true, message: '请输入住址'}]}]"
            placeholder="请输入住址"
          />
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['telephone', {rules: [{required: true, message: '请输入手机号'}]}]"
            placeholder="请输入手机号"
          />
        </a-form-item>
        <a-form-item label="入职时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-date-picker
            style="width: 100%;"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['entryTime', {rules: [{required: true, message: '请输入员工入职时间'}]}]"
            placeholder="请输入员工入职时间"
          />
          <!-- <a-range-picker
              v-decorator="[
                  'exporttime'
              ]"
              style="width: 100%;"
              :showTime="{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}"
              format="YYYY-MM-DD HH:mm:ss"
          />-->
        </a-form-item>
        <a-form-item label="账号角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select
            mode="multiple"
            placeholder="请选择账号角色"
            v-decorator="[ 'roleListids', {rules: [{ required: true, message: '请选择账号角色' }]}]"
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
      record: {},
      loading: false,
      imageUrl: '',
      id: null
    };
  },
  created() {
    this.getRole();
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.imageUrl = info.file.response.result.fileName;
        this.form.setFieldsValue({
          imageAddress: this.imageUrl
        })
        this.loading = false;
      }
    },
    async getRole() {
      const { result, httpCode, message } = await personnelRole({});
      console.log(message);
      if (httpCode === 200) {
        this.selectList = result;
      }
    },
    add() {
      this.form.resetFields();
      this.imageUrl = '';
      this.id = null;
      this.title = "新增员工账户";
      this.visible = true;
    }, 
    async edit(record) {
      this.title = "修改员工账户";
      console.log(record);
      this.visible = true;
      await this.editList({id: record.id});
      this.$nextTick(() => {
        this.imageUrl = this.record.imageAddress;
        this.id = this.record.id;
        this.form.setFieldsValue({
          imageAddress: this.record.imageAddress,
          account: this.record.account,
          name: this.record.name,
          password: this.record.password,
          sex: this.record.sex,
          address: this.record.address,
          telephone: this.record.telephone,
          entryTime: this.record.entryTime ? moment(this.record.entryTime, 'YYYY-MM-DD HH:mm:ss') : '',
          roleListids: this.record.roleList,
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
      const { result, httpCode, message } = await personnelEdit(form);
      if (httpCode === 200) {
        this.record = result;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
