<template>
  <div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48" v-if="activeKey === 0">
            <a-col :md="6" :sm="24">
              <a-form-item label="报修名称">
                <a-input
                  v-decorator="[
                    'title',
                    {rules: [{ required: false, message: '请输入报修名称' }]}
                  ]"
                  placeholder="请输入报修名称"
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="报修时间">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD HH:mm:ss"
                  v-decorator="['sysDate', {rules: [{required: false, message: '请选择报修时间'}]}]"
                  placeholder="请选择报修时间"
                />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  v-decorator="['state', {rules: [{ required: false, message: '请选择状态' }]}]"
                >
                  <a-select-option :key="1" value="NOT_COMPLETE">已确认</a-select-option>
                  <a-select-option :key="2" value="COMPLETE">已完成</a-select-option>
                  <a-select-option :key="3" value="MAINTENANCE">维修中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="分类">
                <a-select
                  placeholder="请选择分类"
                  v-decorator="[ 'type', {rules: [{ required: false, message: '请选择分类' }]}]"
                >
                  <a-select-option :key="1" value="HOME">居家报修</a-select-option>
                  <a-select-option :key="2" value="PUBLIC">公共报修</a-select-option>
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

          <a-row :gutter="48" v-if="activeKey === 1">
            <a-col :md="6" :sm="24">
              <a-form-item label="客户名称">
                <a-input
                  v-decorator="[
                    'people',
                    {rules: [{ required: false, message: '请输入客户名称' }]}
                  ]"
                  placeholder="请输入客户名称"
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="跑腿时间">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD HH:mm:ss"
                  v-decorator="['sysDate', {rules: [{required: false, message: '请选择跑腿时间'}]}]"
                  placeholder="请选择跑腿时间"
                />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  v-decorator="['state', {rules: [{ required: false, message: '请选择状态' }]}]"
                >
                  <a-select-option :key="1" value="NOT_TAKEN">未取</a-select-option>
                  <a-select-option :key="2" value="TAKEN">已取</a-select-option>
                  <a-select-option :key="3" value="TAKENING">配送中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="分类">
                <a-select
                  placeholder="请选择分类"
                  v-decorator="[ 'type', {rules: [{ required: false, message: '请选择分类' }]}]"
                >
                  <a-select-option :key="1" value="DELIVERY">快递</a-select-option>
                  <a-select-option :key="2" value="FOOD">外卖</a-select-option>
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

           <a-row :gutter="48" v-if="activeKey === 2">
            <a-col :md="5" :sm="24">
              <a-form-item label="物品名称">
                <a-input
                  v-decorator="[
                    'name',
                    {rules: [{ required: false, message: '请输入物品名称' }]}
                  ]"
                  placeholder="请输入物品名称"
                />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="客户名称">
                <a-input
                  v-decorator="[
                    'people',
                    {rules: [{ required: false, message: '请输入客户名称' }]}
                  ]"
                  placeholder="请输入客户名称"
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="寄存时间">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD HH:mm:ss"
                  v-decorator="['sysDate', {rules: [{required: false, message: '请选择寄存时间'}]}]"
                  placeholder="请选择寄存时间"
                />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  v-decorator="['state', {rules: [{ required: false, message: '请选择状态' }]}]"
                >
                  <a-select-option :key="1" value="TRUSTEESHIP">托管中</a-select-option>
                  <a-select-option :key="2" value="RETRIEVE">已取回</a-select-option>
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
    </a-card>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '0', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item" @click="exportTable">
              <a>打印表格</a>
            </div>
          </div>
          <a-tab-pane loading="true" tab="报修管理" :key="0">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="repairColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{width: '80px', height: '80px',}"
                    alt
                  />
                </span>
                <span slot="action" slot-scope="record">
                  <template>
                    <a @click="$refs.createModal.edit(record, 5)">分配</a>
                    <a-divider type="vertical" />
                    <a @click="allocationTap(record)">抢单</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="跑腿管理" :key="1">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="errandsColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{width: '80px', height: '80px',}"
                    alt
                  />
                </span>
                <span slot="action" slot-scope="record">
                   <template>
                    <a @click="$refs.createModal.edit(record, 6)">分配</a>
                    <a-divider type="vertical" />
                    <a @click="allocationTap(record)">抢单</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="寄存管理" :key="2">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="depositColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{width: '80px', height: '80px',}"
                    alt
                  />
                </span>
                <span slot="action" slot-scope="record">
                   <template>
                    <a @click="retrieveTap(record)" :disabled="record.state === 'RETRIEVE' ? true : false" >取回</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <serve-add ref="createModal" @ok="handleOk" />
  </div>
</template>

<script src="./serve.js"></script>
<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }</style>