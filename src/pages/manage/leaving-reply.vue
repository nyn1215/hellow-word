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
        <a-form-item label="内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-textarea
            rows="4"
            v-decorator="['replyComplaint', {rules: [{ required: true, message: '请输入回复内容' }]}]"
            placeholder="请输入回复内容"
          />
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
      title: null,
      id: null
    };
  },
  methods: {
    add() {
      this.title = "新增员工账户";
      this.visible = true;
    },
    edit(record) {
      this.form.resetFields();
      this.title = "消息回复";
      console.log(record);
      this.visible = true;
      this.id = record.id;
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
          values.id = this.id;
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
