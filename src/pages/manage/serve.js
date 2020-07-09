import moment from 'moment';
import ServeAdd from "./serve-add";
import { repairList, errandsList, queryCheckList, robOrder, substituteConfirm, repairConfirm, substituteUpdateState } from "@/api";

const repairColumns = [
  // {
  //   title: "编号",
  //   dataIndex: "id",
  //   align: "center"
  // },
  {
    title: "报修名称",
    key: "title",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "缩略图",
    key: "images", 
    dataIndex: "images",
    scopedSlots: { customRender: "avatar" },
    align: "center"
  },
  {
    title: "报修详情",
    key: "content",
    dataIndex: "content",
    align: "center" 
  },
  {
    title: "状态",
    key: "stateName",
    dataIndex: "stateName",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

const errandsColumns = [
  {
    title: "收货人",
    key: "people",
    dataIndex: "people",
    align: "center"
  },
  // {
  //   title: "缩略图",
  //   key: "images",
  //   dataIndex: "images",
  //   scopedSlots: { customRender: "avatar" },
  //   align: "center"
  // },
  {
    title: "详情",
    key: "content",
    dataIndex: "content",
    align: "center" 
  },
  {
    title: "状态",
    key: "stateName",
    dataIndex: "stateName",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

const depositColumns = [
  {
    title: "收货人",
    key: "people",
    dataIndex: "people",
    align: "center"
  },
  {
    title: "缩略图",
    key: "images",
    dataIndex: "images",
    scopedSlots: { customRender: "avatar" },
    align: "center"
  },
  {
    title: "详情",
    key: "name",
    dataIndex: "name",
    align: "center" 
  },
  {
    title: "状态",
    key: "stateName",
    dataIndex: "stateName",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
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

export default {
  name: "ServeList",
  components: {
    ServeAdd
  },
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: 0,
      repairColumns,
      errandsColumns,
      depositColumns,
      data: [],
      pagination,
      loading: false,
      date: []
    };
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

      const form = this.form.getFieldsValue().sysDate ? {
        pageIndex: current,
        pageSize: defaultPageSize,
        ...this.form.getFieldsValue(),
        sysDate: moment(this.form.getFieldsValue().sysDate).format('YYYY-MM-DD HH:mm:ss')
        // values.sysDate= moment(values.sysDate).format('YYYY-MM-DD HH:mm:ss')
        // beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
        // endDate: moment(this.date[1]).format("YYYY-MM-DD"),
      } : {
        pageIndex: current,
        pageSize: defaultPageSize,
        ...this.form.getFieldsValue(),
      };

      // if(this.form.getFieldsValue().sysDate){
        
      //   values.sysDate= moment(values.sysDate).format('YYYY-MM-DD HH:mm:ss')
      // }

     
      const { result, httpCode, message } = this.activeKey === 0
          ? await this.$exportExcel('serviceManagement/outRepairExcel',form)
          : this.activeKey === 1
          ? await this.$exportExcel('serviceManagement/outSubstituteExcel',form)
          : await this.$exportExcel('serviceManagement/outTrusteeshipExcel',form)
      if (httpCode === 200) {
        console.log(result);
        window.location.href = result.outPath;
      } else {
        this.$message.error(message);
      }
    },
    async retrieveTap(record){
      const { httpCode, message } = await substituteUpdateState({id:record.id});
      if (httpCode === 200) {
        this.getList();
      } else {
        this.$message.error(message);
      }
    },
    handleOk(e) {
      console.log(e);
      this.repairConfirm(e.k.toString(),e.c);
    },
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.sysDate){
            values.sysDate= moment(values.sysDate).format('YYYY-MM-DD HH:mm:ss')
          }
          this.pagination.current = 1;
          this.getList(values);
        }
      });
    },
    // 翻页
    handleTableChange(e) {
      this.getList({ pageIndex: e.current, pageSize: e.pageSize})
      this.pagination.current = e.current;
      this.pagination.pageSize = e.pageSize;
      this.pagination.defaultPageSize = e.pageSize;
    },
    // 重置数据
    handleReset() {
      this.form.resetFields();
      this.getList();
      this.pagination.current = 1;
      
    },
    tabsChange(e) {
      this.getList();
    },
    // 分配 抢单
    allocationTap(record){
      this.betchStaff(record.id)
    },
    
    async repairConfirm(id, cid){
      const form = {
        id: cid,
        staffId: id
      };
      const { httpCode, message } = this.activeKey === 0 ? await repairConfirm(form) : await substituteConfirm(form)
      
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
      } else {
        this.$message.success(message);
      }
    },
    async betchStaff(id){
      const form = {
        orderId: id,
        type: this.activeKey === 0 ? 'REPAIR' : 'SUBSTITUTE'
      };
      const { httpCode, message } = await robOrder(form);
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
      } else {
        this.$message.success(message);
      }
    },
    async getList(self) {
      this.loading = true;
      const { pagination: { current, defaultPageSize } } = this;
      const form = Object.assign({}, {
        pageIndex: current,
        pageSize: defaultPageSize,
        // beginDate: moment(this.date[0]).format("YYYY-MM-DD"),
        // endDate: moment(this.date[1]).format("YYYY-MM-DD"),
        ...this.form.getFieldsValue()
      }, self)
      
      const { result, httpCode, message } = this.activeKey === 0 ? await repairList(form) : this.activeKey === 1 ? await errandsList(form) : await queryCheckList(form);
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
