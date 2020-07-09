import moment from 'moment';
import { paymentList } from "@api"
import { propertyColumns, renovationColumns, parkingColumns, cleanColumns, fundColumns, tabList } from "@/pages/base/propertyList";

// const propertyColumns = [
//   {
//     title: "缴费时间",
//     key: "payDate",
//     dataIndex: "payDate",
//     align: "center"
//   },
//   {
//     title: "门牌号",
//     key: "houseNumber",
//     dataIndex: "houseNumber",
//     align: "center"
//   }, 
//   {
//     title: "业主姓名",
//     key: "name",
//     dataIndex: "name",
//     align: "center"
//   },
//   {
//     title: "电话",
//     key: "phone",
//     dataIndex: "phone",
//     align: "center"
//   },
//   {
//     title: "建筑平米",
//     key: "builtupArea",
//     dataIndex: "builtupArea",
//     align: "center"
//   },
//   {
//     title: "付款方式",
//     key: "tradeNo",
//     dataIndex: "tradeNo",
//     align: "center"
//   },
//   {
//     title: "月数",
//     key: "monthlyNumber",
//     dataIndex: "monthlyNumber",
//     align: "center"
//   },
//   {
//     title: "金额(元)",
//     key: "money",
//     dataIndex: "money",
//     align: "center"
//   }
// ];

// const renovationColumns = [
//   {
//     title: "缴费时间",
//     key: "payDate",
//     dataIndex: "payDate",
//     align: "center"
//   },
//   {
//     title: "门牌号",
//     key: "houseNumber",
//     dataIndex: "houseNumber",
//     align: "center"
//   },
//   {
//     title: "业主姓名",
//     key: "name",
//     dataIndex: "name",
//     align: "center"
//   },
//   {
//     title: "电话",
//     key: "phone",
//     dataIndex: "phone",
//     align: "center"
//   },
//   {
//     title: "建筑平米",
//     key: "builtupArea",
//     dataIndex: "builtupArea",
//     align: "center"
//   },
//   {
//     title: "付款方式",
//     key: "tradeNo",
//     dataIndex: "tradeNo",
//     align: "center"
//   },
//   {
//     title: "监督费(元)",
//     key: "renovation",
//     dataIndex: "renovation",
//     align: "center"
//   },
//   {
//     title: "垃圾清运费(元)",
//     key: "architecture",
//     dataIndex: "architecture",
//     align: "center"
//   },
//   {
//     title: "金额(元)",
//     key: "money",
//     dataIndex: "money",
//     align: "center"
//   }
// ];

// const parkingColumns = [
//   {
//     title: "缴费时间",
//     key: "payDate",
//     dataIndex: "payDate",
//     align: "center"
//   },
//   {
//     title: "门牌号",
//     key: "houseNumber",
//     dataIndex: "houseNumber",
//     align: "center"
//   },
//   {
//     title: "业主姓名",
//     key: "name",
//     dataIndex: "name",
//     align: "center"
//   },
//   {
//     title: "电话",
//     key: "phone",
//     dataIndex: "phone",
//     align: "center"
//   },
//   {
//     title: "产权费(元)",
//     key: "propertyRightFee",
//     dataIndex: "propertyRightFee",
//     align: "center"
//   },
//   {
//     title: "服务费(元)",
//     key: "serviceCharge",
//     dataIndex: "serviceCharge",
//     align: "center"
//   },
//   {
//     title: "使用费(元)",
//     key: "royalty",
//     dataIndex: "royalty",
//     align: "center"
//   },
//   {
//     title: "金额(元)",
//     key: "money",
//     dataIndex: "money",
//     align: "center"
//   },
//   {
//     title: "付款方式",
//     key: "tradeNo",
//     dataIndex: "tradeNo",
//     align: "center"
//   },
// ];

// const cleanColumns = [
//   {
//     title: "缴费时间",
//     key: "payDate",
//     dataIndex: "payDate",
//     align: "center"
//   },
//   {
//     title: "门牌号",
//     key: "houseNumber",
//     dataIndex: "houseNumber",
//     align: "center"
//   },
//   {
//     title: "业主姓名",
//     key: "name",
//     dataIndex: "name",
//     align: "center"
//   },
//   {
//     title: "电话",
//     key: "phone",
//     dataIndex: "phone",
//     align: "center"
//   },
//   {
//     title: "面积(平米)",
//     key: "builtupArea",
//     dataIndex: "builtupArea",
//     align: "center"
//   },
//   {
//     title: "清洁费(元)",
//     key: "cleaningFee",
//     dataIndex: "cleaningFee",
//     align: "center"
//   },
//   {
//     title: "金额(元)",
//     key: "money",
//     dataIndex: "money",
//     align: "center"
//   },
//   {
//     title: "付款方式",
//     key: "tradeNo",
//     dataIndex: "tradeNo",
//     align: "center"
//   },
// ];
// const fundColumns = [
//   {
//     title: "缴费时间",
//     key: "payDate",
//     dataIndex: "payDate",
//     align: "center"
//   },
//   {
//     title: "门牌号",
//     key: "houseNumber",
//     dataIndex: "houseNumber",
//     align: "center"
//   },
//   {
//     title: "业主姓名",
//     key: "name",
//     dataIndex: "name",
//     align: "center"
//   },
//   {
//     title: "电话",
//     key: "phone",
//     dataIndex: "phone",
//     align: "center"
//   },
//   {
//     title: "面积(平米)",
//     key: "builtupArea",
//     dataIndex: "builtupArea",
//     align: "center"
//   },
//   {
//     title: "单价(元)",
//     key: "unitPrice",
//     dataIndex: "unitPrice",
//     align: "center"
//   },
//   {
//     title: "建筑面积成本(元)",
//     key: "cost",
//     dataIndex: "cost",
//     align: "center"
//   },
//   {
//     title: "金额(元)",
//     key: "money",
//     dataIndex: "money",
//     align: "center"
//   },
//   {
//     title: "付款方式",
//     key: "tradeNo",
//     dataIndex: "tradeNo",
//     align: "center"
//   },
// ];

const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 0,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

export default {
  name: "PayList",
  components: {

  },
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: 7,
      propertyColumns,
      renovationColumns,
      parkingColumns,
      cleanColumns,
      fundColumns,
      data: [],
      pagination,
      loading: false,
      tabList,
      date: []
    };
  },
  computed: {
    columns() {
      switch (this.activeKey) {
        case 7:
          return this.propertyColumns;
        case 9:
          return this.renovationColumns;
        case 8:
          return this.parkingColumns;
        case 10:
          return this.cleanColumns;
        case 11:
          return this.fundColumns;
        default:
          return [];
      }
    },
  },
  created() {
    this.getList();
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
        payTypeId: this.activeKey,
        begDate: this.date[0] ? moment(this.date[0]).format("YYYY-MM-DD") : '',
        endDate: this.date[1] ? moment(this.date[1]).format("YYYY-MM-DD") : '',
        ...this.form.getFieldsValue()
      };
      const { result, httpCode, message } = await this.$exportExcel('paymentList/outExcel',form);
      if (httpCode === 200) {
        console.log(result);
        window.location.href = result.fileName;
      } else {
        this.$message.error(message);
      }
    },
    // 表单查询 
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.pagination.current = 1;
          this.getList(values);
        }
      });
    },
    changeTime(e) {
      if (e.length === 0) {
        this.getList();
      } else {
        this.date = [moment(e[0], "YYYY-MM-DD"), moment(e[1], "YYYY-MM-DD")];
        this.getList({
          begDate: moment(e[0]).format('YYYY-MM-DD'),
          endDate: moment(e[1]).format('YYYY-MM-DD'),
        });
      }
    },
    // 翻页
    handleTableChange(e) {
      this.getList({ pageIndex: e.current, pageSize: e.pageSize })
      this.pagination.current = e.current;
      this.pagination.pageSize = e.pageSize;
      this.pagination.defaultPageSize = e.pageSize;
    },

    // 重置数据
    handleReset() {
      this.form.resetFields();
      this.date = [];
      this.getList();
      this.pagination.current = 1;
    },
    tabsChange(e) {
      console.log(e);
      this.getList();
    },
    async getList(self) {
      this.loading = true;
      const { pagination: { current, defaultPageSize } } = this;
      const form = Object.assign({}, {
        pageIndex: current,
        pageSize: defaultPageSize,
        payTypeId: this.activeKey,
        ...this.form.getFieldsValue()
      }, self)
      const wform = this.date.length>0 ? {
        ...form,
        begTime: moment(this.date[0]).format('YYYY-MM-DD'),
        endTime: moment(this.date[1]).format('YYYY-MM-DD'),
      } : form;
      const { result, httpCode, message } = await paymentList(wform);
      console.log(result);
      if (httpCode === 200) {
        this.data = result.list;
        this.pagination.total = result.totalSize;
      } else {
        this.$message.error(message);
      }
      this.loading = false;
    }
  }
};
