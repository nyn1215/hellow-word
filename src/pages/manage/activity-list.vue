<template>
<div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-row :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="活动名称">
              <a-input
                v-decorator="[
                'title',
                {rules: [{ required: false, message: '请输入活动名称' }]}
              ]"
                placeholder="请输入活动名称"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="时间">
              <a-date-picker
                style="width: 100%;"
                format="YYYY-MM-DD"
                v-decorator="['activityTime', {rules: [{required: false, message: '请选择时间'}]}]"
                placeholder="请选择时间"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="状态">
              <a-select
                placeholder="请选择状态"
                v-decorator="[ 'activityState', {rules: [{ required: false, message: '请选择状态' }]}]"
              >
                <a-select-option :key="1" value="DNS">发布</a-select-option>
                <a-select-option :key="2" value="NOW">待发布</a-select-option>
                <a-select-option :key="3" value="OVER">下线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="分类">
              <a-select
                placeholder="请选择分类"
                v-decorator="[ 'type', {rules: [{ required: false, message: '请选择分类' }]}]"
              >
                <a-select-option :key="index" :value="item.name" v-for="(item, index) in selectList">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" htmlType="submit">搜索</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加活动</a-button>
      <a-button type="primary" icon="retweet" @click="exportTable">打印表格</a-button>
    </div>
    </a-card>
  <a-card :bordered="false">
     <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '0', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <a-range-picker :style="{width: '256px'}" format="YYYY-MM-DD" v-show="activeKey == 1" @change="onChangeTime" />
          </div>
          <a-tab-pane tab="活动列表" :key="0">
            <a-row :style="{padding: '20px'}">

    
<!---------------------------------------------         一条华丽的分割线               ---------------------------------------------------->
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
          
          <a :disabled="record.activityState === 'DNS' ? true : false" @click="examineTap(record, 'DNS')">发布</a>
          <a-divider type="vertical" />
          <a :disabled="record.activityState === 'OVER' ? true : false" @click="examineTap(record, 'OVER')">下线</a>
          <a-divider type="vertical" />
          <a @click="$refs.createModal.edit(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
    <activity-add ref="createModal" @ok="handleOk" />
    </a-row>
          </a-tab-pane>
          <a-tab-pane tab="活动报名" :key="1">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="equipmentColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
               <span slot="action" slot-scope="record">
                  <template>
                    <a @click="handleDetail(record)">详情</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
  </a-card>
    <activity-detail ref="createDetail"  />
  </div>
</template>
<script>
export default {
// <!---<a-divider type="vertical" />----->
}
</script>
<script src="./activity.js"></script>
