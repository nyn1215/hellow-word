// import moment from 'moment'
import PersonnelAdd from "./banner-add";
import { personnelList, personnelAdd, personnelUpdate, personnelDel } from "@/api"
const columns = [{
        title: "员工头像",
        dataIndex: "imageAddress",
        scopedSlots: { customRender: "avatar" }
    },
    {
        title: "员工名",
        key: "name",
        dataIndex: "name"
    },
    {
        title: "性别",
        key: "sexName",
        dataIndex: "sexName"
    },
    {
        title: "手机号",
        key: "telephone",
        dataIndex: "telephone"
    },
    {
        title: "住址",
        key: "address",
        dataIndex: "address"
    },
    {
        title: "考勤打卡",
        key: "signInCount",
        dataIndex: "signInCount"
    },
    {
        title: "入职时间",
        key: "entryTime",
        dataIndex: "entryTime"
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
    showSizeChanger: true,
    showQuickJumper: true
};

export default {
    name: "PersonnelList",
    components: {
        PersonnelAdd
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
        handleOk(values) {
            this.addList(values);
            console.log(values);
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
        // 翻页
        handleTableChange(e) {
            this.getList({ pageIndex: e.current, pageSize: e.pageSize })
            this.pagination.current = e.current;
            this.pagination.pageSize = e.pageSize;
            this.pagination.defaultPageSize = e.pageSize;
            console.log(e);
        },
        // 重置数据
        handleReset() {
            this.form.resetFields();
            this.getList();
        },
        onDelete(e) {
            this.delList(e);
            console.log(e);
        },
        async delList(id) {
            const { result, httpCode, message } = await personnelDel({ id });
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async addList(form) {
            const { result, httpCode, message } = form.id ? await personnelUpdate(form) : await personnelAdd(form);
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
            this.$refs.createModal.visible = false;
            this.$refs.createModal.confirmLoading = false;
        },
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                ...this.form.getFieldsValue()
            }, self)
            const { result, httpCode, message } = await personnelList(form);
            if (httpCode === 200) {
                this.data = result.list;
                this.pagination.total = result.totalSize;
            } else {
                this.$message.error(message);
            }
            this.loading = false;
        },
    }
};

// result	Object	
// 请求响应结果对象

//   personnel	String	
// 人员管理

//     id	String	
// 员工编号

//     StaffPhotos	String	
// 员工头像

//     EmployeeName	String	
// 员工名

//     sex	String	
// 性别

//     position	String	
// 职位

//     phone	String	
// 手机号

//     address	String	
// 住址

//     Attendancelock	int	
// 考勤打卡

//     entryTime	String	
// 入职时间

//   totalSize	String	
// 总记录条数

//   pageIndex	String	
// 当前页面

//   totalPage	String	
// 总页数

//   pageSize	String	
// 每页显示条数