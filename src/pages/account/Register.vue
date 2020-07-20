<template>
  <div>
    <a-card
      :bordered="false"
      :body-style="{ padding: '0', }"
      style="width: 800px;margin:auto;border-radius: 10px"
    >
      <!-- <div class="salesCard"> -->

      <a-row :gutter="10" :style="{ padding: '50px 20px', }">
        <a-form :form="form" @submit="handleSubmit">
           <a-form-item label="账号" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <a-input
            v-decorator="['account', {rules: [{required: true, message: '请输入账号'}]}]"
            placeholder="请输入账号"
          />
        </a-form-item>
         <a-form-item label="密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <a-input
            type="password"
            v-decorator="['password', {rules: [{required: true, message: '请输入密码'}]}]"
            placeholder="请输入密码"
          />
        </a-form-item>
          <a-form-item label="物业社区名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item label="小区所在地" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item label="详细地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
            <a-textarea
              rows="4"
              v-decorator="[
                      'address',
                      { rules: [{ required: true, message: '请输入详细地址' }] }
                    ]"
              placeholder="请输入详细地址"
            />
          </a-form-item>
          <a-form-item label="物业公司名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item label="物业公司营业执照" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
 
          <a-form-item label="物业法人信息" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
              placeholder="物业法人身份证号"
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
                <span>身份证反面</span>
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
          <a-form-item label="物业对公账号" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item label="物业公司支付宝账号" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item label="物业公司联系电话" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
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
          <a-form-item>
           <a-checkbox :style="{ marginLeft: '190px' }" v-decorator="['rememberMe']">阅读并同意开通协议</a-checkbox>
          </a-form-item>
           
          <a-form-item>
            <a-button htmlType="submit" :style="{ marginLeft: '190px' }" type="primary">注册</a-button>
          </a-form-item>
          <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form>
      </a-row>

      <!-- </div> -->
    </a-card>
  </div>
</template>

<script src="./Registerw.js"></script>

<style lang="less" scoped>
.upload {
  display: flex;
  justify-content: flex-start;
  .clearfix {
    margin-right: 20px;
  }
}
</style>
