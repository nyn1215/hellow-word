import moment from 'moment';
import { dynamicList, activitytypeList, dynamicAdd, dynamicDel, activityUpdate } from "@/api";
import DynamicAdd from "./housing-add";
const columns = [
    // { 
    //   title: "编号",
    //   dataIndex: "id",
    //   align: "center"
    // },
    {
        title: "名称",
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
        title: "发布时间",
        key: "noticeTime",
        dataIndex: "noticeTime",
        align: "center"
    },
    {
        title: "类型",
        key: "newTypeName",
        dataIndex: "newTypeName",
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
    name: "ActivityList",
    components: {
        DynamicAdd
    },
    data() {
        return {
            form: this.$form.createForm(this),
            columns,
            data: [],
            pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            selectList: []
        };
    },
    created() {
        this.typeList();
        this.getList();
    },
    methods: {
        videoChange() {
            console.log(1)
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
            const { result, httpCode, message } = await dynamicAdd(form);
            if (httpCode === 200) {
                this.getList();
                this.$message.success(message);
                console.log(result);
            } else {
                this.$message.error(message);
            }
        },
        async delList(form) {
            const { result, httpCode, message } = await dynamicDel(form);
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
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
                ...this.form.getFieldsValue()
            }, self)
            const { result, httpCode, message } = await dynamicList(form);
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