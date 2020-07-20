<template>
  <a-card :bordered="false">
    <!--<div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-row :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="动态名称">
              <a-input
                v-decorator="[
                'title',
                {rules: [{ required: false, message: '请输入动态名称' }]}
              ]"
                placeholder="请输入动态名称"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="时间">
              <a-date-picker
                style="width: 100%;"
                format="YYYY-MM-DD"
                v-decorator="['noticeTime', {rules: [{required: false, message: '请选择时间'}]}]"
                placeholder="请选择时间"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="类型">
              <a-select
                placeholder="请选择类型"
                v-decorator="[ 'newsType', {rules: [{ required: false, message: '请选择类型' }]}]"
              >
                <a-select-option :key="1" value="REPAIR">报修</a-select-option>
                <a-select-option :key="2" value="PAY">缴费</a-select-option>
                <a-select-option :key="3" value="SERVE">服务</a-select-option>
                <a-select-option :key="4" value="ACTIVITY">活动</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          /* <a-col :md="5" :sm="24">
            <a-form-item label="分类">
              <a-select
                placeholder="请选择分类"
                v-decorator="[ 'type', {rules: [{ required: false, message: '请选择分类' }]}]"
              >
                <a-select-option :key="index" :value="item.name" v-for="(item, index) in selectList">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> */
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" htmlType="submit">搜索</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>-->

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新增动态</a-button>
    </div>

    <a-table  
      :loading="loading"  
      :columns="columns"  
      :pagination="pagination"  
      rowKey="id"  
      :dataSource="data"  
      @change="handleTableChange"  
    >
      <span slot="avatar" slot-scope="record">
        <img :src="record" :style="{width: '80px', height: '80px',}" alt />
      </span>
      <!-- <span slot="d" slot-scope="record">
        <span>分类</span>
        <a-divider type="vertical" />
        <span>{{record}}</span>
      </span> -->
      <span slot="action" slot-scope="record">
        <template>
          <!-- <a :disabled="record.activityState === 'DNS' ? true : false" @click="examineTap(record, 'DNS')">发布</a>
          <a-divider type="vertical" />
          <a :disabled="record.activityState === 'OVER' ? true : false" @click="examineTap(record, 'OVER')">下线</a>
          <a-divider type="vertical" /> -->
          <a @click="$refs.createModal.edit(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>

    <dynamic-add ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script src="./housing.js"></script>
