<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <a-tab-pane
            :tab="item.name"
            v-for="(item, index) in tabList"
            :key="item.type"
            :index="index"
          >
          <a-row v-show="activeKey === 3">
              <a-col :xl="24" :lg="12" :md="12" :sm="24" :xs="24">
                <!-- <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
                <v-tooltip />
                <v-axis />
                <v-bar position="year*sales" />
                </v-chart>-->
                <v-chart :forceFit="true" :height="height" :data="data1" :scale="scale1">
                  <v-tooltip />
                  <v-axis />
                  <v-bar position="time*数量" />
                </v-chart>
                <!-- <div id="containers" style="width: 100%; margin:auto;"></div> -->
              </a-col>
            </a-row>
            <a-row v-show="activeKey === 1 || activeKey === 2">
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="rank" style="padding:50px 0 0 120px">
                  <h3 class="title">各项指标</h3>
                  <ul class="list">
                    <li v-for="(item, index) in normList" :key="index">
                      <span>
                        <em>{{item.item}}：</em>
                        <a-tag color="#3a8dff">{{item.count}}</a-tag>
                      </span>
                      <span></span>
                    </li>
                  </ul>
                </div>
              </a-col>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div>
                  <!-- <h3 :style="{textAlign: 'center' }">报修指标</h3> -->
                  <v-chart
                    :forceFit="true"
                    :padding="[ 15, 20, 15, 20]"
                    :height="height"
                    :data="data"
                    :scale="scale"
                  >
                    <v-tooltip :showTitle="false" data-key="item*percent" />
                    <!-- :color="['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80','#8d98b3','#e5cf0d','#97b552']" -->
                    <v-axis
                      :title="{
                      autoRotate: true,
                      text: '11111'
                    }"
                    />
                    <v-legend
                      data-key="item"
                      :textStyle="{fontSize: '14',}"
                      position="left-top"
                      :offsetX="80"
                      :offsetY="120"
                    />
                    <v-pie
                      position="percent"
                      :color="color"
                      :vStyle="pieStyle"
                      :label="labelConfig"
                    />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </div>
              </a-col>
            </a-row>
            <!-- <a-row>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="rank" style="padding:50px 0 0 120px">
                  <h3 class="title">各项指标</h3>
                  <ul class="list">
                    <li v-for="(item, index) in normList" :key="index">
                      <span>
                        <em>{{item.item}}：</em>
                        <a-tag color="#3a8dff">{{item.count}}</a-tag>
                      </span>
                      <span></span>
                    </li>
                  </ul>
                </div>
              </a-col>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div>
                  <h3 :style="{textAlign: 'center' }">报修指标</h3>
                  <v-chart
                    :forceFit="true"
                    :padding="[ 15, 20, 15, 20]"
                    :height="height"
                    :data="data"
                    :scale="scale"
                  >
                    <v-tooltip :showTitle="false" data-key="item*percent" />
                    <v-axis
                      :title="{
                      autoRotate: true,
                      text: '11111'
                    }"
                    />
                    <v-legend
                      data-key="item"
                      :textStyle="{fontSize: '14',}"
                      position="left-top"
                      :offsetX="140"
                      :offsetY="120"
                    />
                    <v-pie
                      position="percent"
                      :color="color"
                      :vStyle="pieStyle"
                      :label="labelConfig"
                    />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </div>
              </a-col>
            </a-row> -->
            <a-row :gutter="24" type="flex">
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card :bordered="false" :style="{ height: '100%' }">
                  <a-range-picker
                    slot="extra"
                    :value="date"
                    format="YYYY-MM-DD"
                    @change="onChangeTime"
                    :style="{width: '256px'}"
                  />
                  <a style="padding-left:20px;" slot="extra" @click="exportTable">打印表格</a>
                  <div class="ant-table-wrapper">
                    <a-table
                      :loading="loading"
                      row-key="id"
                      size="small"
                      :columns="columns"
                      :dataSource="searchData"
                      :pagination="pagination"
                      @change="handleTableChange"
                    >
                    
                    <span slot="staffName" slot-scope="text,record">
                      {{record.beginTime + '-' + record.endTime}}
                    </span>
                    </a-table>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </a-tab-pane>
          <!-- <a-tab-pane tab="跑腿" :key="2"></a-tab-pane>
          <a-tab-pane tab="寄存" :key="3"></a-tab-pane>-->
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from "moment";
import {
  repairDetailStatistics,
  substituteDetailStatistics,
  trusteeshipDetailStatistics,
  repairTotalNumberStatistics,
  substituteTotalNumberStatistics,
  // trusteeshipTotalNumberStatistics,
  monthNumberStatistics
} from "@api";

// import HeadInfo from "@/components/tools/HeadInfo";
// import { ChartCard, Trend, RankList } from "@/components";
import { mixinDevice } from "@/utils/mixin";
const DataSet = require("@antv/data-set");
const repairColumns = [
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "时间",
    align: "center"
  },
  {
    key: "typeName",
    dataIndex: "typeName",
    title: "维修类型",
    align: "center"
  },
  {
    key: "stateName",
    dataIndex: "stateName",
    title: "处理进度",
    align: "center"
  },
  {
    key: "repairName",
    dataIndex: "repairName",
    title: "业主姓名",
    align: "center"
  },
  {
    key: "staffName",
    dataIndex: "staffName",
    title: "物业人员",
    align: "center"
  },
  {
    key: "content",
    dataIndex: "content",
    title: "详情",
    align: "center"
  }
];

const errandsColumns = [
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "时间",
    align: "center"
  },
  {
    key: "typeName",
    dataIndex: "typeName",
    title: "跑腿类型",
    align: "center"
  },
  {
    key: "userName",
    dataIndex: "userName",
    title: "业主姓名",
    align: "center"
  },
  {
    key: "staffName",
    dataIndex: "staffName",
    title: "物业人员",
    align: "center"
  },
  {
    key: "content",
    dataIndex: "content",
    title: "详情",
    align: "center"
  }
];
const depositColumns = [
  {
    key: "name",
    dataIndex: "name",
    title: "寄存名称",
    align: "center"
  },
  {
    key: "people",
    dataIndex: "people",
    title: "联系人",
    align: "center"
  },
  {
    key: "phone",
    dataIndex: "phone",
    title: "联系方式",
    align: "center"
  },
  {
    key: "staffName",
    dataIndex: "staffName",
    title: "托管时间",
    scopedSlots: { customRender: "staffName" },
    align: "center"
  },

];
// const searchData = [];
// for (let i = 0; i < 50; i += 1) {
//   searchData.push({
//     id:`${i+1}`,
//     a: "2019-10-30",
//     b: "电梯维修",
//     c: "进行中",
//     d: "业主1",
//     e: "物业1",
//     f: "电梯按钮失灵需要重新更换"
//   });
// }
const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 100,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

// const sourceData = [
//   { item: "已完成", count: 10 },
//   { item: "未完成", count: 10 },
//   { item: "进行中", count: 10 }
// ];

const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%"
  }
];
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
// const dv = new DataSet.View().source(sourceData);
// dv.transform({
//   type: "percent",
//   field: "count",
//   dimension: "item",
//   as: "percent"
// });
// const data = dv.rows;

const tabList = [
  {
    name: "报修",
    type: 1
  },
  {
    name: "跑腿",
    type: 2
  },
  {
    name: "寄存",
    type: 3
  }
];

const startDate = moment()
  .subtract(1, "months")
  .format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default {
  name: "Repair",
  mixins: [mixinDevice],
  components: {
    // ChartCard,
    // Trend,
    // RankList,
    // HeadInfo
  },
  data() {
    return {
      loading: true,
      repairColumns,
      errandsColumns,
      depositColumns,
      searchData: [],
      pagination,
      data: [],
      date: [moment(startDate, "YYYY-MM-DD"), moment(endDate, "YYYY-MM-DD")],
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
      ],
      payList: [],
      pieList: [],
      normList: [],
      activeKey: tabList[0].type,
      tabList,
      scale1: [
        {
          dataKey: "sales",
          tickInterval: 20
        }
      ],
      data1: []
    };
  },
  computed: {
    columns() {
      switch (this.activeKey) {
        case 1:
          return this.repairColumns;
        case 2:
          return this.errandsColumns;
        case 3:
          return this.depositColumns;
        default:
          return [];
      }
    },
  },
  created() {
    this.getStatistics();
    this.getStatisticsPie();
  },

  methods: {
     exportTable() {
      this.exportStatistics();
    },
    async exportStatistics() {
      const {
        pagination: { current, defaultPageSize }
      } = this;
      const form = {
        pageIndex: current,
        pageSize: defaultPageSize,
        beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
        endDate: moment(this.date[1]).format("YYYY-MM-DD"),
      };
      const { result, httpCode, message } = this.activeKey === 1
          ? await this.$exportExcel('propertyStatistics/repairDetailToExcel',form)
          : this.activeKey === 2
          ? await this.$exportExcel('propertyStatistics/substituteDetailToExcel',form)
          : await this.$exportExcel('propertyStatistics/trusteeshipDetailToExcel',form)
      if (httpCode === 200) {
        console.log(result);
        window.location.href = result.outPath;
      } else {
        this.$message.error(message);
      }
    },
    onChangeTime(e) {
      if (e.length === 0) {
        this.getStatistics();
      } else {
        this.date = [moment(e[0], "YYYY-MM-DD"), moment(e[1], "YYYY-MM-DD")];
        this.getStatistics();
      }
    },
    // 翻页
    handleTableChange(e) {
      this.getStatistics({ pageIndex: e.current, pageSize: e.pageSize });
      this.pagination.current = e.current;
      this.pagination.pageSize = e.pageSize;
    },
    tabsChange(e) {
      this.pagination.current = 1;
      this.getStatistics();
      this.getStatisticsPie();
    },
    async getStatisticsPie(self) {
      const form = {
        year: moment().format("YYYY")
      };
      const { result, httpCode, message } =
        this.activeKey === 1
          ? await repairTotalNumberStatistics(form)
          : this.activeKey === 2
          ? await substituteTotalNumberStatistics(form)
          : await monthNumberStatistics(form);

      console.log(result);
      if (httpCode === 200) {
        if (this.activeKey === 3) {
          const list = [];
            result.monthNumbers.map(val => {
              list.push({
                time: val.month,
                '数量': parseInt(val.number )
              });
            });
            
         
          this.data1 = list;
          // console.log(dv.rows)
          console.log(list) 
          // this.chartPie();
        } else {
          this.normList = result.typeNumbers.map(val => {
          return {
            item: this.activeKey === 1 ? val.publicTypeName : val.typeName,
            count: val.number
          };
        });
        this.pieList = result.stateNumbers.map(val => {
          return {
            item: val.stateName,
            count: val.number
          };
        });
        const dv = new DataSet.View().source(this.pieList);
        dv.transform({
          type: "percent",
          field: "count",
          dimension: "item",
          as: "percent"
        });
        this.data = dv.rows;
        }
        
      } else {
        this.$message.error(message);
      }
    },
    async getStatistics(self) {
      this.loading = true;
      const {
        pagination: { current, defaultPageSize }
      } = this;
      const form = Object.assign(
        {},
        {
          pageIndex: current,
          pageSize: defaultPageSize,
          beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
          endDate: moment(this.date[1]).format("YYYY-MM-DD")
        },
        self
      );
      // if (this.activeKey === 2) {
      //   form.type = "DELIVERY";
      // }
      const { result, httpCode, message } =
        this.activeKey === 1
          ? await repairDetailStatistics(form)
          : this.activeKey === 2
          ? await substituteDetailStatistics(form)
          : await trusteeshipDetailStatistics(form);
      if (httpCode === 200) {
        this.searchData = result.list;
        this.pagination.total = result.totalSize;
      } else {
        this.$message.error(message);
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.rank {
  padding: 0 32px 32px 72px;
  .list {
    margin: 25px 0 0;
    padding: 0;
    list-style: none;
    li {
      margin-top: 16px;
      span {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;
        em {
          width: 70px;
          font-style: normal;
          display: inline-block;
        }
        &.active {
          background-color: #314659;
          color: #fff;
        }
        &:last-child {
          float: right;
        }
      }
      &:nth-child(1n) {
        /deep/ .ant-tag {
          background: #3a8dff !important;
        }
      }
      &:nth-child(2n) {
        /deep/ .ant-tag {
          background: #3fc2c0 !important;
        }
      }
      &:nth-child(3n) {
        /deep/ .ant-tag {
          background: #4bc464 !important;
        }
      } 
      &:nth-child(4n) {
        /deep/ .ant-tag {
          background: #f9cc36 !important;
        }
      }
      &:nth-child(5n) {
        /deep/ .ant-tag {
          background: #ec4d6b !important;
        }
      }
      &:nth-child(6n) {
        /deep/ .ant-tag {
          background: #8d98b3 !important;
        }
      }
      &:nth-child(7n) {
        /deep/ .ant-tag {
          background: #e5cf0d !important;
        }
      }
      &:nth-child(8n) {
        /deep/ .ant-tag {
          background: #97b552 !important;
        }
      }
      &:nth-child(9n) {
        /deep/ .ant-tag {
          background: #97b552 !important;
        }
      }
      &:nth-child(10n) {
        /deep/ .ant-tag {
          background: #97b552 !important;
        }
      }
    }
  }
}

.mobile .rank {
  padding: 0 32px 32px 32px;
}
</style>
