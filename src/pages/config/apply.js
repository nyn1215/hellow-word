// import moment from 'moment'
// import OwnerAdd from "./owner-add";
import { UPLOAD_HOST } from "@api/config";
import { applyList, queryAllAreas, queryExcel, applySet, applySwitch } from "@/api";
// queryExcel
import { mapActions, mapGetters } from "vuex";
const columns = [
  {
    title: "申请时间",
    key: "applyDate",
    dataIndex: "applyDate",
    align: "center"
  },
  {
    title: "物业公司名称",
    key: "propertyName",
    dataIndex: "propertyName",
    align: "center"
  },
  {
    title: "物业小区",
    key: "communityName",
    dataIndex: "communityName",
    align: "center"
  },
  {
    title: "公司法人",
    key: "legalPerson",
    dataIndex: "legalPerson",
    align: "center"
  },
  {
    title: "联系电话",
    key: "telephone",
    dataIndex: "telephone",
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
  name: "ProprietorList",
  components: {
    // OwnerAdd
  },
  data() {
    return {
      UPLOAD_HOST,
      form: this.$form.createForm(this),
      activeKey: 0,
      columns,
      data: [],
      pagination,
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: null,
      city: [],
      justList: [],
      backList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.getList();
    this.getAllAreas();
  },
  methods: {
    ...mapActions(["login", "logout", "setInfo"]), 
    onChange(value) {
      console.log(value);
    },
    // 社区切换
    switchTap(record){
      this.getSwitchUser(record.id);
    },
    async getSwitchUser(id){
      const { result, httpCode, message } = await applySwitch({id});
      if (httpCode === 200) {
        this.login(result.token);
        this.setInfo({
          name: result.propertyName,
          avatar: result.propertyHeadUrl,
          propertyId: result.propertyId,
          staffId: result.staffId,
          menuList: result.functionList
        });
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    async linkExecl() {
      const { result, httpCode, message } = await queryExcel({});
      if (httpCode === 200) {
        window.location.href = result.templateUrl;
      } else {
        this.$message.error(message);
      }
    },
    handleChangeFile(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleChangef(info, str) {
      if (str === 'just') {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.result.fileName;
          }
          return file;
        });
        this.justList = fileList;
      } else {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.result.fileName;
          }
          return file;
        });
        this.backList = fileList;
      }
      // console.log(info)
      // console.log(str)

    },
    handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.imageZm = this.fileList.map(val => val.url).toString();
          values.personImageZm = this.justList.map(val => val.url).toString();
          values.personImageFm = this.backList.map(val => val.url).toString();
          values.provinceId = values.city[0];
          values.cityId = values.city[1];
          values.areaId = values.city[2];
          // values.excel = 'excel';
          values.sunlightPersonnelId = this.userInfo.staffId;
          this.setApply(values);
        }
      });
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
    },
    tabsChange(e) {
      if (e === 0) {
        this.getList();
      }
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
        // console.log(this.city);
        // console.log(JSON.parse(result.allAreas));
      } else {
        this.$message.error(message);
      }
    },
    async setApply(form) {
      const { result, httpCode, message } = await applySet(form);
      if (httpCode === 200) {
        console.log(result);
        // this.getConfig();
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
        sunlightPersonnelId: this.userInfo.staffId
      }, self)
      const { result, httpCode, message } = await applyList(form);
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
