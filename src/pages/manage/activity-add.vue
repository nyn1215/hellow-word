<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="活动名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', {rules: [{required: true, message: '请输入活动名称'}]}]"
            placeholder="请输入活动名称"
          />
        </a-form-item>
        <a-form-item label="活动大类" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input-group compact>
              <a-select style="width: 30%" v-model="radioVal">
                <a-select-option :value="1">添加活动</a-select-option>
                <a-select-option :value="2">选择活动</a-select-option>
              </a-select>
              <a-input
                style="width: 70%"
                v-show="radioVal === 1"
                v-decorator="['type',{ rules: [{ required: true, message: '请输入活动大类' }] }]"
                placeholder="请输入活动大类"
              />
              <a-select
                v-show="radioVal === 2"
                showSearch
                placeholder="请选择活动"
                style="width: 70%"
                
                v-decorator="['type',{ rules: [{ required: true, message: '请输入活动大类' }] }]"
                @change="roleTap"
              >
                <a-select-option
                v-for="(item, index) in options"
                :key="index"
                :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
          </a-input-group>
          <!-- <a-input
            v-decorator="['type', {rules: [{required: true, message: '请输入活动大类'}]}]"
            placeholder="请输入活动大类"
          /> -->
        </a-form-item>
        <a-form-item label="缩略图" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <div class="clearfix">
            <a-upload
              name="file"
              v-decorator="['imageUrl', {rules: [{required: true, message: '请上传缩略图'}]}]"
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

        <a-form-item label="轮播顶图" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <div class="clearfix">
            <a-upload
              name="file"
              v-decorator="['imageList', {rules: [{required: true, message: '请上传图片'}]}]"
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
        <!-- <a-form-item label="活动详情" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['context', {rules: [{required: true, message: '请输入活动详情'}]}]"
            placeholder="请输入活动详情"
          />
        </a-form-item> -->
        <a-form-item
          label="活动详情"
          :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
          style="height:240px;"
        >
          <editor ref="serviceContext" class="editor"  :value="serviceContext"></editor>
        </a-form-item>
        <a-form-item label="是否发布" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-radio-group
            v-decorator="[
              'publishType',
              { rules: [{ required: true, message: '请选择' }] }
            ]"
          >
            <a-radio value="NOW">即时发布</a-radio>
            <a-radio value="PERIOD">周期发布</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { Editor } from "@/components";
import { activityDetail, activitytypeList } from "@api";

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
      radioVal: 1,
      options: [],
      optionsVal: null
    };
  },
  watch: {
    radioVal(newVal) {
      if (newVal === 1) {
        this.optionsVal = null;
        // this.value = [];
        // this.showVal = false;
        // this.form.resetFields();
      }
      if (newVal === 2 && !this.optionsVal) {
        // this.showVal = true;
        // this.form.resetFields();
      }
    },
    optionsVal(newVal) {
      if (newVal) {
        // this.showVal = false;
      }
    }
  },
  created() {
    this.typeList();
  },
  methods: {
     roleTap(e) {
      this.optionsVal = e;
      console.log(e);
    },
    // 搜索过滤
    // filterOption(input, option) {
    //   return (
    //     option.componentOptions.children[0].text.toLowerCase().indexOf(input) >=
    //     0
    //   );
    // },
    handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      console.log(this.fileList);
      this.fileList = fileList;
    },
    videoChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        console.log(file);
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      this.videoList = fileList;
    },
    handlePreview(file) {
      console.log(file);
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    add() {
      this.form.resetFields();
      this.videoList = this.fileList = [];
      this.title = "新增活动";
       this.$refs.serviceContext ? this.$refs.serviceContext.content = '': ''
      this.id = null;
      this.visible = true;
    },
    async edit(record) {
      this.title = "编辑活动";
      this.visible = true;
      await this.detailList(record.id);
      this.$nextTick(() => {
        this.id = this.record.id;
        this.$refs.serviceContext.content = this.record.context == '暂无活动内容' ? '' : this.record.context;

        this.videoList = [
          {
            uid: "-1",
            url: this.record.imageUrl
          }
        ];
        this.fileList = this.record.imageList.split(",").map((val, index) => {
          return {
            uid: index,
            url: val
          };
        });
        this.radioVal = 2;
        this.form.setFieldsValue({
          title: this.record.title,
          type: this.record.typeId,
          context: this.record.context,
          publishType: this.record.publishType,
          // type: this.record.typeId,
          imageUrl: {
            file: this.videoList,
            fileList: this.videoList
          },
          imageList: {
            file: this.fileList,
            fileList: this.fileList
          }
        });
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log("values", values);
          if(this.radioVal === 2){
            values.type = this.optionsVal
          }
          
          values.context = this.$refs.serviceContext.content  == '' ? '暂无活动内容' :this.$refs.serviceContext.content;
          values.imageList = values.imageList.fileList
            .map(val => val.url)
            .toString();
          values.imageUrl = values.imageUrl.fileList[0].url;
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
    async typeList(self) {
      const { result, httpCode, message } = await activitytypeList({});
      if (httpCode === 200) {
        this.options = result;
      } else {
        this.$message.error(message);
      }
    },
    async detailList(id) {
      const { result, httpCode, message } = await activityDetail({ id });
      if (httpCode === 200) {
        this.record = result;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
