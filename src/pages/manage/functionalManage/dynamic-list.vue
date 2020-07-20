<template>
  <a-card :bordered="false">
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
      <span slot="action" slot-scope="record">
        <template>
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

<script src="./dynamic.js"></script>
