import moment from 'moment';
import { activityList, activitytypeList, healactivityListSign, activityAdd, activityDel, activityUpdate, healactivityDetail } from "@/api";
import ActivityAdd from "./activity-add";
import ActivityDetail from "./activity-detail";

const columns = [
    // { 
    //   title: "编号",
    //   dataIndex: "id",
    //   align: "center"
    // },
    {
        title: "活动名称",
        key: "title",
        dataIndex: "title",
        align: "center"
    },
    {
        title: "缩略图",
        key: "imageUrl",
        dataIndex: "imageUrl",
        scopedSlots: { customRender: "avatar" },
        align: "center"
    },
    {
        title: "活动分类",
        key: "type",
        dataIndex: "type",
        align: "center"
    },
    {
        title: "活动时间",
        key: "activityTime",
        dataIndex: "activityTime",
        align: "center"
    },
    {
        title: "状态",
        key: "activityStateName",
        dataIndex: "activityStateName",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        scopedSlots: { customRender: "action" },
        align: "center"
    }
];

const equipmentColumns = [
    // {
    //     title: "编号",
    //     key: "id",
    //     dataIndex: "id",
    //     align: "center",
    // },
    {
        title: "标题",
        key: "title",
        dataIndex: "title",
        align: "center"
    },
    {
        title: "报名时间",
        key: "signTime",
        dataIndex: "signTime",
        align: "center"
    },
    {
        title: "客户名称",
        key: "name",
        dataIndex: "name",
        align: "center"
    },
    {
        title: "性别",
        key: "sexName",
        dataIndex: "sexName",
        align: "center"
    },
    {
        title: "年龄",
        key: "age",
        dataIndex: "age",
        align: "center"
    },
    {
        title: "电话",
        key: "telephone",
        dataIndex: "telephone",
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
    name: "TableList",
    components: {
        ActivityAdd,
        ActivityDetail
    },
    data() {
        return {
            form: this.$form.createForm(this),
            activeKey: 0,
            columns,
            data: [],
            pagination,
            selectedRowKeys: [],
            selectedRows: [],
            equipmentColumns,
            loading: false,
            selectList: [],
            date: [],
            record: {}
        };
    },
    computed: {
        sum(val) {
            console.log(val)
        },
    },
    created() {
        this.typeList();
        this.getList();
    },
    methods: {
        async handleDetail(record) {
            await this.getDetail(record.id);
            this.$refs.createDetail.edit(this.record)
        },
        async getDetail(id) {
            const { result, httpCode, message } = await healactivityDetail({ id });
            console.log(result, 'result')
            if (httpCode === 200) {
                this.record = result;
            } else {
                this.$message.error(message);
            }
        },
        onChangeTime(e) {
            if (e.length === 0) {
                this.getList();
            } else {
                this.date = [moment(e[0]).format("YYYY-MM-DD"), moment(e[1]).format("YYYY-MM-DD")];
                this.getList({
                    begDate: this.date[0],
                    endDate: this.date[1]
                });
            }
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
                ...this.form.getFieldsValue()
            };
            const { result, httpCode, message } = await this.$exportExcel('activity/activityExcel', form);
            if (httpCode === 200) {
                console.log(result);
                window.location.href = result.fileName;
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
                if (!err) {
                    if (values.activityTime) {
                        values.activityTime = moment(values.activityTime).format('YYYY-MM-DD');
                    }
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
        onDelete(id) {
            this.delList({ id });
        },
        examineTap(record, str) {
            this.updateList({
                id: record.id,
                activityState: str
            })
        },
        async updateList(form) {
            const { result, httpCode, message } = await activityUpdate(form);
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async addList(form) {
            const { result, httpCode, message } = await activityAdd(form);
            if (httpCode === 200) {
                this.getList();
                this.typeList();
                this.$refs.createModal.typeList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async delList(form) {
            const { result, httpCode, message } = await activityDel(form);
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async typeList(self) {
            const { result, httpCode, message } = await activitytypeList({});
            if (httpCode === 200) {
                this.selectList = result;
            } else {
                this.$message.error(message);
            }
        },
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = this.activeKey === 0 ? Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                ...this.form.getFieldsValue()
            }, self) : Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
            }, self)
            const { result, httpCode, message } = this.activeKey === 0 ? await activityList(form) : await healactivityListSign(form)
            console.log(result)
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