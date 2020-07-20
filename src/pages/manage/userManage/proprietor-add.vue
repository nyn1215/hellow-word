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
        <a-form-item label="姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['name', {rules: [{required: true, message: '请输入姓名'}]}]"
            placeholder="请输入姓名"
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
        <a-form-item label="手机号" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['telephone', {rules: [{required: true, message: '请输入手机号'}]}]"
            placeholder="请输入手机号"
          />
        </a-form-item>
        <a-form-item label="住址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input-group compact>
            <a-input style=" width: 200px; text-align: center" v-decorator="['floorName', {rules: [{required: true, message: '请输入住址'}]}]" placeholder="请输入住址" />
            <a-input
              style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
              placeholder="~"
              disabled
            />
          <a-input style="width: 120px; text-align: center; border-left: 0" v-decorator="['houseNumber', {rules: [{required: true, message: '请输入门牌号'}]}]" placeholder="请输入门牌号" />
         </a-input-group>
        </a-form-item>
        <!-- <a-form-item label="住址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['address', {rules: [{required: true, message: '请输入住址'}]}]"
            placeholder="请输入住址"
          />
        </a-form-item> -->
        <a-form-item label="停车位" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['parkingSpace', {rules: [{required: true, message: '请输入停车位'}]}]"
            placeholder="请输入停车位"
          />
        </a-form-item>
        <!-- <a-form-item label="积分" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            disabled
            v-decorator="['myIntegral', {rules: [{required: false, message: '请输入积分'}]}]"
            placeholder="请输入积分"
          />
        </a-form-item> -->
        <a-form-item label="入住时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-date-picker
            style="width: 100%;"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['checkinTime', {rules: [{required: true, message: '请输入入住时间'}]}]"
            placeholder="请输入入住时间"
          />
        </a-form-item>
        <a-form-item label="支付宝账号" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['alipayAccount', {rules: [{required: true, message: '请输入支付宝账号'}]}]"
            placeholder="请输入支付宝账号"
          />
        </a-form-item>
        <a-form-item label="微信账号" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['weChatAccount', {rules: [{required: true, message: '请输入微信账号'}]}]"
            placeholder="请输入微信账号"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from "moment";
import { proprietorEdit } from "@/api";
export default {
  data() {
    return {
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      roleList: [],
      record: {},
      id: null
    };
  },
  created() {},
  methods: {
    add() {
      this.form.resetFields();
      this.title = "新增业主";
      this.visible = true;
    },
    async edit(record) {
      this.title = "业主详情";
      console.log(record);
      this.visible = true;
      await this.editList(record.id);
      this.$nextTick(() => {
        this.id = this.record.id;
        this.form.setFieldsValue({
          name: this.record.name,
          sex: this.record.sexNmae === "女" ? "WOMAN" : "MAN",
          telephone: this.record.telephone,
          address: this.record.address,
          parkingSpace: this.record.parkingSpace,
          // myIntegral: this.record.myIntegral,
          checkinTime: this.record.createTime ? moment(this.record.createTime, "YYYY-MM-DD HH:mm:ss") : '',
          alipayAccount: this.record.alipayAccount,
          weChatAccount: this.record.weChatAccount,
          houseNumber: this.record.houseNumber,
          floorName: this.record.floorName,
        });
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log("values", values);
          values.checkinTime = moment(values.checkinTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          // values.address = `${values.floorName}${values.houseNumber}`;
          // delete values.myIntegral;
          // delete values.floorName;
          // delete values.houseNumber;
          values = this.id ? { id: this.id, ...values } : values;
          // values.roleListids = values.roleListids.toString();
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
    },

    async editList(id) {
      const { result, httpCode, message } = await proprietorEdit({ id });
      if (httpCode === 200) {
        this.record = result;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
