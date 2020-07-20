<template>
  <div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="姓名">
                <a-input
                  v-decorator="[
                'name',
                {rules: [{ required: false, message: '请输入姓名' }]}
              ]"
                  placeholder="请输入姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  v-decorator="['state', {rules: [{ required: false, message: '请选择状态' }]}]"
                >
                  <a-select-option :key="1" value="ALL">全部</a-select-option>
                  <a-select-option :key="2" value="STAY">待支付</a-select-option>
                  <a-select-option :key="3" value="PAID">已支付</a-select-option>
                  <a-select-option :key="4" value="CANCEL">已取消</a-select-option>
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
            <a-range-picker :style="{width: '256px'}" v-model="date" @change="changeTime" />
            <div class="extra-item" @click="exportTable">
              <a>打印表格</a>
            </div>
          </div>
          <a-tab-pane
            loading="true"
            :tab="item.name"
            v-for="(item, index) in tabList"
            :key="item.type"
            :index="index"
          >
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              ></a-table>
            </a-row>
          </a-tab-pane>
          <!-- <a-tab-pane tab="装修管理费" :key="9">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="renovationColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="停车费" :key="8">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="parkingColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="清洁费" :key="10">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="cleanColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="物业维修基金" :key="11">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="fundColumns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
              </a-table>
            </a-row>
          </a-tab-pane>-->
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script src="./pay.js"></script>
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
}
</style>