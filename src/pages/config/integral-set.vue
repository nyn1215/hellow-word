<template>
  <!-- <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="16">
         <a-col :md="24" :lg="10">
            <a-form layout="vertical" :form="form" @submit="handleSubmit" autocomplete="off">
               <a-form-item label="小区开门" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="楼门" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="家门" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="报修" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="跑腿" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="寄存" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key3', {rules: [{ required: true, message: '请输入' }]}]"
                     placeholder="积分"
                  />
               </a-form-item>
               <a-form-item label="联系电话" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="['key4', {rules: [{ required: true, message: '请输入联系电话' }]}]"
                     placeholder="请输入联系电话"
                  />
               </a-form-item>
               <a-form-item  label="支付宝账号" :wrapper-col="{ span: 18 }">
                  <a-input
                     v-decorator="[ 'key1', { rules: [{ required: false, message: '请输入支付宝账号' }] },]"
                     placeholder="请输入支付宝账号"
                  />
               </a-form-item>
              
               <a-form-item>
                  <a-button type="primary" html-type="submit">提交</a-button>
               </a-form-item>
            </a-form>
         </a-col>
      </a-row>
    </div>
  </a-card>-->
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="小区开门">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item label="楼门">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
          <a-form-item label="家门">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="报修">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item label="跑腿">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
          <a-form-item label="寄存">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="业主完善信息">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item label="租户完善信息">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
          <a-form-item label="缴费">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="参加活动">
            <a-input
              placeholder="积分"
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入',}]}
            ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button type="primary" htmlType="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script src="./integral.js"></script>