import { communityList, byareaList, queryAllAreas } from "@api";
// import { communityList, byareaList, queryAllAreas } from "@api";
import { mapGetters } from "vuex";
const columns = [
  {
    title: "社区省市",
    key: "provinceName",
    dataIndex: "provinceName"
  },
  {
    title: "社区城市",
    key: "cityName",
    dataIndex: "cityName"
  },
  {
    title: "社区区县",
    key: "areaName",
    dataIndex: "areaName"
  },
  {
    title: "社区名称",
    key: "communityName",
    dataIndex: "communityName"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
const pagination = {
  current: 1,
  defaultPageSize: 5,
  total: 0,
  pageSizeOptions: ["5", "10", "50", "100"],
  showSizeChanger: false,
  showQuickJumper: false
};
export default {
  name: "CoordinateSet",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      selectedItems: [],
      configs: {},
      data: [],
      columns,
      pagination,
      selectedRowKeys: [],
      selectedRows: [],
      city: [],
      community: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.getList();
    this.getAllAreas();
  },
  beforeCreate() { },
  methods: {
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          values.provinceId = values.city[0];
          values.cityId = values.city[1];
          values.areaId = values.city[2];
          const findVal = this.community.find(val=> val.id === values.id);
          values.communityName = findVal.communityName;
          console.log(values);
          this.getList(values);
        }
      });
    },
    onChange(value) {
      if (value.length === 3) {
        this.getByarea(value[2]);
      }
      console.log(value);

    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      console.log(selectedOptions);
      // load options lazily
      // setTimeout(() => {
      //   targetOption.loading = false;
      //   targetOption.children = [
      //     {
      //       label: `${targetOption.label} Dynamic 1`,
      //       value: 'dynamic1',
      //     },
      //     {
      //       label: `${targetOption.label} Dynamic 2`,
      //       value: 'dynamic2',
      //     },
      //   ];
      //   this.options = [...this.options];
      // }, 1000);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys);
      console.log(selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
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
    },
    async getAllAreas() {
      const { result, httpCode, message } = await queryAllAreas({});
      if (httpCode === 200) {
        const allAreas = JSON.parse(result.allAreas)
        this.city = allAreas.p.map((val) => {
          const item = {
            n: val.n,
            v: val.v,
            children: val.c.map((va) => {
              return {
                n: va.n,
                v: va.v,
                children: va.d
              }
            })
          }
          return item;
        })
      } else {
        this.$message.error(message);
      }
    },

    async getByarea(id) {
      console.log(id);
      const { result, httpCode, message } = await byareaList({ areaId: id });
      if (httpCode === 200) {
        this.community = result;
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async getList(self) {
      this.loading = true;
      // const { pagination: { current, defaultPageSize } } = this;
      const form = Object.assign({}, {
        // pageIndex: current,
        // pageSize: defaultPageSize,
        sunlightPersonnelId: this.userInfo.staffId
      }, self)
      const { result, httpCode, message } = await communityList(form);
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
