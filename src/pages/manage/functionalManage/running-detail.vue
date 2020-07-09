<template>
  <a-modal
    :title="title"
    :width="880"
    :visible="visible"
    @cancel="handleCancel"
    :maskClosable='false'
  >
      <a-form :form="form">
        <a-form-item label="下单时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.name}}
        </a-form-item>
        <a-form-item label="业主姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.age}}
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.identificationNumber}}
        </a-form-item>
        <a-form-item label="取货地点" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.communityName}}
        </a-form-item>
        <a-form-item label="收货地点" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.houseNumber}}
        </a-form-item>
        <a-form-item label="取货时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.signTime}}
        </a-form-item>
        <a-form-item label="收获时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.signTime}}
        </a-form-item>
        <a-form-item label="货物信息" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.signTime}}
        </a-form-item>
        <a-form-item label="跑腿费用" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          {{record.signTime}}
        </a-form-item>
        <a-form-item label="当前状态" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
           <a-select
            placeholder="请选择"
            width='380px'
            @change='searchVal'
          >
            <a-select-option :key="1" value="REPAIR">报修</a-select-option>
            <a-select-option :key="2" value="PAY">缴费</a-select-option>
            <a-select-option :key="3" value="SERVE">服务</a-select-option>
            <a-select-option :key="4" value="ACTIVITY">活动</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="分配物业人员" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
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
    searchVal(){

    },
    edit(record) {
      this.title = "跑腿详情";
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
