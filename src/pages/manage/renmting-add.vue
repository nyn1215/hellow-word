<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        
        <a-form-item label="小区名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', {rules: [{required: true, message: '请输入小区名称'}]}]"
            placeholder="请输入小区名称"
          />
        </a-form-item>
        <a-form-item label="房源类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
              placeholder="请选择类型"
              v-decorator="[ 'purposeId', {rules: [{ required: true, message: '请选择类型' }]}]"
            >
              <a-select-option :key="1" value="RESIDENCE">普通住宅</a-select-option>
              <a-select-option :key="2" value="VILLA">别墅</a-select-option>
            </a-select>
        </a-form-item>
        <!-- <a-form-item label="出租方式" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
              placeholder="请选择"
              v-decorator="[ 'type', {rules: [{ required: true, message: '请选择' }]}]"
            >
              <a-select-option :key="1" value="WHOLE">整租</a-select-option>
              <a-select-option :key="2" value="RENT">合租</a-select-option>
            </a-select>
        </a-form-item> -->
         <a-form-item label="户型" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['roomNumber', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">室</span>
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['officeNumber', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">厅</span>
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['toiletNumber', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span>卫</span>
        </a-form-item>
        <a-form-item label="建筑面积" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
          style=" width: 200px; text-align: center;margin-right:10px;"
            v-decorator="['measureArea', {rules: [{required: true, message: '请输入建筑面积'}]}]"
            placeholder="请输入建筑面积"
          />
          <span>平方米</span>
        </a-form-item>
        <a-form-item label="售价" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
          style=" width: 200px; text-align: center;margin-right:10px;"
            v-decorator="['totalPrice', {rules: [{required: true, message: '请输入售价'}]}]"
            placeholder="请输入售价"
          />
          <span>万</span>
        </a-form-item>

        
        <!-- <a-form-item label="装修程度" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['renovationTypeId', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="LUXURY">豪华装修</a-select-option>
            <a-select-option :key="2" value="HARDCOVER">精装修</a-select-option>
            <a-select-option :key="3" value="ORDINARY">中等装修</a-select-option>
            <a-select-option :key="4" value="NOTHING">简装修</a-select-option>
            <a-select-option :key="4" value="NOTHING">毛坯</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="朝向" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['orientationId', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :value="item.type" v-for="(item, index) in orientationIdList" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="楼层" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['floorNumber', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">层</span>
          <span style="margin-right:10px;">共</span>
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['floorSum', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">层</span>
        </a-form-item>
         <a-form-item label="楼栋号" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['floorBuilding', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">墥/号/层</span>
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['floorUnit', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span style="margin-right:10px;">单元</span>
          <a-input
            style=" width: 80px; text-align: center;margin-right:10px;"
            v-decorator="['floorRoom', {rules: [{required: true, message: '请输入'}]}]"
            placeholder="请输入"
          />
          <span>室</span>
        </a-form-item>
        <!-- <a-form-item label="租金" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            style=" width: 100px; text-align: center;margin-right:10px;"
            v-decorator="['rentsPrice', {rules: [{required: true, message: '请输入租金'}]}]"
            placeholder="请输入租金"
          />
          <span style="margin-right:10px;">元/月</span>
       
          <a-select
          style=" width: 200px; text-align: center;margin-right:10px;"
            placeholder="请选择付款方式"
            v-decorator="['rentsPriceType', {rules: [{ required: true, message: '请选择付款方式' }]}]"
          >
            <a-select-option :value="item.type" v-for="(item, index) in types.rentsPriceTypeList" :key="index">{{item.name}}</a-select-option>
          </a-select>
         
          
        </a-form-item> -->
        <a-form-item label="是否有电梯" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['hasElevator', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="NOTHING">无电梯</a-select-option>
            <a-select-option :key="2" value="HAVE">有电梯</a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item label="配套设施" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            mode="multiple"
            placeholder="请选择配套设施"
            v-decorator="[ 'facilities', {rules: [{ required: true, message: '请选择配套设施' }]}]"
          >
            <a-select-option
              v-for="(item, index) in types.facilitiesList"
              :key="index"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="房屋年代" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-date-picker
            style="width: 100%;"
            format="YYYY"
            v-decorator="['year', {rules: [{required: true, message: '请选择房屋年代'}]}]"
            placeholder="请选择房屋年代"
          />
        </a-form-item>
         <a-form-item label="入住时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-date-picker
            style="width: 100%;"
            format="YYYY-MM-DD"
            v-decorator="['intoDate', {rules: [{required: true, message: '请选择入住时间'}]}]"
            placeholder="请选择入住时间"
          />
        </a-form-item> -->
        
         <a-form-item label="车位" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['parkingLotId', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="NOTHING">无</a-select-option>
            <a-select-option :key="2" value="HAVE">有</a-select-option>

          </a-select>
        </a-form-item>

        <a-form-item label="权属" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['ownershipId', {rules: [{ required: true, message: '请选择' }]}]"
          >	

            <a-select-option :key="1" value="COMMODITY">商品房</a-select-option>
            <a-select-option :key="2" value="ENTERPRISE">企业产</a-select-option>
            <a-select-option :key="3" value="MISCARRIAGE">小产权</a-select-option>
            <a-select-option :key="4" value="PUBLIC">公产房</a-select-option>

          </a-select>
        </a-form-item>
         <a-form-item label="称谓" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="['appellationType', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-select-option :key="1" value="SIR">先生</a-select-option>
            <a-select-option :key="2" value="MADAM">女士</a-select-option>

          </a-select>
        </a-form-item>
        
        <a-form-item label="姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['ownerName', {rules: [{required: true, message: '请输入姓名'}]}]"
            placeholder="请输入姓名"
          />
        </a-form-item>
         <a-form-item label="联系电话" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['ownerPhone', {rules: [{required: true, message: '请输入联系电话'}]}]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="房屋图片" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <div class="clearfix">
            <a-upload
              name="file"
              :action="UPLOAD_HOST"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 5">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </a-upload>
          </div>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
// import { Editor } from "@/components";

import { UPLOAD_HOST } from "@api/config";
import moment from "moment";
import { queryType } from "@/api";
const orientationIdList = [
  {
    type: 'SOUTH_NORTH',
    name: '南北通透',
  },
  {
    type: 'SOUTH',
    name: '朝南',
  },
  {
    type: 'EAST_SOUTH',
    name: '东南向',
  },
  {
    type: 'EAST',
    name: '朝东',
  },
  {
    type: 'WEST_SOUTH',
    name: '西南向',
  },
  {
    type: 'NORTH',
    name: '朝北',
  },
  {
    type: 'WEST',
    name: '朝西',
  },
  {
    type: 'EAST_WEST',
    name: '东西向',
  },
  {
    type: 'EAST_NORTH',
    name: '东北向',
  },
  {
    type: 'WEST_NORTH',
    name: '西北向',
  },
]
export default {
  data() {
    return {
      UPLOAD_HOST,
      moment,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: null,
      roleList: [],
      record: {},
      id: null,
      orientationIdList,
      fileList: [],
    };
  },
  created() {
    this.typeList();
  },
  methods: {
     handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileName;
        }
        return file;
      });
      console.log(this.fileList);
      this.fileList = fileList;
    },
    add() {
      this.form.resetFields();
      this.title = "发布卖房";
      this.id = null;
      this.fileList = [];
      this.visible = true;
    },
    edit(record) {
      this.title = "修改卖房";
      console.log(record);
      this.visible = true;
      this.$nextTick(() => {
        this.id = record.id;
        this.fileList = record.imageUrls.map((val,index)=>{
          return {
            uid: index,
            name: val.url,
            url: val.url
          }
        })
        this.form.setFieldsValue({
          title: record.title,
          purposeId: record.purposeId,
          // type: record.type,
          roomNumber: record.roomNumber,
          officeNumber: record.officeNumber,
          toiletNumber: record.toiletNumber,
          measureArea: record.measureArea,
          // renovationTypeId: record.renovationTypeId,
          orientationId: record.orientationId,
          floorNumber: record.floorNumber,
          floorSum: record.floorSum,
          floorBuilding: record.floorBuilding,
          floorUnit: record.floorUnit,
          floorRoom: record.floorRoom,
          // rentsPrice: record.rentsPrice,
          // rentsPriceType: record.rentsPriceType,
          hasElevator: record.hasElevator,
          facilities: record.facilitiesList,
          // year: record.year ? moment(record.year, "YYYY") : '',
          // intoDate: record.intoDate ? moment(record.intoDate, "YYYY-MM-DD") : '',
          parkingLotId: record.parkingLotId,
          appellationType: record.appellationType,
          ownerName: record.ownerName,
          ownerPhone: record.ownerPhone,
          totalPrice: record.totalPrice,
          ownershipId: record.ownershipId
          // sex: this.record.sexNmae === "女" ? "WOMAN" : "MAN",
          // telephone: this.record.telephone,
          // address: this.record.address,
          // parkingSpace: this.record.parkingSpace,
          // myIntegral: this.record.myIntegral,
          // createTime: moment(this.record.createTime, "YYYY-MM-DD HH:mm:ss"),
          // alipayAccount: this.record.alipayAccount,
          // weChatAccount: this.record.weChatAccount,
          // houseNumber: this.record.houseNumber,
          // floorName: this.record.floorName,
          // intoDate: this.record.intoDate ? moment(this.record.intoDate, "YYYY-MM-DD") : '',
        });
      });
    },
    handleSubmit() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log("values", values);
          // values.year = moment(values.year).format(
          //   "YYYY"
          // );
          values.images = this.fileList
            .map(val => val.url)
            .toString();
          values.facilities = values.facilities.toString();
          values = this.id ? { id: this.id, ...values } : values;
          // values.intoDate = moment(values.intoDate).format(
          //   "YYYY-MM-DD"
          // );
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
            this.$emit("ok", values);
          }, 1500);
        } else {
          this.confirmLoading = false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },

    async typeList() {
      const { result, httpCode, message } = await queryType({});
      if (httpCode === 200) {
        this.types = result;
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
