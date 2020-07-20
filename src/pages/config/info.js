// import moment from 'moment'
// import OwnerAdd from "./owner-add";
import { UPLOAD_HOST } from "@api/config";
import {
  queryAllAreas,
  // applySet,
  queryCommunityByArea,
  infoQueryDetail,
  register
} from "@/api";
// queryExcel
import { mapActions, mapGetters } from "vuex";
 
export default {
  name: "InfoSet",
  components: {
    // OwnerAdd
  },
  data() {
    return {
      UPLOAD_HOST,
      form: this.$form.createForm(this),
      activeKey: 0,
      data: {},
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: null,
      city: [],
      justList: [],
      backList: [],
      community: []
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.getInfo();
    this.getAllAreas();
  },
  methods: {
    ...mapActions(["login", "logout", "setInfo"]),
    onChange(value) {
      if (value.length === 3) {
        this.getByarea(value[2]);
      }
    },
    handleChangef(info, str) {
      if (str === "just") {
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
          values.id = this.userInfo.propertyId;
          this.setApply(values);
        }
      });
    },
    // 翻页
    handleTableChange(e) {
      this.getList({ pageIndex: e.current, pageSize: e.pageSize });
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
        const allAreas = JSON.parse(result.allAreas);
        this.city = allAreas.p.map(val => {
          const item = {
            n: val.n,
            v: val.v,
            children: val.c.map(va => {
              return {
                n: va.n,
                v: va.v,
                children: va.d
              };
            })
          };
          return item;
        });
        // console.log(this.city);
        // console.log(JSON.parse(result.allAreas));
      } else {
        this.$message.error(message);
      }
    },
    async getByarea(id) {
      // console.log(id);
      const { result, httpCode, message } = await queryCommunityByArea({
        areaId: id
      });
      if (httpCode === 200) {
        this.community = result;
        // console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async setApply(form) {
      const { result, httpCode, message } = await register(form);
      if (httpCode === 200) {
        this.form.resetFields();
        this.justList = this.backList = [];
        console.log(result);
        this.getInfo();
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    async getInfo() {
      const { result, httpCode, message } = await infoQueryDetail({id:this.userInfo.propertyId});
      if (httpCode === 200) {
        this.data = result;
        this.$nextTick(async () => {
          this.fileList = [result.imageZm].map((val,index)=>{
            return {
              uid: index,
              name: val,
              url:val
            }
          })
          this.justList = [result.personImageZm].map((val,index)=>{
            return {
              uid: index,
              name: val,
              url:val
            }
          })
          this.backList = [result.personImageFm].map((val,index)=>{
            return {
              uid: index,
              name: val,
              url:val
            }
          })
          // await this.getByarea(result.areaId);
          this.form.setFieldsValue({
            city: [result.provinceId, result.cityId,result.areaId,],
            communityIdNo: result.communityIdNo,
            propertyName: result.propertyName,
            address: result.address,
            legalPerson: result.legalPerson,
            legalPersonId: result.legalPersonId,
            bank: result.bank,
            bankAccount: result.bankAccount,
            aliPayAccount: result.aliPayAccount,
            telephone: result.telephone,
            communityName: result.communityName
            // password: result.password,
            // account: result.account,
          })
        });
      } else {
        this.$message.error(message);
      }
    }
  }
};
