// let id = 0;
import moment from "moment";
import { coordinateGet, coordinateSet, patrolSet } from "@api";
import { mapGetters } from "vuex";
export default {
  name: "CoordinateSet",
  components: {},
  data() {
    return {
      // form: this.$form.createForm(this),
      selectedItems: [],
      configs: {},
      patrolList: [],
      lng: "",
      lat: "",
      beginTimeStr: "",
      endTimeStr: "",
      ranges: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.getConfig();
  },

  beforeCreate() {},
  methods: {
    //考勤打卡 保存
    attendanceTap() {
      this.setConfig();
    },
    //巡逻打卡 保存
    patrolTap() {
      this.setPatrol();
    },
    async getConfig() {
      const { result, httpCode, message } = await coordinateGet({});
      if (httpCode === 200) {
        this.configs = result;
        this.patrolList = this.configs.patrolList ? this.configs.patrolList : [];
        this.lng = this.configs.attendance.lng;
        this.lat = this.configs.attendance.lat;
        this.ranges = this.configs.attendance.ranges;
        this.beginTimeStr = moment(this.configs.attendance.beginTime,'HH:mm:ss');
        this.endTimeStr = moment(this.configs.attendance.endTime,'HH:mm:ss');
     
      } else {
        this.$message.error(message);
      }
    },
    async setConfig() {
      console.log()
      
      const form = {
        lng: this.lng,
        lat: this.lat,
        ranges: this.ranges,
        beginTimeStr: moment(this.beginTimeStr).format('HH:mm:ss'),
        endTimeStr: moment(this.endTimeStr).format('HH:mm:ss'),
      };
      const { result, httpCode, message } = await coordinateSet(form);
      if (httpCode === 200) {
        console.log(result);
        this.getConfig();
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    async setPatrol() {
      const form = {
        coordinateList: this.patrolList
      };
      const { result, httpCode, message } = await patrolSet(form);
      if (httpCode === 200) {
        console.log(result);
        this.getConfig();
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    remove(k, index) {
      const newData = this.patrolList.filter((item, idx) => {
        return index !== idx;
      });
      this.patrolList = newData;
    },
    add() {
      this.patrolList.push({
        lng: "",
        lat: "",
        communityId: this.userInfo.propertyId
      });
    },
  }
};
