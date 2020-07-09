<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="社区搜索">
              <a-cascader
                v-decorator="[
                  'city',
                  {
                    rules: [{ required: false, message: '请选择社区' }]
                  }
                ]"
                :fieldNames="{
                  label: 'n',
                  value: 'v',
                  children: 'children'
                }"
                :options="city"
                :loadData="loadData"
                @change="onChange"
                changeOnSelect
                placeholder="请选择社区"
              />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24" v-show="community.length>0">
            <a-form-item label="">
              <a-select
                allowClear
                placeholder="请选择社区"
                v-decorator="[ 'id', {rules: [{ required: false, message: '请选择社区' }]}]"
              >
                <a-select-option
                  v-for="(item, index) in community"
                  :key="index"
                  :value="item.id"
                >{{item.communityName}}</a-select-option>
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

    <a-table
      :loading="loading"
      :columns="columns"
      :pagination="false"
      rowKey="id"
      :dataSource="data"
      :rowSelection="{ type: 'radio', selectedRowKeys, onChange: this.onSelectChange }"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="record">
        <template>
          {{record}}
          <!-- <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>-->
        </template>
      </span>
    </a-table>
  </a-card>
</template>

<script src="./community.js"></script>