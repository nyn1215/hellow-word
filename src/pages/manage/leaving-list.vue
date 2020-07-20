<template>
  <div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="投诉内容">
                <a-input
                  v-decorator="[
                'content',
                {rules: [{ required: false, message: '请输入投诉内容查找' }]}
              ]"
                  placeholder="请输入投诉内容查找"
                />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" htmlType="submit">搜索</a-button>
                <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                <!-- <a-button style="margin-left: 8px" type="primary" icon="retweet" :disabled="selectedRowKeys.length > 0 ? false: true" @click="onSelectBatch">批量删除</a-button> -->
              </span>
            </a-col>
          </a-row>
          <!-- <div class="table-operator">
            
          </div> -->
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <a-button
         slot="title"
        type="primary"
        icon="retweet"
        :disabled="selectedRowKeys.length > 0 ? false: true"
        @click="onSelectBatch"
      >批量删除</a-button>
      <div class="extra-wrapper" slot="extra">
        <a-range-picker :style="{width: '256px'}" v-model="date" @change="changeTime"/>
        <div class="extra-item" @click="exportTable">
          <a>打印表格</a>
        </div>
      </div>
      <!-- <a-range-picker :style="{width: '256px', marginRight: '24px'}" @change="changeTime" /> -->
      <!-- <a-range-picker slot="extra" :style="{width: '256px', marginRight: '24px'}" @change="changeTime" />
      <div class="extra-item"  @click="exportTable">
        <a>打印表格</a>
      </div> -->
      <a-table
        :loading="loading"
        :columns="complaintColumns"
        :pagination="pagination"
        rowKey="id"
        :dataSource="data"
        :rowSelection="{ selectedRowKeys, onChange: this.onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="record">
          <template>
            <a @click="$refs.createModal.edit(record)" :disabled="record.replyType === 'REPLY' ? true : false ">回复</a>

            <!-- replyType: "REPLY" -->

            <a-divider type="vertical" />
            <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.id)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
      <!-- </div> -->
    </a-card>
    <leaving-reply ref="createModal" @ok="handleOk" />
  </div>
</template>

<script src="./leaving.js"></script>
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