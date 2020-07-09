<template>
  <div class="page-header-index-wide">
    <a-card title="缴费指标" :bordered="false" style="margin-bottom:20px">

      <div class="row-top"> 
        <div v-for="(item, index) in payList" :key="index">
          <head-info :title="item.payTypeName" :content="''+item.totalMoney" :bordered="index === 4 ? false : true" />
        </div>
      </div>

      <!-- <a-row :gutter="25"> 
        <a-col :sm="5" :xs="24">
          <head-info title="水电费" content="100" :bordered="true" />
        </a-col>
        <a-col :sm="5" :xs="24">
          <head-info title="装修管理费" content="100" :bordered="true" />
        </a-col>
        <a-col :sm="5" :xs="24">
          <head-info title="车位费" content="100" :bordered="true" />
        </a-col>
        <a-col :sm="5" :xs="24">
          <head-info title="清洁费" content="100" />
        </a-col>
      </a-row>-->
    </a-card>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
          <!--  
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
            <a-tab-pane
            loading="true"
            :tab="item.name"
            v-for="(item, index) in tabList"
            :key="item.type"
            :index="index"
          >
          -->
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <div id='charts1'>
                 <!-- <h3 class="title">各项指标</h3>
                   <ul class="list">
                    <li>
                      <span>
                        <em>订单总数：</em>
                        <a-tag color="#3a8dff">{{total.transactionNumber}}</a-tag>
                      </span>
                      <span></span>
                    </li>
                    <li v-for="(item, index) in data" :key="index">
                      <span>
                        <em>{{item.payStateName}}：</em>
                        <a-tag color="#3fc2c0">{{item.transactionNumber}}</a-tag>
                      </span>
                      <span></span>
                    </li>
                    <li>
                      <span>
                        <em>金额：</em>
                        <a-tag color="#ec4d6b">{{!!total.totalMoney ? total.totalMoney: 0}}</a-tag>
                      </span>
                      <span></span>
                    </li>
                  </ul>-->
                </div>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <div id='charts2'>
                  <!--
                    <v-chart
                    :forceFit="true"
                    :padding="[ 15, 20, 15, 20]"
                    :height="height"
                    :data="data"
                    :scale="scale"
                  >
                    <v-tooltip :showTitle="false" data-key="payStateName*transactionNumber" />
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
                  --> 
                </div>
              </a-col>
            </a-row>
           <!--
              <a-row :gutter="24" type="flex">
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card :bordered="false" title :style="{ height: '100%' }">
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
                      row-key="day"
                      size="small"
                      :columns="searchTableColumns"
                      :dataSource="searchData"
                      :pagination="pagination"
                      @change="handleTableChange"
                    ></a-table>
                  </div>
                </a-card>
              </a-col>
            </a-row>
           
          </a-tab-pane>
        </a-tabs>-->
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from "moment";
import {
  societyStatistics,
  societyStatisticsTotal,
  societyStatisticsPie,
} from "@api";
import HeadInfo from "@/components/tools/HeadInfo";
// import { ChartCard, Trend, RankList } from "@/components";
import { mixinDevice } from "@/utils/mixin";
import echarts from 'echarts'

const DataSet = require("@antv/data-set");

const searchTableColumns = [
  {
    dataIndex: "day",
    title: "时间",
    align: "center"
  },
  {
    dataIndex: "transactionNumber",
    title: "订单总数",
    align: "center"
  },
  {
    dataIndex: "CANCEL",
    title: "作废数",
    align: "center"
  },
  {
    dataIndex: "PAID",
    title: "已支付数",
    align: "center"
  },
  {
    dataIndex: "STAY",
    title: "待支付数",
    align: "center"
  },
  {
    dataIndex: "totalMoney",
    title: "累计金额（元）",
    align: "center"
  }
];

const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 0,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%"
  }
];

const color = [
  "payStateName",
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

const startDate = moment()
  .subtract(1, "months")
  .format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

const tabList = [
  {
    name: "物业费",
    type: 7
  },
  {
    name: "装修管理费",
    type: 9
  },
  {
    name: "停车费",
    type: 8
  },
  {
    name: "清洁费",
    type: 10
  },
  {
    name: "物业维修基金",
    type: 11
  }
];

export default {
  name: "Society",
  mixins: [mixinDevice],
  components: {
    HeadInfo
  },
  data() {
    return {
      // loading: false,
      // searchTableColumns,
      // searchData: [],
      // pagination,
      // data: [],
      // date: [moment(startDate, "YYYY-MM-DD"), moment(endDate, "YYYY-MM-DD")],
      // scale,
      // color,
      // height: 400,
      // pieStyle: {
      //   stroke: "#fff",
      //   lineWidth: 1
      // },
      // labelConfig: [
      //   "percent",
      //   {
      //     formatter: (val, item) => {
      //       return item.point.payStateName + ": " + val;
      //     }
      //   }
      // ],
      payList: [],
      // pieList: [],
      // total: {},
      // activeKey: tabList[0].type,
      // tabList
    };
  },
  created() {
    // this.getStatistics();
    this.getStatisticsTotal();
    // this.getStatisticsPie();
  },
  mounted() {
    let data  =  [{value: 70, name: '实际金额占比',itemStyle:{color:'#91c7ae'}},{value: 30, name: '欠费金额占比',itemStyle:{color:'#61a0a8'}} ]
    let data1  =  [{value: 70, name: '已缴人数占比',itemStyle:{color:'#91c7ae'}},{value: 30, name: '未缴人数占比',itemStyle:{color:'#61a0a8'}} ]
    this.chartsDraw('charts1','缴费金额比例',data)
    this.chartsDraw('charts2','缴费人数比例',data1)
  },
  methods: {
    chartsDraw(domId,title,data){
       var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: title,
                left: '20',
                top:'20',
                padding: [5, 50],
                textStyle:{
                  'lineHeight':50,
                  'marginLeft':'30',
                  'fontWeight':400,
                }
            },
            tooltip: {
              trigger: 'item',
                  formatter: '{b} : {d}%'
            },
            series: [
                {
                    type: 'pie',
                    top:'10%',
                    label: {
                        position: 'inner',
                        formatter: '{b}: {d}%',
                        fontSize : 15
                    },
                    data: data
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    // exportTable() {
    //   this.exportStatistics();
    // },
    // async exportStatistics() {
    //   const {
    //     pagination: { current, defaultPageSize }
    //   } = this;
    //   const form = {
    //     pageIndex: current,
    //     pageSize: defaultPageSize,
    //     beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
    //     endDate: moment(this.date[1]).format("YYYY-MM-DD"),
    //     payTypeId: this.activeKey
    //   };
    //   const { result, httpCode, message } = await this.$exportExcel('propertyStatistics/payDetailStatisticsToExcel',form);
    //   if (httpCode === 200) {
    //     console.log(result);
    //     window.location.href = result.outPath;
    //   } else {
    //     this.$message.error(message);
    //   }
    // },
    // onChangeTime(e) {
    //   if (e.length === 0) {
    //     this.getStatistics();
    //   } else {
    //     this.date = [moment(e[0], "YYYY-MM-DD"), moment(e[1], "YYYY-MM-DD")];
    //     this.getStatistics();
    //   }
    // },
    // // 翻页
    // handleTableChange(e) {
    //   this.getStatistics({ pageIndex: e.current, pageSize: e.pageSize });
    //   this.pagination.current = e.current;
    //   this.pagination.pageSize = e.pageSize;
    // },
    // tabsChange(e) {
    //   this.pagination.current = 1;
    //   this.getStatistics();
    //   this.getStatisticsPie();
    // },
    async getStatisticsTotal(self) {
      const form = {
        year: moment().format("YYYY")
      };
      const { result, httpCode, message } = await societyStatisticsTotal(form);
      if (httpCode === 200) {
        this.payList = result.totalPropertyMoneys;
      } else {
        this.$message.error(message);
      }
      this.loading = false;
    },
    // async getStatisticsPie(self) {
    //   const form = {
    //     year: moment().format("YYYY"),
    //     payTypeId: this.activeKey
    //   };
    //   const { result, httpCode, message } = await societyStatisticsPie(form);
    //   if (httpCode === 200) {
    //     this.pieList = result.transactionNumberAndTotalMoney.states;
    //     this.total = result.transactionNumberAndTotalMoney.total;
    //     const dv = new DataSet.View().source(this.pieList);
    //     dv.transform({
    //       type: "percent",
    //       field: "transactionNumber",
    //       dimension: "payStateName",
    //       as: "percent"
    //     });
    //     this.data = dv.rows;
    //   } else {
    //     this.$message.error(message);
    //   }
    // },
    // async getStatistics(self) {
    //   this.loading = true;
    //   const {
    //     pagination: { current, defaultPageSize }
    //   } = this;
    //   const form = Object.assign(
    //     {},
    //     {
    //       pageIndex: current,
    //       pageSize: defaultPageSize,
    //       beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
    //       endDate: moment(this.date[1]).format("YYYY-MM-DD"),
    //       payTypeId: this.activeKey
    //     },
    //     self
    //   );
    //   const { result, httpCode, message } = await societyStatistics(form);
    //   if (httpCode === 200) {
    //     this.searchData = result.list;
    //     this.pagination.total = result.totalSize;
    //   } else {
    //     this.$message.error(message);
    //   }
    //   this.loading = false;
    // }
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
.row-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    width: 20%;
    .head-info {
      width: 100%;
    }
  }
}
#charts1{
  width:100%;
  height:600px;
}
#charts2{
  width:100%;
  height:600px;
}
</style>
