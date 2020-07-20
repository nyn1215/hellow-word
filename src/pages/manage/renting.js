// import moment from 'moment'
import { rentingList, rentingAdd, rentingDel,rentingDetail } from "@/api";
import RentingAdd from "./renting-add";
import RenmtingAdd from "./renmting-add";
const columns = [
  {
    title: "业主头像",
    key: "headUrl",
    dataIndex: "headUrl",
    scopedSlots: { customRender: "avatar" },
    align: "center"
  },
  {
    title: "用户名",
    key: "name",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "性别",
    key: "sex",
    dataIndex: "sex",
    align: "center"
  },
  {
    title: "手机号",
    key: "telephone",
    dataIndex: "telephone",
    align: "center"
  },
  {
    title: "住址",
    key: "address",
    dataIndex: "address",
    align: "center"
  },
  {
    title: "停车位",
    key: "parkingSpace",
    dataIndex: "parkingSpace",
    align: "center"
  },
  {
    title: "积分",
    key: "myIntegral",
    dataIndex: "myIntegral",
    align: "center"
  },
  {
    title: "入住时间",
    key: "createTime",
    dataIndex: "createTime",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
// const pagination = {
//   current: 1,
//   defaultPageSize: 5,
//   total: 0,
//   pageSizeOptions: ["5", "10", "50", "100"],
//   showSizeChanger: true,
//   showQuickJumper: true
// };
// const listData = [];
//   for (let i = 0; i < 23; i++) {
//     listData.push({
//       href: 'https://www.antdv.com/',
//       title: `ant design vue part ${i}`,
//       avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//       description:
//         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//       content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     });
//   }
const styleList = [
  {
    type: 'UNLIMITED',
    name: '不限',
  },
  {
    type: 'ROOMONE',
    name: '一室',
  },
  {
    type: 'ROOMTWO',
    name: '两室',
  },
  {
    type: 'ROOMTHREE',
    name: '三室',
  },
  {
    type: 'ROOMFOUR',
    name: '四室',
  },
  {
    type: 'ROOMFIVE',
    name: '四室以上',
  },
]

const rentList = [
  {
    type: 'UNLIMITED',
    name: '不限',
  },
  {
    type: 'ONE_THOUSAND',
    name: '1000元以下',
  },
  {
    type: 'TWO_THOUSAND',
    name: '1000-2000元',
  },
  {
    type: 'FOUR_THOUSAND',
    name: '2000-4000元',
  },
  {
    type: 'SIX_THOUSAND',
    name: '4000-6000元',
  },
  {
    type: 'EIGHT_THOUSAND',
    name: '6000-8000元',
  },
  {
    type: 'THOUSAND',
    name: '8000以上',
  },
]
const typeList = [
  {
    type: 'WHOLE',
    name: '整租',
  },
  {
    type: 'RENT',
    name: '合租',
  }
]
const orientationIdList = [
  {
    type: 'UNLIMITED',
    name: '不限',
  },
  {
    type: 'SOUTH_NORTH',
    name: '南北通透',
  },
  {
    type: 'SOUTH',
    name: '朝南',
  },
  {
    type: 'EAST_SOUTH',
    name: '东南向',
  },
  {
    type: 'EAST',
    name: '朝东',
  },
  {
    type: 'WEST_SOUTH',
    name: '西南向',
  },
  {
    type: 'NORTH',
    name: '朝北',
  },
  {
    type: 'WEST',
    name: '朝西',
  },
  {
    type: 'EAST_WEST',
    name: '东西向',
  },
  {
    type: 'EAST_NORTH',
    name: '东北向',
  },
  {
    type: 'WEST_NORTH',
    name: '西北向',
  },
]
const priceList = [
  {
    type: 'UNLIMITED',
    name: '不限',
  },
  {
    type: 'FIFTY',
    name: '50万以下',
  },
  {
    type: 'HUNDRED',
    name: '50-100万',
  },
  {
    type: 'HUNDREDFIFTY',
    name: '100-150万',
  },
  {
    type: 'TWOHUNDRED',
    name: '150-200万',
  },
  {
    type: 'THREEHUNDRED',
    name: '200-300万',
  },
  {
    type: 'ABOVE',
    name: '300万以上',
  },
]

const measureAreaTypeList = [
  {
    type: 'UNLIMITED',
    name: '不限',
  },
  {
    type: 'ONE',
    name: '50平米以下',
  },
  {
    type: 'TWO',
    name: '50-70平米',
  },
  {
    type: 'THREE',
    name: '70-90平米',
  },
  {
    type: 'FOUR',
    name: '90-110平米',
  },
  {
    type: 'FIVE',
    name: '110-130平米',
  },
  {
    type: 'SIX',
    name: '130-150平米',
  },
  {
    type: 'SEVEN',
    name: '150-200平米',
  },
  {
    type: 'EIGHT',
    name: '200-300平米',
  },
  {
    type: 'NINE',
    name: '300平米以上',
  },
]

export default {
  name: "RentingList",
  components: {
    RentingAdd,
    RenmtingAdd
  },
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: 0,
      columns,
      data: [],
      // pagination,
      loading: false,
      // listData,
      pagination: {
        current: 1,
        defaultPageSize: 5,
        total: 0,
        // pageSizeOptions: ["5", "10", "50", "100"],
        // showSizeChanger: true,
        // showQuickJumper: true,
        onChange: (e) => {
          this.handleTableChange(e)
          console.log(e);
        },
        // pageSize: 3,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      tags: ['Movies', 'Books', 'Music', 'Sports'],
      selectedTags: [],
      styleList,
      rentList,
      typeList,
      orientationIdList,
      priceList,
      measureAreaTypeList,
      typeTags: [],
      styleTags: [],
      rentTags: [],
      orientationTags: [],
      priceTags: [],
      measureAreaTypeTags: [],
      record: {}
    };
  },

  created() {
    this.getList();
  },
  methods: {
     
    handleChange(tag, checked, str) {
      const { selectedTags } = this;
      const nextSelectedTags = checked ? [tag]
        : selectedTags.filter(t => t !== tag);
      if(str === 1) {
        this.typeTags = nextSelectedTags;
        // this.getList({
        //   type: 
        // });
      }
      if(str === 2) {
        this.styleTags = nextSelectedTags;
      }
      if(str === 3) {
        this.rentTags = nextSelectedTags;
      }
      if(str === 4) {
        this.orientationTags = nextSelectedTags;
      }
      if(str === 5) {
        this.priceTags = nextSelectedTags;
      }
      if(str === 6) {
        this.measureAreaTypeTags = nextSelectedTags;
      }
      setTimeout(() => {
        this.handleSubmit()
      }, 0);
      
      console.log('You are interested in: ', nextSelectedTags);
      // console.log(selectedTags.indexOf(tag) > -1)
      
    },
    handleOk(values) {
      this.addList(values);
    },
    async handleEdit(record){
      if(this.activeKey === 0){
        await this.getDetail(record.id);
        this.$refs.createModal.edit(this.record)
        return false;
      }
      if(this.activeKey === 1){
        await this.getDetail(record.id);
        this.$refs.crmeateModal.edit(this.record)
        return false;
      }
    },
    handleAdd(){
      if(this.activeKey === 0){
        this.$refs.createModal.add();
        return false;
      }
      if(this.activeKey === 1){
        this.$refs.crmeateModal.add();
        return false;
      }
      
    },
    // 表单查询
    handleSubmit(e) {
      // e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          
          if(this.typeTags.length>0){
            const findVal = this.typeList.find(val=> val.name === this.typeTags.toString())
            console.log(findVal)
            if(findVal){
              values.type = findVal.type;
            }
            
          }
          if(this.styleTags.length>0){
            console.log(this.styleTags.toString())
            const findVal = this.styleList.find(val=> val.name === this.styleTags.toString())
            console.log(findVal)
            if(findVal){
              values.style = findVal.type;
            }
          }
          if(this.rentTags.length>0){
            const findVal = this.rentList.find(val=> val.name === this.rentTags.toString())
            console.log(findVal)
            // if(findVal){
              values.rent = findVal.type;
              console.log(values)
            // }
          }
          if(this.orientationTags.length>0){
            const findVal = this.orientationIdList.find(val=> val.name === this.orientationTags.toString())
            // values.orientationId = findVal.type;
            if(findVal){
              values.orientationId = findVal.type;
            }
          }
          if(this.priceTags.length>0){
            const findVal = this.priceList.find(val=> val.name === this.priceTags.toString())
            // values.orientationId = findVal.type;
            if(findVal){
              values.price = findVal.type;
            }
          }
          if(this.measureAreaTypeTags.length>0){
            const findVal = this.measureAreaTypeList.find(val=> val.name === this.measureAreaTypeTags.toString())
            // values.orientationId = findVal.type;
            if(findVal){
              values.measureAreaType = findVal.type;
            }
          }
          // if(str === 1) {
          //   this.typeTags = nextSelectedTags;
          // }
          // if(str === 2) {
          //   this.styleTags = nextSelectedTags;
          // }
          // if(str === 3) {
          //   this.rentTags = nextSelectedTags;
          // }
          // if(str === 4) {
          //   this.orientationTags = nextSelectedTags;
          // }
          this.pagination.current = 1;
          this.getList(values);
        }
      });
    },
    // 翻页
    handleTableChange(e) {
      console.log(e);
      this.getList({ pageIndex: e, pageSize: 5})
      this.pagination.current = e.current;
      // this.pagination.pageSize = e.pageSize;
    },
    // 重置数据
    handleReset() {
      this.form.resetFields();
      this.getList();
    },
    tabsChange(e) {
      this.pagination.current = 1;
      this.getList();
    },
    onDelete(e) {
      this.delList({
        ids: e
      });
      console.log(e);
    },
    async getDetail(id) {
      const { result, httpCode, message } = await rentingDetail({id});
      if (httpCode === 200) {
        this.record = result;
      } else {
        this.$message.error(message);
      }
    },
    async delList(form) {
      const { result, httpCode, message} = await rentingDel(form);
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async addList(form) {
      const { result, httpCode, message } =  await rentingAdd({...form, stateId: this.activeKey === 0 ? 'LEASE' : 'SELL' });
      if (httpCode === 200) {
        this.getList();
        this.$message.success(message);
        console.log(result);
      } else {
        this.$message.error(message);
      }
    },
    async getList(self) {
      this.loading = true;
      const { pagination: { current, defaultPageSize }, activeKey } = this;
      const form = Object.assign({}, {
        pageIndex: current,
        pageSize: defaultPageSize,
        stateId: activeKey === 0 ? 'LEASE' : 'SELL'
      }, self)
      const { result, httpCode, message } = await rentingList(form);
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
