<template>
  <div class="page-header-index-wide">
    <a-card title="物业门禁指标" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-row>
          <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="rank" style="padding:50px 0 0 120px">
              <h3 class="title">各项指标</h3>
              <ul class="list">
                <li>
                  <span>
                    小区北门：
                    <a-tag color="#3a8dff">10次</a-tag>
                  </span>
                  <span></span>
                </li>
                <li>
                  <span>
                    小区南门：
                    <a-tag color="#3fc2c0">10次</a-tag>
                  </span>
                  <span></span>
                </li>
                <li>
                  <span>
                    小区东门：
                    <a-tag color="#4bc464">10次</a-tag>
                  </span>
                  <span></span>
                </li>
              </ul>
            </div>
          </a-col>
          <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
            <div>
              <!-- <h3 :style="{ marginBottom: '0', marginTap: '20px',textAlign: 'center' }">门禁指标</h3> -->
              <v-chart
                :forceFit="true"
                :padding="[ 15, 20, 15, 20]"
                :height="height"
                :data="data"
                :scale="scale"
              >
                <v-tooltip :showTitle="false" data-key="item*percent" />
                <!-- :color="['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80','#8d98b3','#e5cf0d','#97b552']" -->
                <v-axis />
                <v-legend
                  data-key="item"
                  :textStyle="{fontSize: '14',}"
                  position="left-top"
                  :offsetX="140"
                  :offsetY="120"
                />
                <v-pie position="percent" :color="color" :vStyle="pieStyle" :label="labelConfig" />
                <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
              </v-chart>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <div
      class="antd-pro-pages-dashboard-analysis-twoColLayout"
      :class="isDesktop() ? 'desktop' : ''"
    >
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="" :style="{ height: '100%' }">
            <a-range-picker slot="extra" :style="{width: '256px'}" />
            <a href="#" style="padding-left:20px;" slot="extra">打印表格</a>
            <div class="ant-table-wrapper">
              <a-table
                row-key="index"
                size="small"
                :columns="searchTableColumns"
                :dataSource="searchData"
                :pagination="pagination"
              ></a-table>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
// import { Trend } from "@/components";
// import { RankList } from "@/components";
import { mixinDevice } from "@/utils/mixin";

const searchTableColumns = [
  {
    title: "时间",
    key: "a",
    dataIndex: "a",
    align: "center"
  },
  {
    title: "小区门",
    key: "b",
    dataIndex: "b",
    align: "center"
  },
  {
    title: "楼门",
    key: "c",
    dataIndex: "c",
    align: "center"
  },
  {
    title: "业主姓名",
    key: "d",
    dataIndex: "d",
    align: "center"
  }
];

const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    a: "2019-12-25",
    b: "小区北门",
    c: "小区1号楼门",
    d: "万剑一"
  });
}

const DataSet = require("@antv/data-set");

const sourceData = [
  { item: "北门", count: 10 },
  { item: "南门", count: 10 },
  { item: "东门", count: 10 }
];

const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%"
  }
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: "percent",
  field: "count",
  dimension: "item",
  as: "percent"
});
const data = dv.rows;

const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 100,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};
const color = [
  "item",
  [
    "#3a8dff",
    "#3fc2c0",
    "#4bc464",
    "#f9cc36",
    "#ec4d6b",
    "#8d98b3",
    "#e5cf0d",
    "#97b552"
  ]
];

export default {
  name: "Owner",
  mixins: [mixinDevice],
  components: {},
  data() {
    return {
      loading: true,
      searchTableColumns,
      searchData,
      pagination,
      data,
      scale,
      color,
      height: 400,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "percent",
        {
          formatter: (val, item) => {
            return item.point.item + ": " + val;
          }
        }
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
  }
};
</script>

<style lang="less" scoped>
.rank {
  padding: 32px 32px 32px 72px;

  .list {
    margin: 25px 0 0;
    padding: 0;
    list-style: none;

    li {
      margin-top: 24px;

      span {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;
        &.active {
          background-color: #314659;
          color: #fff;
        }
        &:last-child {
          float: right;
        }
      }
    }
  }
}
</style>
