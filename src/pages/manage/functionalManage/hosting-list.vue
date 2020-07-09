<template>
  <div>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-row :style="{padding: '20px'}">
          <a-table
            :loading="loading"
            :columns="errandsColumns"
            :pagination="pagination"
            rowKey="id"
            :dataSource="data"
            @change="handleTableChange"
          >
            <span slot="action" slot-scope="record">
                <template>
                <a @click="$refs.createModal.add(record)">派单</a>
                <a-divider type="vertical" />
                <a @click="$refs.createModal1.edit(record)">详情</a>
              </template>
            </span>
          </a-table>
        </a-row>
      </div>
    </a-card>
    <hosting-add ref="createModal" @ok="handleOk" />
    <hosting-detail ref="createModal1" @ok="handleOk" />
  </div>
</template>

<script src="./hosting.js"></script>
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