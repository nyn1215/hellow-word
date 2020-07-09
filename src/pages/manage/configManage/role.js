import menuList from "@/common/js/menuList";
import { roleList, inquireroleList, roleallList, roleAdd, roleUpdate } from "@api";

export default {
    name: "RoleSet",
    components: {},
    data() {
        return {
            form: this.$form.createForm(this),
            selectedItems: [],
            options: [],
            value: [],
            menuList,
            data: [],
            loading: false,
            showVal: false,
            optionsVal: null,
            radioVal: 1,
            disBtn: false

        };
    },
    watch: {
        radioVal(newVal) {
            if (newVal === 1) {
                this.optionsVal = null;
                this.value = [];
                this.showVal = false;
                this.form.resetFields();
            }
            if (newVal === 2 && !this.optionsVal) {
                this.showVal = true;
                this.form.resetFields();
            }
        },
        optionsVal(newVal) {
            if (newVal) {
                this.showVal = false;
            }
        }
    },
    created() {
        this.getList();
        this.getallList();
    },
    // computed: {
    //   filteredOptions() {
    //     return OPTIONS.filter(o => !this.selectedItems.includes(o));
    //   },
    // },
    methods: {
        roleTap(e) {
            this.optionsVal = e;
            this.getInquire(e);
            console.log(e);
        },
        // 搜索过滤
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input) >=
                0
            );
        },
        // 表单查询
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                console.log(values);
                if (!err) {
                    console.log(err);
                    console.log(values);
                    values.functionIds = this.value.toString();
                    values = this.radioVal === 2 ? { id: this.optionsVal, ...values } : values;
                    this.addList(values);
                }
            });
        },

        onChange(checkedValues) {
            console.log('checked = ', checkedValues);
            console.log('value = ', this.value);
            if (this.radioVal == 2) {
                this.disBtn = this.value.every((v, i) => { return v.length == 0 })
            }
        },

        async addList(form) {
            const { httpCode, message } = this.radioVal === 1 ? await roleAdd(form) : await roleUpdate(form);
            if (httpCode === 200) {
                this.getList();
                if (this.radioVal === 1) {
                    this.form.resetFields();
                    this.value = [];
                }
                this.$message.success(message);
            } else {
                this.$message.error(message);
            }
        },
        async getInquire(id) {
            const { result, httpCode, message } = await inquireroleList({ id });
            console.log(result);
            if (httpCode === 200) {
                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        isPlatformWork: result.type
                            // functionIds: result.list.map(val => val.id)
                    });
                });
                // this.value = result.list.map(val => val.id);
                let idList = result.list.map(val => val.id);
                let allValue = []
                const dataInfo = await roleallList({});
                if (dataInfo.httpCode === 200) {
                    dataInfo.result.forEach((v, i) => {
                        let valList = []
                        v.sonList.forEach((val, ind) => {
                            if (idList.indexOf(val.id) != -1) {
                                valList.push(val.id)
                            }
                        })
                        allValue[i] = valList
                    })
                    this.value = allValue
                } else {
                    this.$message.error(dataInfo.message);
                }
            } else {
                this.$message.error(message);
            }
        },
        async getallList() {
            this.loading = true;
            const { result, httpCode, message } = await roleallList({});
            if (httpCode === 200) {
                this.data = result;
            } else {
                this.$message.error(message);
            }
            this.loading = false;
        },
        async getList() {
            const { result, httpCode, message } = await roleList({});
            if (httpCode === 200) {
                this.options = result;
            } else {
                this.$message.error(message);
            }
        }
    }
};