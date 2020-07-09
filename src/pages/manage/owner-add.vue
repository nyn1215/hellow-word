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
        <a-form-item label="账户名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc1', {rules: [{required: true, message: '请输入账户名称'}]}]"
            placeholder="请输入账户名称"
          />
        </a-form-item>
        <a-form-item label="账户密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc2', {rules: [{required: true, message: '请输入账户密码'}]}]"
            placeholder="请输入账户密码"
          />
        </a-form-item>
        <a-form-item label="确认密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc3', {rules: [{required: true, message: '请再次输入密码'}]}]"
            placeholder="请再次输入密码"
          />
        </a-form-item>
        <a-form-item label="住址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc4', {rules: [{required: true, message: '请输入住址'}]}]"
            placeholder="请输入住址"
          />
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['desc5', {rules: [{required: true, message: '请输入手机号'}]}]"
            placeholder="请输入手机号"
          />
        </a-form-item>
        <a-form-item label="入职时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-date-picker
            style="width: 100%;"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['desc6', {rules: [{required: true, message: '请输入员工入职时间'}]}]"
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
            placeholder="请选择账号角色"
            v-decorator="[ 'desc7', {rules: [{ required: true, message: '请选择账号角色' }]}]"
          >
            <a-select-option :key="0" :value="0">无</a-select-option>
            <a-select-option :key="1" :value="1">管理员</a-select-option>
            <a-select-option :key="2" :value="2">市场部</a-select-option>
            <a-select-option :key="3" :value="3">运营部</a-select-option>
            <a-select-option :key="4" :value="4">开发部</a-select-option>
            <a-select-option :key="5" :value="5">外联部</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from "lodash.pick";
import moment from "moment";
export default {
  data() {
    return {
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null
    };
  },
  methods: {
    add() {
      this.title = "新增员工账户";
      this.visible = true;
    },
    edit(record) {
      this.title = "修改员工账户";
      console.log(record);
      this.visible = true;
      console.log(pick(record, []));
      this.$nextTick(() => {
        // this.form.setFieldsValue(pick(record, []))
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log("values", values);
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
            this.$emit("ok", values);
          }, 1500);
        } else {
          this.confirmLoading = false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
