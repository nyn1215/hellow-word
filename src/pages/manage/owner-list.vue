<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号">
              <a-input
                v-decorator="[
                  'telephone',
                  {rules: [{ required: false, message: '请输入手机号' }]}
                ]"
                placeholder="输入手机号查找"
              />
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
      <a-dropdown icon="retweet" :disabled="selectedRowKeys.length > 0 ? false: true">
        <a-menu @click="handleMenuClick" slot="overlay">
          <a-menu-item :key="1">通过</a-menu-item>
          <a-menu-item :key="2">拒绝</a-menu-item>
        </a-menu>
        <a-button>
          批量操作
          <a-icon  icon="retweet" type="down" />
        </a-button>
      </a-dropdown>
      <!-- <a-button
        type="primary"
        icon="retweet"
        :disabled="selectedRowKeys.length > 0 ? false: true"
        @click="onSelectBatch"
      >批量操作</a-button> -->
    </div>

    <a-table
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :dataSource="data"
      :rowSelection="{ selectedRowKeys, onChange: this.onSelectChange }"
      @change="handleTableChange"
    >
      <span slot="floorhouse" slot-scope="record">{{record}}</span>
      <span slot="avatar" slot-scope="record">
        <img :src="record" :style="{width: '38px', height: '38px', borderRadius: '100px'}" alt />
      </span>
      <span slot="action" slot-scope="record">
        <template>
          <a @click="onSelectBatch(record, 1)">通过</a>
          <a-divider type="vertical" />
          <a @click="onSelectBatch(record, 2)">拒绝</a>
        </template>
      </span>
    </a-table>

    <!-- <owner-add ref="createModal" @ok="handleOk" /> -->
  </a-card>
</template>

<script src="./owner.js"></script>
