<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="16">
         <a-col :md="24" :lg="10">
            <a-form layout="vertical" :form="form" @submit="handleSubmit" autocomplete="off">
                <a-form-item  label="合作期限" :wrapper-col="{ span: 18 }">
                  <a-range-picker
                     disabled
                     v-decorator="[ 'date', { rules: [{ required: false, message: '请选择合作期限' }] },]"
                     style="width: 100%;"
                     format="YYYY-MM-DD"
                  />
                  <!-- :showTime="{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}" -->
               </a-form-item>
                <a-form-item label="联系人" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['legalPerson', {rules: [{ required: true, message: '请输入联系人' }]}]"
                     placeholder="请输入联系人"
                  />
               </a-form-item>
               <a-form-item label="联系电话" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['legalPersonPhone', {rules: [{ required: true, message: '请输入联系电话' }]}]"
                     placeholder="请输入联系电话"
                  />
               </a-form-item>
               <a-form-item  label="支付宝账号" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="[ 'aliPayAccount', { rules: [{ required: false, message: '请输入支付宝账号' }] },]"
                     placeholder="请输入支付宝账号"
                  />
               </a-form-item>
               <a-form-item  label="微信账号" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="[ 'weChatAccount', { rules: [{ required: false, message: '请输入微信账号' }] },]"
                     placeholder="请输入微信账号"
                  />
               </a-form-item>
               <a-form-item  label="银行对公账号" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="[ 'bankAccount', { rules: [{ required: false, message: '请输入银行对公账号' }] },]"
                     placeholder="请输入银行对公账号"
                  />
               </a-form-item>

               <a-form-item label="固定电话" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['telephone', {rules: [{ required: true, message: '请输入固定电话' }]}]"
                     placeholder="请输入固定电话"
                  />
               </a-form-item>
               <a-form-item label="所属区域" :wrapper-col="{ span: 18 }">
                  <a-cascader
                     v-decorator="['city', {rules: [{ required: true, message: '请选择所属区域' }]}]"
                     :fieldNames="{ label: 'n', value: 'v', children: 'children' }"
                     :options="city"
                     placeholder="请选择所属区域"
                  />
               </a-form-item>
               <a-form-item label="详细地址" :wrapper-col="{ span: 18 }">
                  <a-textarea 
                     rows="4" 
                     v-decorator="['address', {rules: [{ required: true, message: '请输入详细地址' }]}]" 
                     placeholder="请输入详细地址"
                  />
               </a-form-item>
               <a-form-item>
                  <a-button type="primary" html-type="submit">提交</a-button>
               </a-form-item>
            </a-form>
         </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<script src="./set.js"></script>