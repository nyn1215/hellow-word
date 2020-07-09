import moment from 'moment';
import { leavingList, complaintList, leavingBatchDel, complaintBatchDel, leavingDel, leavingReply, complaintleavingReply, complaintleavingDel } from "@/api";
import LeavingReply from "./leaving-reply";
const leavingColumns = [
  {
    title: "发布时间",
    key: "leaveTime",
    dataIndex: "leaveTime",
    align: "center"
  },
  {
    title: "业主姓名",
    key: "userName",
    dataIndex: "userName",
    align: "center"
  },
  // {
  //   title: "门牌号",
  //   key: "houseNumber",
  //   dataIndex: "houseNumber",
  //   align: "center"
  // },
  {
    title: "留言内容",
    key: "content",
    dataIndex: "content",
    align: "center"
  },
  {
    title: "状态",
    key: "replyTypeName",
    dataIndex: "replyTypeName",
    align: "center"
  },
  {
    title: "留言操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
const complaintColumns = [
  {
    title: "发布时间",
    key: "leaveTime",
    dataIndex: "leaveTime",
    align: "center"
  },
  {
    title: "业主姓名",
    key: "userName",
    dataIndex: "userName",
    align: "center"
  },
  {
    title: "投诉内容",
    key: "content",
    dataIndex: "content",
    align: "center"
  },
  {
    title: "状态",
    key: "replyTypeName",
    dataIndex: "replyTypeName",
    align: "center"
  },
  {
    title: "投诉操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

// const data = [];
// for (let i = 0; i < 50; i += 1) {
//   data.push({
//     a:"2019-11-05 19:00",
//     b: "万剑一",
//     c: "1",
//     d: "1号楼101室扰民"
//   });
// }

const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 0,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

export default {
  name: "LeavingList",
  components: {
    LeavingReply
  },
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: 1,
      leavingColumns,
      complaintColumns,
      data: [],
      pagination,
      selectedRowKeys: [],
      selectedRows: [],
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
      const form = {
        pageIndex: current,
        pageSize: defaultPageSize,
        begDate: this.date[0] ? moment(this.date[0]).format("YYYY-MM-DD") : '',
        endDate: this.date[1] ? moment(this.date[1]).format("YYYY-MM-DD") : ''
      };
      const { result, httpCode, message } = await this.$exportExcel('property/complaintExcel',form);
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
    handleOk(values) {
      this.replyList(values);
      console.log(values);
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
    },
    changeTime(e) {
      if(e.length === 0){
        this.getList();
      } else {
        this.date = [moment(e[0], "YYYY-MM-DD"), moment(e[1], "YYYY-MM-DD")];
        this.getList({
          begDate: moment(e[0]).format('YYYY-MM-DD'),
          endDate: moment(e[1]).format('YYYY-MM-DD'),
        });
      }
    },
    tabsChange(e) {
     this.getList();
     this.selectedRowKeys = this.selectedRows = [];
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys);
      // console.log(selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    onDelete(e) {
      this.delList(e);
      console.log(e);
    },
    async replyList(form) {
      const { result, httpCode, message} = this.activeKey === 0 ? await leavingReply(form) : await complaintleavingReply(form);
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async delList(id) {
      const { result, httpCode, message} = this.activeKey === 0 ? await leavingDel({id}) : await complaintleavingDel({id});
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async batchDelList() {
      const form = {ids: this.selectedRowKeys.toString()}
      const { result, httpCode, message} = this.activeKey === 0 ? await leavingBatchDel(form) : await complaintBatchDel(form);
      if (httpCode === 200) {
        this.getList();
        this.selectedRowKeys = this.selectedRows = [];
        this.$message.success(message);
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    onSelectBatch(){
      this.batchDelList();
    },
    async getList(self) {
      this.loading = true;
      const { pagination: { current, defaultPageSize } } = this;
      const form = Object.assign({}, {
        pageIndex: current,
        pageSize: defaultPageSize,
        ...this.form.getFieldsValue()
      }, self)
      const wform = this.date.length>0 ? {
        ...form,
        begDate: moment(this.date[0]).format('YYYY-MM-DD'),
        endDate: moment(this.date[1]).format('YYYY-MM-DD'),
      } : form;
      const { result, httpCode, message } = this.activeKey === 0 ? await leavingList(wform) : await complaintList(wform);
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
