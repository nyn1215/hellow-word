// import moment from 'moment'
import { proprietorList, proprietorAdd, proprietorDel, proprietorExcel } from "@api";
import { EXCEL_HOST } from "@api/config"
import ProprietorAdd from "./proprietor-add";
import { mapGetters } from "vuex";
const columns = [{
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
        ProprietorAdd
    },
    data() {
        return {
            EXCEL_HOST,
            form: this.$form.createForm(this),
            activeKey: 0,
            columns,
            data: [],
            pagination,
            loading: false,
            headers: {
                Authorization: ''
            }
        };
    },
    computed: {
        ...mapGetters(["token"]),
    },

    created() {
        console.log(this.$api)
        console.log(this.$api.request())
        this.headers.Authorization = this.token;
        this.getList();
    },
    methods: {
        handleChangeFile(info) {
            console.log(info.file.name, 'info')

            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
        async downloadTap() {
            let type = this.activeKey == 0 ? 'OWNER' : 'TENANT'
            const { result, httpCode, message } = await proprietorExcel({ type });
            if (httpCode === 200) {
                window.open(result.exce);
                this.$message.success(message);
            } else {
                this.$message.error(message);
            }
        },
        handleOk(values) {
            this.addList(values);
        },
        // 表单查询
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                console.log(values)
                if (!err) {
                    this.pagination.current = 1;
                    this.getList(values);
                }
            });
        },
        // 翻页
        handleTableChange(e) {
            console.log(e);
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
        tabsChange(e) {
            this.pagination.current = 1;
            this.getList();
        },
        onDelete(e) {
            this.delList(e);
            console.log(e);
        },
        async delList(id) {
            const { result, httpCode, message } = await proprietorDel({ id });
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async addList(form) {
            const { result, httpCode, message } = await proprietorAdd(form);
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async getList(self) {
            console.log(this.form.getFieldsValue())
            this.loading = true;
            const { pagination: { current, defaultPageSize }, activeKey } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                type: activeKey === 0 ? 'OWNER' : 'TENANT',
                ...this.form.getFieldsValue()
            }, self)
            const { result, httpCode, message } = await proprietorList(form);
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