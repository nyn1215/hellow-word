<template>
  <div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="手机号">
                <a-input
                  v-decorator="[
                'keywords1',
                {rules: [{ required: false, message: '请输入手机号' }]}
              ]"
                  placeholder="请输入手机号查找"
                />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="分类">
                <a-select
                  placeholder="请选择分类"
                  v-decorator="[ 'desc7', {rules: [{ required: false, message: '请选择分类' }]}]"
                >
                  <a-select-option :key="1" :value="1">物业费</a-select-option>
                  <a-select-option :key="2" :value="2">水电费</a-select-option>
                  <a-select-option :key="3" :value="3">车位费</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  v-decorator="[ 'desc7', {rules: [{ required: false, message: '请选择状态' }]}]"
                >
                  <a-select-option :key="1" :value="1">已支付</a-select-option>
                  <a-select-option :key="2" :value="2">未支付</a-select-option>
                  <a-select-option :key="3" :value="3">劵支付</a-select-option>
                  <a-select-option :key="4" :value="4">实付款</a-select-option>
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
          <div class="table-operator">
            <a-button type="primary" icon="retweet" :disabled="selectedRowKeys.length > 0 ? false: true" @click="onSelectBatch">批量催交</a-button>
          </div>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '0', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <a-range-picker :style="{width: '256px'}" />
            <div class="extra-item">
              <a>打印表格</a>
            </div>
          </div> 
          <a-tab-pane loading="true" tab="物业费1" key="1">
            <a-row :style="{padding: '20px'}">
              <a-table
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                :rowSelection="{ selectedRowKeys, onChange: this.onSelectChange }"
                @change="handleTableChange"
              >
                <span slot="action" slot-scope="record">
                  <template>
                    <a @click="handleEdit(record)">催交</a>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="装修管理费2" key="2">
            <a-row :style="{padding: '20px'}">
              <a-table
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="停车费3" key="3">
            <a-row :style="{padding: '20px'}">
              <a-table
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="清洁费4" key="4">
            <a-row :style="{padding: '20px'}">
              <a-table
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
           <a-tab-pane tab="物业维修基金5" key="5">
            <a-row :style="{padding: '20px'}">
              <a-table
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script src="./call.js"></script>
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