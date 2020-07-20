// import moment from 'moment'
// import OwnerAdd from "./owner-add";
import { UPLOAD_HOST } from "@api/config";
import { queryAllAreas, queryExcel, register, } from "@/api";
// queryExcel
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Registerw",
  components: {
    // OwnerAdd
  },
  data() {
    return {
      UPLOAD_HOST,
      form: this.$form.createForm(this),
      activeKey: 0,

      data: [],

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
    this.getAllAreas();
  },
  methods: {
    ...mapActions(["login", "logout", "setInfo"]), 
    onChange(value) {
      console.log(value);
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
          this.setApply(values);
        }
      });
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
      const { result, httpCode, message } = await register(form);
      if (httpCode === 200) {
        console.log(result);
        this.$message.success('注册成功!');
        setTimeout(() => {
          this.$router.back();  
        }, 500);
      } else {
        this.$message.error(message);
      }
    },
    
  }
};
