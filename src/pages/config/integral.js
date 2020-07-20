const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default {
  name: "PaySet",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      selectedItems: [],
    };
  },

  created() {},
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o));
    },
  },
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
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
  }
};