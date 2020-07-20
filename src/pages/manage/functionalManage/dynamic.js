import moment from 'moment';
import { dynamicList, dynamicAdd, dynamicDel } from "@/api";
import DynamicAdd from "./dynamic-add";
const columns = [
    // { 
    //   title: "编号",
    //   dataIndex: "id",
    //   align: "center"
    // },
    {
        title: "上传时间",
        key: "createTime",
        dataIndex: "createTime",
        align: "center"
    },
    {
        title: "图片",
        key: "imageUrl",
        dataIndex: "imageUrl",
        scopedSlots: { customRender: "avatar" },
        align: "center"
    },
    {
        title: "排序",
        key: "noticeTime",
        dataIndex: "noticeTime",
        align: "center"
    },
    {
        title: "状态",
        key: "newTypeName",
        dataIndex: "newTypeName",
        align: "center"
    },
    {
        title: "链接",
        key: "newsType",
        dataIndex: "newsType",
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
        this.getList();
    },
    methods: {
        handleOk(values) {
            this.addList(values);
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
            this.getList();
        },
        onDelete(id) {
            this.delList({ id });
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
            } else {
                this.$message.error(message);
            }
        },
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize
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