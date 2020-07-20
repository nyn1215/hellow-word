<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', {rules: [{required: true, message: '请输入活动名称'}]}]"
            placeholder="请输入活动名称"
          />
        </a-form-item>
        <a-form-item label="消息类型" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <a-select
            
            placeholder="请选择"
            v-decorator="[ 'newsType', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="REPAIR">报修</a-select-option>
            <a-select-option :key="2" value="PAY">缴费</a-select-option>
            <a-select-option :key="3" value="SERVE">服务</a-select-option>
            <a-select-option :key="4" value="ACTIVITY">活动</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="列表图" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <div class="clearfix">
            <a-upload
              name="file"
              :action="UPLOAD_HOST"
              listType="picture-card"
              :fileList="videoList"
              @preview="handlePreview"
              @change="videoChange"
            >
              <div v-if="videoList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </a-upload>
          </div>
        </a-form-item>

        <a-form-item label="详情图" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <div class="clearfix">
            <a-upload
              name="file"
              :action="UPLOAD_HOST"
              listType="picture-card" 
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 5">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item
          label="动态详情"
          :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }"
          style="height:240px;"
        >
          <editor ref="serviceContext" class="editor" :value="serviceContext"></editor>
        </a-form-item> 
        
        
        <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { dynamicDetail } from "@api";
import { Editor } from "@/components";
import { UPLOAD_HOST } from "@api/config";
import moment from "moment";
export default {
  components: {
    Editor
  },
  data() {
    return {
      UPLOAD_HOST,
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      videoList: [],
      fileList: [],
      previewVisible: false,
      previewImage: null,
      record: {},
      id: null,
      serviceContext: '',
      defaultImg:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2889071587,4234702433&fm=26&gp=0.jpg'
      // 
    };
  },
  created() {},
  methods: {
    handleChange(info) {
      // 0.37 * 60 = 37
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      this.fileList = fileList;
    },
    videoChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      this.videoList = fileList;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    add() {
      this.form.resetFields();
      this.videoList = this.fileList = [];
      this.$refs.serviceContext ? this.$refs.serviceContext.content = '': '';
      this.id = null;
      this.title = "新增动态";
      this.visible = true;
    },
    async edit(record) {
      this.title = "编辑动态";
      this.visible = true;
      await this.detailList(record.id);
      this.$nextTick(() => {
        this.id = this.record.id;
        this.videoList =this.record.imageUrl != this.defaultImg ? [this.record.imageUrl].map((val,index)=>{
          return {
            uid: index,
            name: val,
            url: val
          }
        }) : []
         this.fileList =this.record.backgroundUrl != this.defaultImg ? this.record.backgroundUrl.split(',').map((val,index)=>{
          return {
            uid: index,
            name: val,
            url: val
          }
        }) : []
        this.$refs.serviceContext.content = this.record.context == '暂无动态详情' ? '' : this.record.context;
        this.form.setFieldsValue({
          title: this.record.title,
          newsType: this.record.newsType,
          context: this.record.context
        });
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(err,values)
        if (!err) {
          values.imageUrl = this.videoList
            .map(val => val.url)
            .toString() == '' ? this.defaultImg : this.videoList.map(val=> val.url).toString();
          values.backgroundUrl = this.fileList
            .map(val => val.url)
            .toString() == '' ? this.defaultImg : this.fileList.map(val=> val.url).toString();
          values.context = this.$refs.serviceContext.content  == '' ? '暂无动态详情' :this.$refs.serviceContext.content;
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
    async detailList(id) {
      const { result, httpCode, message } = await dynamicDetail({ id });
      if (httpCode === 200) {
        this.record = result;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
