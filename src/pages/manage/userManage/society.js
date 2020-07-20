import moment from "moment";
import { societyList } from "@api";
import { renovationColumns, parkingColumns, cleanColumns, fundColumns, tabList } from "@/pages/base/propertyList";
import societyAdd from './society-add'
import { PEXCEL_HOST } from "@api/config"
import { mapGetters } from "vuex";
export const propertyColumns = [{
        title: "缴费时间",
        key: "payDate",
        dataIndex: "payDate",
        align: "center"
    },
    {
        title: "门牌号",
        key: "houseNumber",
        dataIndex: "houseNumber",
        align: "center"
    },
    {
        title: "业主姓名",
        key: "name",
        dataIndex: "name",
        align: "center"
    },
    {
        title: "电话",
        key: "phone",
        dataIndex: "phone",
        align: "center"
    },
    {
        title: "建筑平米",
        key: "builtupArea",
        dataIndex: "builtupArea",
        align: "center"
    },
    {
        title: "付款状态",
        key: "stateName",
        dataIndex: "stateName",
        align: "center"
    },
    {
        title: "月数",
        key: "monthlyNumber",
        dataIndex: "monthlyNumber",
        align: "center"
    },
    {
        title: "金额(元)",
        key: "payAmount",
        dataIndex: "payAmount",
        align: "center"
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
    name: "SocietyList",
    components: {
        societyAdd
    },
    data() {
        return {
            PEXCEL_HOST,
            form: this.$form.createForm(this),
            activeKey: 7,
            propertyColumns,
            renovationColumns,
            parkingColumns,
            cleanColumns,
            fundColumns,
            data: [],
            pagination,
            loading: false,
            tabList,
            headers: {
                Authorization: ''
            },
            downExcel: '',
            date: []
        };
    },

    computed: {
        ...mapGetters(["token"]),
        columns() {
            switch (this.activeKey) {
                case 7:
                    return this.propertyColumns;
                case 9:
                    return this.renovationColumns;
                case 8:
                    return this.parkingColumns;
                case 10:
                    return this.cleanColumns;
                case 11:
                    return this.fundColumns;
                default:
                    return [];
            }
        },
    },
    created() {
        this.headers.Authorization = this.token;
        this.getList();
    },
    methods: {
        handleOk(values) {
            this.addList(values);
            console.log(values);
        },
        exportTable() {
            this.exportStatistics();
        },
        async exportStatistics() {
            const {
                pagination: { current, defaultPageSize }
            } = this;
            const form = {
                pageIndex: current,
                pageSize: defaultPageSize,
                payTypeId: this.activeKey,
                begTime: this.date[0] ? moment(this.date[0]).format("YYYY-MM-DD") : '',
                endTime: this.date[1] ? moment(this.date[1]).format("YYYY-MM-DD") : '',
                ...this.form.getFieldsValue()
            };
            const { result, httpCode, message } = await this.$exportExcel('paymentManagement/outExcel', form);
            if (httpCode === 200) {
                console.log(result);
                window.location.href = result.outPath;
            } else {
                this.$message.error(message);
            }
        },
        handleChangeFile(info, a) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            // console.log(info)
            // console.log(a)
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name}`);
                this.getList();
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name}`);
            }
        },
        downloadTap() {
            window.open(this.downExcel, '_blank');
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
        changeTime(e) {
            if (e.length === 0) {
                this.getList();
            } else {
                this.date = [moment(e[0], "YYYY-MM-DD"), moment(e[1], "YYYY-MM-DD")];
                this.getList({
                    begTime: moment(e[0]).format('YYYY-MM-DD'),
                    endTime: moment(e[1]).format('YYYY-MM-DD'),
                });
            }
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
            this.date = [];
            this.getList();
        },
        tabsChange(e) {
            this.getList();
        },
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                payTypeId: this.activeKey,
                ...this.form.getFieldsValue(),
            }, self)

            const wform = this.date.length > 0 ? {
                ...form,
                begTime: moment(this.date[0]).format('YYYY-MM-DD'),
                endTime: moment(this.date[1]).format('YYYY-MM-DD'),
            } : form;
            const { result, httpCode, message } = await societyList(wform);
            if (httpCode === 200) {
                this.data = result.list;
                this.pagination.total = result.totalSize;
                this.downExcel = result.downExcel;
            } else {
                this.$message.error(message);
            }
            this.loading = false;
        }
    }
};