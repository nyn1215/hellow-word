import moment from "moment";
import { societyList, sendPayPush } from "@api";
import { propertyColumns, renovationColumns, parkingColumns, cleanColumns, fundColumns, tabList } from "@/pages/base/propertyList";
const action = {
  title: "操作",
  key: "action",
  scopedSlots: { customRender: "action" }
}
propertyColumns.push(action);
renovationColumns.push(action);
parkingColumns.push(action);
cleanColumns.push(action);
fundColumns.push(action);
 
const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 0, 
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

export default {
  name: "CollList",
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
      selectedRowKeys: [],
      selectedRows: [],
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
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getList(values);
        }
      });
    },
    changeTime(e) {
      if(e.length === 0){
        this.getList();
      } else {
        this.getList({
          begTime: moment(e[0]).format('YYYY-MM-DD'),
          endTime: moment(e[1]).format('YYYY-MM-DD'),
        });
      }
    },
    // 翻页
    handleTableChange(e) {
      this.getList({ pageIndex: e.current, pageSize: e.pageSize })
      this.pagination.current = e.current;
      this.pagination.pageSize = e.pageSize;
    },
    // 重置数据
    handleReset() {
      this.form.resetFields();
      this.date = [];
      this.getList();
    },
    tabsChange(e) {
      this.getList();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    onSelectBatch(record, str) {
      if(str === 'cj'){
        this.sendPayPushs({
          ids: [record.id]
        })
      } else {
        this.sendPayPushs({
          ids: this.selectedRowKeys
        })
      }
      
    },
    async sendPayPushs(self){
      const form = {
        payTypeId: this.activeKey,
        ...self
      }
      const { result, httpCode, message } = await sendPayPush(form);
      console.log(result);
      if (httpCode === 200) {
        this.getList();
        this.selectedRowKeys = [];
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    async getList(self) {
      this.loading = true;
      const { pagination: { current, defaultPageSize } } = this;
      const form = Object.assign({}, {
        pageIndex: current,
        pageSize: defaultPageSize,
        payTypeId: this.activeKey,
        ...this.form.getFieldsValue(),
      }, self) 
      const wform = this.date.length>0 ? {
        ...form,
        begTime: moment(this.date[0]).format('YYYY-MM-DD'),
        endTime: moment(this.date[1]).format('YYYY-MM-DD'),
      } : form;
      const { result, httpCode, message } = await societyList(wform);
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
