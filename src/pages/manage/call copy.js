// import moment from 'moment'
// import OwnerAdd from "./owner-add";
const columns = [
  {
    title: "时间",
    dataIndex: "a",
    align: "center"
  },
  {
    title: "缴费编号",
    key: "b",
    dataIndex: "b",
    align: "center"
  },
  {
    title: "业主姓名",
    key: "c",
    dataIndex: "c",
    align: "center"
  },
  {
    title: "建筑平米数",
    key: "d",
    dataIndex: "d",
    align: "center"
  },
  {
    title: "付款状态",
    key: "e",
    dataIndex: "e",
    align: "center"
  },
  {
    title: "金额（元）",
    key: "f",
    dataIndex: "f",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    a:"2019-11-05 19:00",
    b: `100${i}-XXX-XXX`,
    c: "吴彦祖",
    d: `10${i}`,
    e: "已支付",
    f: `800${i}`
  });
}

const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 100,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: true,
  showQuickJumper: true
};

export default {
  name: "TableList",
  components: {
    // OwnerAdd
  },
  data() {
    return {
      form: this.$form.createForm(this),
      columns,
      data,
      pagination,
      selectedRowKeys: [],
      selectedRows: []
    };
  },

  created() {},
  methods: {
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(err);
          console.log(values);
        }
      });
    },
    // 翻页
    handleTableChange(e) {
      console.log(e);
    },
    // 重置数据
    handleReset() {
      this.form.resetFields();
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys);
      console.log(selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    onSelectBatch(){
      this.$message['info']('等待审核!');
    }
  }
};
