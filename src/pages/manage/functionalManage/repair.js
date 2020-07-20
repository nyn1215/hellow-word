import moment from 'moment';
import RepairAdd from "./repair-add";
import RepairDetail from "./repair-detail";
import { dynamicList } from "@/api";


const errandsColumns = [{
        title: "下单时间",
        key: "createTime",
        dataIndex: "createTime",
        align: "center"
    },
    {
        title: "业主姓名",
        key: "title",
        dataIndex: "title",
        align: "center"
    },
    {
        title: "联系方式",
        key: "id",
        dataIndex: "id",
        align: "center"
    },
    {
        title: "报修内容",
        key: "contextStr",
        dataIndex: "contextStr",
        align: "center"
    },
    {
        title: "当前状态",
        key: "status",
        dataIndex: "status",
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
    name: "ServeList",
    components: {
        RepairAdd,
        RepairDetail
    },
    data() {
        return {
            errandsColumns,
            data: [],
            pagination,
            loading: false,
        };
    },

    created() {
        this.getList();
    },
    methods: {
        handleOk(e) {
            console.log(e);
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
            this.pagination.current = 1;
        },
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
            }, self)
            const { result, httpCode, message } = await dynamicList(form)
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