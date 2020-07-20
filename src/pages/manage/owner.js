// import moment from 'moment'
import { ownerList, ownerBatch } from "@/api";
import OwnerAdd from "./owner-add";
const columns = [{
        title: "业主头像",
        dataIndex: "headUrl",
        scopedSlots: { customRender: "avatar" }
    },
    {
        title: "用户名",
        key: "name",
        dataIndex: "name"
    },
    {
        title: "性别",
        key: "sex",
        dataIndex: "sex"
    },
    {
        title: "手机号",
        key: "telephone",
        dataIndex: "telephone"
    },
    {
        title: "住址",
        key: "floorhouse",
        dataIndex: "floorhouse",
        scopedSlots: { customRender: "floorhouse" },
        align: "center"
    },
    {
        title: "停车位",
        key: "carNumbers",
        dataIndex: "carNumbers"
    },
    {
        title: "入住时间",
        key: "createTime",
        dataIndex: "createTime"
    },
    {
        title: "审核",
        key: "action",
        scopedSlots: { customRender: "action" }
    }
];

// const data = [];
// for (let i = 0; i < 50; i += 1) {
//   data.push({
//     a:
//       "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKjA334PyicjUpgLIWHh2HcLIxkKlnZqicKibc3CHRbbJPfVJXw9E7a3bU4e973CQDoHg5rbXMc0IAZw/132",
//     b: "万剑一",
//     c: "男",
//     d: `1821143429${i}`,
//     e: "天津市南开区西湖道龙井里1号楼101室",
//     f: `E-B204${i}`,
//     g: "2019-11-05 19:00"
//   });
// }

const pagination = {
    current: 1,
    defaultPageSize: 5,
    total: 100,
    pageSizeOptions: ["5", "10", "50", "100"],
    showSizeChanger: true,
    showQuickJumper: true
};

export default {
    name: "OwnerList",
    components: {
        OwnerAdd
    },
    data() {
        return {
            form: this.$form.createForm(this),
            columns,
            data: [],
            pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false
        };
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
                    this.pagination.current = 1;
                    this.getList({...values });
                    console.log(err);
                    console.log(values);
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
            this.getList();
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            console.log(selectedRowKeys);
            console.log(selectedRows);
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
        },
        handleMenuClick(e) {
            const { selectedRowKeys } = this;
            this.batcList({
                id: selectedRowKeys.toString(),
                state: e.key === 1 ? 'CHECK_OK' : 'CHECK_NO',
            })
            console.log(e);
        },
        async onSelectBatch(item, num) {
            this.batcList({
                id: item.id,
                state: num === 1 ? 'CHECK_OK' : 'CHECK_NO',
            })
        },
        async batcList(form) {
            const { result, httpCode, message } = await ownerBatch(form);
            if (httpCode === 200) {
                this.getList();
                this.selectedRowKeys = [];
                this.$message.success(message);
            } else {
                this.$message.error(message);
            }
        },
        //
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                ...this.form.getFieldsValue()
            }, self)
            const { result, httpCode, message } = await ownerList(form);
            if (httpCode === 200) {
                this.data = result.list.map((val, idx) => {
                    return {
                        ...val,
                        floorhouse: val.floorName + val.houseNumber
                    }
                })
                this.pagination.total = result.totalSize;
            } else {
                this.$message.error(message);
            }
            this.loading = false;
        }
    }
};