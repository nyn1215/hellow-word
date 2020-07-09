import moment from 'moment';
import { dynamicList } from "@/api";
const columns = [{
        title: "反馈时间",
        key: "createTime",
        dataIndex: "createTime",
        align: "center"
    },
    {
        title: "意见标题",
        key: "title",
        dataIndex: "title",
        align: "center"
    },
    {
        title: "意见内容",
        key: "newTypeName",
        dataIndex: "newTypeName",
        align: "center"
    },
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
    components: {},
    data() {
        return {
            columns,
            data: [],
            pagination,
            loading: false,
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
        async getList(self) {
            this.loading = true;
            const { pagination: { current, defaultPageSize } } = this;
            const form = Object.assign({}, {
                pageIndex: current,
                pageSize: defaultPageSize,
            }, self)
            const { result, httpCode, message } = await dynamicList(form);
            if (httpCode === 200) {
                // result.list.map((v, i) => {
                //     return v.createTime = moment(v.createTime).format('YYYY-MM-DD HH:mm:ss')
                // })
                this.data = result.list;
                this.pagination.total = result.totalSize;
            } else {
                this.$message.error(message);
            }
            this.loading = false;
        }
    }
};