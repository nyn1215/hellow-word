<template>
  <div>
    <!--
      <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
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
        <div class="table-operator">
          <a-button type="primary" icon="cloud-download" @click="downloadTap" style="margin-right:20px;">模板下载</a-button>
           <a-upload
            name="file"
            :multiple="true"
            :action="EXCEL_HOST"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :headers="headers"
            @change="handleChangeFile"
          >
            <a-button> <a-icon type="upload" />导入用户信息</a-button>
          </a-upload>
        </div>
      </div>
    </a-card>
    -->
    
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '0', paddingLeft: '16px'}"
        >
          <a-tab-pane loading="true" tab="业主列表" :key="0">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{width: '38px', height: '38px', borderRadius: '100px'}"
                    alt
                  />
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
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="租户列表" :key="1">
            <a-row :style="{padding: '20px'}">
              <a-table
                :loading="loading"  
                :columns="columns"  
                :pagination="pagination"  
                rowKey="id"  
                :dataSource="data"  
                @change="handleTableChange"  
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{width: '38px', height: '38px', borderRadius: '100px'}"
                    alt
                  />
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
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <proprietor-add ref="createModal" @ok="handleOk" />
  </div>
</template>


<script src="./proprietor.js"></script>
