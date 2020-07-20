
import { financeGetDetails, financeSetDetails, queryAllAreas } from "@api";

import moment from "moment";
// import city from "@/common/js/city";
import { mapGetters } from "vuex"; 

export default {
  name: "PaySet",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      data: {},
      city: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  async created() {
    this.getAllAreas();
    console.log(this.userInfo + financeSetDetails);
    await this.getDetails();
    // return false;
    this.$nextTick(() => {
      this.form.setFieldsValue({
        date: [this.data.startTime ? moment(this.data.startTime, 'YYYY-MM-DD') : '', this.data.closingTime ? moment(this.data.closingTime, 'YYYY-MM-DD'): ''],
        legalPerson: this.data.legalPerson,
        legalPersonPhone: this.data.legalPersonPhone,
        aliPayAccount: this.data.aliPayAccount,
        weChatAccount: this.data.weChatAccount,
        bankAccount: this.data.bankAccount,
        telephone: this.data.telephone,
        city: [this.data.provinceId,this.data.cityId,this.data.areaId],
        address: this.data.address
      })
    });
  },

  // 我传给后台 格式是这样的

  // roleListids: [1,2,3]


  // 后台返回给我是这样的 [{
  //   id: 1,
  //   name: '角色名'
  // },{
  //   id: 2,
  //   name: '角色名'
  // },{
  //   id: 3,
  //   name: '角色名'
  // }]

  methods: {
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(err); 
          values.id = this.userInfo.propertyId;
          // values.startTime = moment(values.date[0]).format('YYYY-MM-DD');
          // values.closingTime = moment(values.date[0]).format('YYYY-MM-DD');
          values.provinceId = values.city[0];
          values.cityId = values.city[1];
          values.areaId = values.city[2];
          this.setDetails(values);
          console.log(values);
        }
      });
    },
    onChange(value) {
      console.log(value);
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
    async setDetails(form) {
      const { result, httpCode, message } = await financeSetDetails(form);
      if (httpCode === 200) {
        console.log(result);
        this.getDetails();
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    
    async getDetails() {
      const { result, httpCode, message } = await financeGetDetails({id: this.userInfo.propertyId});
      if (httpCode === 200) {
        this.data = result;
        console.log(this.data)
      } else {
        this.$message.error(message);
      }
      this.loading = false;
    }
  }
};