<template>
  <div>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-row :style="{padding: '20px'}">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="$refs.createModal.add()" style="margin-right:20px;">添加员工</a-button>
          <a-button type="primary" icon="cloud-download" @click="downloadTap" style="margin-right:20px;">模板下载</a-button>
        <a-upload
          name="file"
          :multiple="true"
          :action="PEXCEL_HOST"
          :headers="headers"
          @change="handleChangeFile"
        >
          <a-button> <a-icon type="upload" />导入模板</a-button>
        </a-upload>
        </div>
          <a-table
            :loading="loading"
            :columns="columns"
            :pagination="pagination"
            rowKey="id"
            :dataSource="data"
            @change="handleTableChange"
          >
            <span slot="action" slot-scope="record">
              <template>
                <a @click="$refs.createModal.edit(record)">编辑</a>
              </template>
          </span>
          </a-table>
        </a-row>
      </div>
    </a-card>
    <society-add ref='createModal' @ok='handleOk'></society-add>
  </div>
</template>

<script src="./society.js"></script>
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