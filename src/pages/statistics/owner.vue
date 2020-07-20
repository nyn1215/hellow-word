<template>
  <div class="page-header-index-wide">
    <a-card title="指标说明" :bordered="false" style="margin-bottom:20px">
      <a-row>
        <a-col :sm="12" :xs="24">
          <head-info title="本月新认证业主" :content="newUserNumber" :bordered="true" />
        </a-col>
        <!--<a-col :sm="8" :xs="24">
          <head-info title="未认证业主" :content="noCheckUserNumber" :bordered="true" />
        </a-col>-->
        <a-col :sm="12" :xs="24">
          <head-info title="业主总数" :content="cumulativeUserNumber" />
        </a-col>
      </a-row>
    </a-card>
    <div
      class="antd-pro-pages-dashboard-analysis-twoColLayout"
      :class="isDesktop() ? 'desktop' : ''"
    >
      <a-row :gutter="24" type="flex" :style="{ marginTop: '0' }">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="累计注册指标" :style="{ height: '100%' }">
          </a-card>
        </a-col>
      </a-row>
      <div ref='mainBox' :style="{weight:'100%',height:'500px',background:'white',borderTop:'1px solid #ccc',paddingTop:'20px'}"></div>
    </div>

    <div
      class="antd-pro-pages-dashboard-analysis-twoColLayout"
      :class="isDesktop() ? 'desktop' : ''"
    >
     <!--

        <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
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
                row-key="id"
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
     -->
    </div>
    <!--<Map mapStyle='width:500px;height:300px'></Map>-->
  </div>
</template>

<script>
import moment from "moment";
// import axios from "axios";
import { ownerStatistics, } from "@api";
import HeadInfo from "@/components/tools/HeadInfo";
// import  Map  from "@/components/Map"
// import { Trend } from "@/components";
import { mixinDevice } from "@/utils/mixin";

const searchTableColumns = [
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "时间",
    align: "center"
  },
  {
    key: "name",
    dataIndex: "name",
    title: "注册用户名",
    align: "center"
  },
  {
    key: "stateName",
    dataIndex: "stateName",
    title: "是否认证",
    align: "center"
  },
  {
    key: "address",
    dataIndex: "address",
    title: "住址",
    align: "center"
  },
  {
    key: "typeName",
    dataIndex: "typeName",
    title: "是否租户",
    align: "center"
  }
];

const scale = [
  {
    dataKey: "value",
    min: 0
  },
  {
    dataKey: "year",
    min: 0,
    max: 1
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

const startDate = moment()
  .subtract(1, "months")
  .format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");
var echarts = require('echarts');

export default {
  name: "Owner",
  mixins: [mixinDevice],
  components: {
    HeadInfo,
    // Map
  },
  data() {
    return {
      loading: false,
      searchTableColumns,
      searchData: [],
      scale,
      data: [],
      date: [moment(startDate, "YYYY-MM-DD"), moment(endDate, "YYYY-MM-DD")],
      pagination,
      height: 400,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      cumulativeUserNumber: "0",
      noCheckUserNumber: "0",
      newUserNumber: "0"
    };
  },
  mounted() {
        this.getStatistics();
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
        endDate: moment(this.date[1]).format("YYYY-MM-DD")
      };
      const { result, httpCode, message } = await this.$exportExcel('propertyStatistics/userToExcel',form);
      console.log(result.outPath)
      if (httpCode === 200) {
        console.log(result);
        // window.location.href = result.outPath;
      } else {
        this.$message.error(message);
      }
    },
    // 时间改变
    onChangeTime(e) {
      if(e.length === 0){
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
      const { result, httpCode, message } = await ownerStatistics(form);

      if (httpCode === 200) {
        this.cumulativeUserNumber = String(result.cumulativeUserNumber);
        this.noCheckUserNumber = String(result.noCheckUserNumber);
        this.newUserNumber = String(result.newUserNumber);
        this.searchData = result.userDetail.list;
        this.pagination.total = result.userDetail.totalSize;
        let number = []
        let day = []
        result.dailyCheckUserNumber.map(val=>{
          number.push(val.number)
          day.push(val.day)
        });
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.mainBox);
        // 绘制图表
        myChart.setOption({
             tooltip: {
                  formatter: '{b}<br/>人数 : {c}'
              },
            xAxis: {
                type: 'category',
                data: day
            },
            yAxis: {
                type: 'value',
                name:'人数',
                minInterval:'1'
            },
            series: [{
                data: number,
                type: 'line',
                color:'#75AFFF'
            }]
        });
      } else {
        this.$message.error(message);
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
