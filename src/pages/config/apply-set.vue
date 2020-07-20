<template>
  <div>
    <a-card :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{ marginBottom: '0', paddingLeft: '16px' }"
        >
          <a-tab-pane loading="true" tab="社区申请" :key="0">
            <a-row :style="{ padding: '20px' }">
              <a-form :form="form" @submit="handleSubmit">
                <a-form-item
                  label="社区名称"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="请输入小区名称"
                    v-decorator="[
                      'communityName',
                      {
                        rules: [{ required: true, message: '请输入小区名称' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="小区所在地"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-cascader
                    v-decorator="[
                      'city',
                      {
                        rules: [{ required: true, message: '请选择小区所在地' }]
                      }
                    ]"
                    :fieldNames="{
                      label: 'n',
                      value: 'v',
                      children: 'children'
                    }"
                    :options="city"
                    @change="onChange"
                    placeholder="请选择所属区域"
                  />
                </a-form-item>
                <a-form-item
                  label="详细地址"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-textarea
                    rows="4"
                    v-decorator="[
                      'address',
                      { rules: [{ required: true, message: '请输入详细地址' }] }
                    ]"
                    placeholder="请输入详细地址"
                  />
                </a-form-item>
                <a-form-item
                  label="公司名称"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="请输入公司名称"
                    v-decorator="[
                      'propertyName',
                      {
                        rules: [{ required: true, message: '请输入公司名称' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="公司营业执照"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <div class="clearfix">
                    <a-upload
                      name="file"
                      :action="UPLOAD_HOST"
                      listType="picture-card"
                      :fileList="fileList"
                      @preview="handlePreview"
                      @change="handleChange"
                    >
                      <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传图片</div>
                      </div>
                    </a-upload>
                  </div>
                </a-form-item>
                <!-- <a-form-item
                  label="上传基础信息"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-button type="primary" icon="download" style="margin-right:20px;" @click="linkExecl">模板下载</a-button>
                  <a-upload
                    name="file"
                    :multiple="true"
                    :action="UPLOAD_HOST"
                    @change="handleChangeFile"
                  >
                    <a-button> <a-icon type="upload" />上传execcl文件</a-button>
                  </a-upload>
                </a-form-item> -->
                <a-form-item
                  label="法人信息"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="法人姓名"
                    style="margin-bottom: 20px;"
                    v-decorator="[
                      'legalPerson',
                      {
                        rules: [{ required: true, message: '请输入法人姓名' }]
                      }
                    ]"
                  />
                  <a-input
                    placeholder="法人身份证号"
                    style="margin-bottom: 20px;"
                    v-decorator="[
                      'legalPersonId',
                      {
                        rules: [
                          { required: true, message: '请输入法人身份证号' }
                        ]
                      }
                    ]"
                  />
                  <div class="upload">
                    <div class="clearfix">
                      <span>身份证正面</span>
                      <a-upload
                        name="file"
                        :action="UPLOAD_HOST"
                        listType="picture-card"
                        :fileList="justList"
                        @preview="handlePreview"
                        @change="handleChangef($event, 'just')"
                      >
                        <div v-if="justList.length < 1">
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传图片</div>
                        </div>
                      </a-upload>
                    </div>
                    <div class="clearfix">
                      <span>身份证正面</span>
                      <a-upload
                        name="file"
                        :action="UPLOAD_HOST"
                        listType="picture-card"
                        :fileList="backList"
                        @preview="handlePreview"
                        @change="handleChangef($event,'back')"
                      >
                        <div v-if="backList.length < 1">
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传图片</div>
                        </div>
                      </a-upload>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item
                  label="对公账号"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="开户行"
                    style="margin-bottom: 20px;"
                    v-decorator="[
                      'bank',
                      {
                        rules: [{ required: true, message: '请输入开户行' }]
                      }
                    ]"
                  />
                  <a-input
                    placeholder="开户行账号"
                    style="margin-bottom: 20px;"
                    v-decorator="[
                      'bankAccount',
                      {
                        rules: [{ required: true, message: '请输入开户行账号' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="公司支付宝账号"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="请输入公司支付宝账号"
                    v-decorator="[
                      'aliPayAccount',
                      {
                        rules: [
                          { required: true, message: '请输入公司支付宝账号' }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="公司联系电话"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 6 }"
                >
                  <a-input
                    placeholder="请输入公司联系电话"
                    v-decorator="[
                      'telephone',
                      {
                        rules: [
                          { required: true, message: '请输入公司联系电话' }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item >
                  <a-button
                    htmlType="submit"
                    :style="{ marginLeft: '160px' }"
                    type="primary"
                    >提交</a-button
                  >
                </a-form-item>
                <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="状态列表" :key="1">
            <a-row :style="{ padding: '20px' }">
              <a-table
                :loading="loading"
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record"> 
                  <img
                    :src="record"
                    :style="{
                      width: '38px',
                      height: '38px',
                      borderRadius: '100px'
                    }"
                    alt
                  />
                </span>
                <span slot="action" slot-scope="record">
                  <template>
                    <span v-if="record.auditType === 'OUTAGE'">停止</span>
                    <span v-if="record.auditType === 'NOW'">暂无</span>
                    <a v-if="record.auditType === 'AUDITED'" :disabled="record.id === userInfo.propertyId ? true: false" @click="switchTap(record)">切换</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script src="./apply.js"></script>

<style lang="less" scoped>
.upload {
  display: flex;
  justify-content: flex-start;
  .clearfix {
    margin-right: 20px;
  }
}
</style>
