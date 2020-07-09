<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable='false'
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="物业人员工种" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
           <a-select
            placeholder="请选择"
            v-decorator="[ 'title', {rules: [{ required: true, message: '请选择' }]}]"
            width='380px'
            @change='searchVal'
          >
            <a-select-option :key="1" value="REPAIR">报修</a-select-option>
            <a-select-option :key="2" value="PAY">缴费</a-select-option>
            <a-select-option :key="3" value="SERVE">服务</a-select-option>
            <a-select-option :key="4" value="ACTIVITY">活动</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="人员姓名及联系方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" >
          <a-select
            placeholder="请选择"
            v-decorator="[ 'newsType', {rules: [{ required: true, message: '请选择' }]}]"
            :disabled='disabled'
          >
            <a-select-option :key="1" value="REPAIR">报修</a-select-option>
            <a-select-option :key="2" value="PAY">缴费</a-select-option>
            <a-select-option :key="3" value="SERVE">服务</a-select-option>
            <a-select-option :key="4" value="ACTIVITY">活动</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { dynamicDetail } from "@api";
export default {
  components: {},
  data() {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      id: null,
      disabled:true
    };
  },
  created() {},
  methods: {
    searchVal(val){
      console.log(val)
      if(val != ''){
        this.disabled = false
      }

    },
    add() {
      this.form.resetFields();
      this.id = null;
      this.title = "派单";
      this.disabled = true
      this.visible = true;
    },
 
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(err,values)
        if (!err) {
          values = this.id
            ? Object.assign({}, values, { id: this.id })
            : values;
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
  }
};
</script>
