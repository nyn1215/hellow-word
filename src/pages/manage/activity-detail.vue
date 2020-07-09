<template>
  <a-modal
    :title="title"
    :width="880"
    :visible="visible"
    @cancel="handleCancel"
    footer=""
    :maskClosable='false'
  >
      <a-form :form="form">
        <a-form-item label="名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.name}}
        </a-form-item>
        <a-form-item label="年龄" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.age}}
        </a-form-item>
        <a-form-item label="身份证号码" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.identificationNumber}}
        </a-form-item>
        <a-form-item label="社区" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.communityName}}
        </a-form-item>
        <a-form-item label="门牌号" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.houseNumber}}
        </a-form-item>
        <a-form-item label="报名时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.signTime}}
        </a-form-item>
        <a-form-item label="联系电话" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.telephone}}
        </a-form-item>
      </a-form>
  </a-modal>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this),
      id: null,
      record: {},
      title:''
    };
  },
  methods: {
    edit(record) {
      this.title = "查看用户信息";
      this.visible = true;
      this.$nextTick(() => {
        this.id = record.id;
        this.record = record;
       
      });
    },
    handleCancel() {
      this.visible = false;
    },
  }
};
</script>
