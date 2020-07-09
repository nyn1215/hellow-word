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
        <a-form-item label="上传图片" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <div class="clearfix">
            <a-upload
              name="file"
              accept='.png, .jpg, .jpeg'
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
        <a-form-item label="排序" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', {rules: [{required: true, message: '请输入排序'}]}]"
            placeholder="请输入排序"
          />
        </a-form-item>
        <a-form-item label="状态" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
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
         <a-form-item label="链接地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title1', {rules: [{required: true, message: '请输入链接地址'}]}]"
            placeholder="请输入链接地址"
          />
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
import { UPLOAD_HOST } from "@api/config";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      UPLOAD_HOST,
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      videoList: [],
      previewVisible: false,
      previewImage: null,
      record: {},
      id: null,
      defaultImg:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2889071587,4234702433&fm=26&gp=0.jpg',
      fileType:[ "image/jpeg","image/jpg","image/png"]
    };
  },
  created() {},
  methods: {
    videoChange(info) {
      let fileList = [...info.fileList];
      // 上传图片
      if(fileList.length > 0){
        // 格式正确
        if(this.fileType.includes(fileList[0].type)){
            fileList = fileList.map(file => {
              if (file.response) {
                file.url = file.response.result.fileName;
              }
              return file;
            });
            this.videoList = fileList;
        }else{
          this.$message.error('请上传.jpeg/.jpg/.png格式的文件');
        }
      // 删除图片
      }else{
         this.videoList = fileList;
      }
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    add() {
      this.form.resetFields();
      this.videoList = [];
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
