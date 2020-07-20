
const columns = [
  {
    title: '录入时间',
    dataIndex: 'name',
    key: 'name',
    // width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '楼门名称',
    dataIndex: 'workId',
    key: 'workId',
    // width: '20%',
    scopedSlots: { customRender: 'workId' }
  },
  {
    title: '小区门编号',
    dataIndex: 'department',
    key: 'department',
    // width: '40%',
    scopedSlots: { customRender: 'department' }
  },
  {
    title: '家门编号',
    dataIndex: 'e',
    key: 'e',
    // width: '40%',
    scopedSlots: { customRender: 'e' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'operation' }
  }
];

const data =  [
  {
    key: '1',
    name: '2017-03-30',
    workId: '001',
    e: '001',
    editable: false,
    department: '1'
  },
  {
    key: '2',
    name: '2017-03-30',
    workId: '002',
    e: '001',
    editable: false,
    department: '2'
  },
  {
    key: '3',
    name: '2017-03-30',
    e: '001',
    workId: '003',
    editable: false,
    department: '3'
  }
]

export default {
  name: "DoorSet",
  components: {},
  data() {
    return {
      columns,
      data,
      memberLoading: false,
      form: this.$form.createForm(this),
    };
  },

  created() {},
  methods: {
    // 表单查询
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(err);
          console.log(values);
        }
      });
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      console.log(key);
      return false;
      // 模拟网络请求、卡顿 800ms
      
    },
    toggle (key) {
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
  }
};