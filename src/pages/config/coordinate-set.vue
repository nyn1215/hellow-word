<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="48">
        <a-col :md="30" :lg="24">
          <a-form layout="vertical" autocomplete="off">
            <a-form-item label="考勤打卡坐标设置" :wrapper-col="{ span: 24 }">
              <a-input style="width: 240px;margin-right:20px;" v-model="lng" placeholder="经度" />
              <a-input style="width: 240px;margin-right:20px;" v-model="lat" placeholder="纬度" />
              <a-input style="width: 240px" v-model="ranges" placeholder="打卡范围" />
              
            </a-form-item>
            <a-form-item label="上班时间设置" :wrapper-col="{ span: 24 }">
              <a-time-picker style="width: 240px" placeholder="请输入上班时间" v-model="beginTimeStr" />
            </a-form-item>
            <a-form-item label="下班时间设置" :wrapper-col="{ span: 24 }">
              <a-time-picker style="width: 240px" placeholder="请输入下班时间" v-model="endTimeStr" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="attendanceTap">保存</a-button>
            </a-form-item>
            <a-form-item
              v-for="(item, index) in patrolList"
              :key="index"
              :wrapper-col="{ span: 28 }"
              :label="index === 0 ? '巡逻打卡坐标设置' : ''"
            >
              <a-input v-model="item.lng" placeholder="经度" style="width: 240px;margin-right:20px;" />
              <a-input v-model="item.lat" placeholder="纬度" style="width: 240px;margin-right:20px;" />
              <a-icon
                v-if="patrolList.length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="patrolList.length === 1"
                @click="() => remove(item, index)"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 24 }">
              <a-button type="dashed" style="width: 400px;" @click="add">
                <a-icon type="plus" />添加
              </a-button>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" @click="patrolTap">保存</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<script src="./coordinate.js"></script>