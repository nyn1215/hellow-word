<template>
  <a-card :bordered="false">
    <!--
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
    -->

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加员工</a-button>
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
        <img :src="record" :style="{width: '38px', height: '38px', borderRadius: '100px'}" alt />
      </span>
      <span slot="action" slot-scope="record">
        <template>
          <a @click="$refs.createModal.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>

    <personnel-add ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script src="./personnel.js"></script>
