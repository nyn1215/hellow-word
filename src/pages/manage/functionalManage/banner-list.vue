<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加banner</a-button>
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

<script src="./banner.js"></script>
