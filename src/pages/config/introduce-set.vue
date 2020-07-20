<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="16">
        <a-col :md="24" :lg="24">
          <a-form layout="vertical" autocomplete="off">
            <a-form-item label="轮播图" :wrapper-col="{ span: 18 }">
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
              label="物业介绍"
              :wrapper-col="{ span: 16 }"
              style="height:200px;"
            >
              <editor ref="serviceContext" class="editor" :value="serviceContext"></editor>
            </a-form-item>
            <!-- <a-form-item label="物业介绍" :wrapper-col="{ span: 16 }" style="height:280px;">
              <quill-editor
                style="height:180px;"
                v-model="content"
                ref="purchaseInstructions"
                :options="{placeholder: '请输入物业介绍'}"
              ></quill-editor>
            </a-form-item> -->
            <a-form-item :wrapper-col="{ span: 16 }">
              <a-button type="primary" @click="submit">提交</a-button>
            </a-form-item>
            <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<script src="./introduce.js"></script>

<style lang="less" scoped>
// .editor{
//   /deep/.quill-editor{
//     height: 433;
//   }
// }
</style>