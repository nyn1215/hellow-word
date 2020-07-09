<template>
  <div>
    <!-- <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="手机号">
                <a-input
                  v-decorator="[
                    'telephone',
                    {rules: [{ required: false, message: '请输入手机号' }]}
                  ]"
                  placeholder="输入手机号查找"
                />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" htmlType="submit">搜索</a-button>
                <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>-->
    <a-card :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{ marginBottom: '0', paddingLeft: '16px' }"
        >
          <a-tab-pane loading="true" tab="社区申请" :key="0">
            <a-row :style="{ padding: '20px' }">
              <a-form :form="form">
                <a-form-item
                  label="优惠券标题"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <a-input
                    placeholder="请输入优惠券标题"
                    v-decorator="[
                      'desc2',
                      {
                        rules: [{ required: true, message: '请输入优惠券标题' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="优惠券类型"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 18 }"
                >
                  <a-select
                    style="width: 134px;margin-right:20px;"
                    placeholder="请选择"
                    v-model="numtype"
                  >
                    <a-select-option :key="0" :value="0"
                      >请选择</a-select-option
                    >
                    <a-select-option :key="1" :value="1">5折</a-select-option>
                    <a-select-option :key="2" :value="2">8折</a-select-option>
                  </a-select>
                  <!-- {{numtype}} -->

                  <span v-show="numtype > 0">满</span>
                  <a-input
                    v-show="numtype > 0"
                    style="width: 80px;margin-left:20px;margin-right:10px;"
                    placeholder="请输入"
                    v-decorator="[
                      'desc2',
                      { rules: [{ required: true, message: '请输入' }] }
                    ]"
                  />
                  <span v-show="numtype > 0">减</span>
                  <a-input
                    v-show="numtype > 0"
                    style="width: 80px;margin-left:20px;margin-right:10px;"
                    placeholder="请输入"
                    v-decorator="[
                      'desc2',
                      { rules: [{ required: true, message: '请输入' }] }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="优惠券数量"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <a-input
                    placeholder="请输入优惠券数量"
                    v-decorator="[
                      'desc22',
                      {
                        rules: [{ required: true, message: '请输入优惠券数量' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="优惠券价格"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <a-input
                    placeholder="请输入优惠券价格"
                    v-decorator="[
                      'desc20',
                      {
                        rules: [{ required: true, message: '请输入优惠券价格' }]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="时间显示"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :style="radioStyle" :value="1">
                      <span>固定失效时间</span>
                      <a-date-picker
                        style="width: 200px; margin-right:20px;margin-left:10px;"
                        format="YYYY-MM-DD HH:mm:ss"
                        v-decorator="[
                          'desc6',
                          {
                            rules: [
                              { required: false, message: '请输入固定失效时间' }
                            ]
                          }
                        ]"
                        placeholder="请输入固定失效时间"
                      />
                    </a-radio>
                    <a-radio :style="radioStyle" :value="2">
                      <span>获取后的</span>
                      <a-input
                        style="width: 60px;margin-left:20px;margin-right:10px;"
                        placeholder="天"
                        v-decorator="[
                          'desc2',
                          { rules: [{ required: false, message: '天' }] }
                        ]"
                      />
                      <span>内</span>
                    </a-radio>
                    <!-- <a-radio :style="radioStyle" :value="3">Option C</a-radio>
            <a-radio :style="radioStyle" :value="4">
              More...
              <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
            </a-radio> -->
                  </a-radio-group>

                  <!-- <a-input
            style="width: 160px; margin-right:20px;"
            placeholder="请输入固定失效时间"
            v-decorator="['desc20', {rules: [{required: true, message: '请输入固定失效时间'}]}]"
          />-->
                </a-form-item>
                <a-form-item
                  label="幼儿园限制"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <a-select
                    showSearch
                    placeholder="请选择幼儿园"
                    style="width: 100%"
                    :filterOption="filterOption"
                  >
                    <a-select-option :key="1" :value="1"
                      >南山幼儿园</a-select-option
                    >
                    <a-select-option :key="2" :value="2"
                      >宝安幼儿园</a-select-option
                    >
                    <a-select-option :key="3" :value="3"
                      >福田幼儿园</a-select-option
                    >
                  </a-select>

                  <!-- <template v-for="(tag, index) in tags"> -->
                  <!-- <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag
                :key="tag"
                :closable="index !== 0"
                :afterClose="() => handleClose(tag)"
              >{{`${tag.slice(0, 20)}...`}}</a-tag>
            </a-tooltip> -->
                  <!-- <a-tag
              :key="index"
              color="blue"
              :afterClose="() => handleClose(tag)"
            >{{tag}}</a-tag>
          </template> -->
                  <!-- <a-input 
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
            <a-icon type="plus" />添加幼儿园
          </a-tag> -->
                </a-form-item>
                <a-form-item
                  label="商品类型限制"
                  :label-col="{ span: 2 }"
                  :wrapper-col="{ span: 16 }"
                >
                  <!-- <a-radio-group
            v-decorator="[
              'classType',
              { rules: [{ required: true, message: '请选择' }] }
            ]"
            :defaultValue="1"
          >
            <a-radio :value="1">课程</a-radio>
            <a-radio :value="2">活动</a-radio>
          </a-radio-group> -->

                  <a-checkbox-group>
                    <a-checkbox value="1">课程1</a-checkbox>
                    <a-checkbox value="2">课程2</a-checkbox>
                    <a-checkbox value="3">课程3</a-checkbox>
                    <a-checkbox value="4">课程4</a-checkbox>
                    <!-- <a-col :span="8"></a-col>
                <a-col :span="8"><a-checkbox value="B">活动1</a-checkbox></a-col>
                <a-col :span="8"><a-checkbox value="C">课程2</a-checkbox></a-col>
                <a-col :span="8"><a-checkbox value="D">课程3</a-checkbox></a-col> -->
                    <!-- <a-col :span="8"><a-checkbox value="E">E</a-checkbox></a-col> -->
                    <!-- </a-row> -->
                  </a-checkbox-group>
                </a-form-item>
                <!-- <a-form-item label="毕业学校" :wrapper-col="{ span: 24 }">
          <a-input disabled style="width:120px;margin-right:20px;" value="华中科技" />
          <a-input disabled style="width:160px;margin-right:20px;" value="2019.12-2019.13" />
          <a-input disabled style="width:100px;margin-right:20px;" value="本科" />
          <a-input disabled style="width:140px;" value="计算机信息技术" />
        </a-form-item>
        <a-form-item label="教龄" :wrapper-col="{ span: 24 }">
          <a-input disabled style="width:110px;margin-right:20px;" value="100年" />
        </a-form-item>
        <a-form-item label="教学经历" :wrapper-col="{ span: 24 }">
          <a-input disabled style="width:400px;margin-right:20px;" value="武汉大学武汉大学武汉大学" />
          <a-input disabled style="width:160px;" value="2019.12-2019.13" />
          <a-textarea
            disabled
            style="margin-top:20px;"
            value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
            rows="4"
          />
        </a-form-item>

        <a-form-item label="成功案列" :wrapper-col="{ span: 24 }">
          <a-input disabled style="width:400px;margin-right:20px;" value="清华大学清华大学清华大学清华大学" />
          <a-input disabled style="width:160px;" value="2019.12-2019.13" />
          <a-textarea
            disabled
            style="margin-top:20px;"
            value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
            rows="4"
          />
        </a-form-item>

        <a-form-item label="教学特点" :wrapper-col="{ span: 24 }">
          <a-textarea
            disabled
            style="margin-top:20px;"
            value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
            rows="4"
          />
        </a-form-item>

        <a-form-item label="标签" :wrapper-col="{ span: 24 }">
          <a-tag color="#2db7f5" v-for="tag in 8" :key="tag">帅气</a-tag>
        </a-form-item> -->
              </a-form>
              <!-- <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  label="标题"
                  :labelCol="{ lg: { span: 1 }, sm: { span: 2 } }"
                  :wrapperCol="{ lg: { span: 6 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="[
                      'name',
                      { rules: [{ required: true, message: '请输入标题' }] }
                    ]"
                    name="name"
                    placeholder="给目标起个名字"
                  />
                  <a-input
                    v-decorator="[
                      'name',
                      { rules: [{ required: true, message: '请输入标题' }] }
                    ]"
                    name="name"
                    placeholder="给目标起个名字"
                  />
                </a-form-item>
                <a-form-item
                  label="起止日期"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-range-picker
                    name="buildTime"
                    style="width: 100%"
                    v-decorator="[
                      'buildTime',
                      { rules: [{ required: true, message: '请选择起止日期' }] }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="目标描述"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-textarea
                    rows="4"
                    placeholder="请输入你阶段性工作目标"
                    v-decorator="[
                      'description',
                      { rules: [{ required: true, message: '请输入目标描述' }] }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="衡量标准"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-textarea
                    rows="4"
                    placeholder="请输入衡量标准"
                    v-decorator="[
                      'type',
                      { rules: [{ required: true, message: '请输入衡量标准' }] }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="客户"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
                    v-decorator="[
                      'customer',
                      {
                        rules: [
                          { required: true, message: '请描述你服务的客户' }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="邀评人"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  :required="false"
                >
                  <a-input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
                </a-form-item>
                <a-form-item
                  label="权重"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  :required="false"
                >
                  <a-input-number :min="0" :max="100" />
                  <span>%</span>
                </a-form-item>
                <a-form-item
                  label="目标公开"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  :required="false"
                  help="客户、邀评人默认被分享"
                >
                  <a-radio-group v-model="value">
                    <a-radio :value="1">公开</a-radio>
                    <a-radio :value="2">部分公开</a-radio>
                    <a-radio :value="3">不公开</a-radio>
                  </a-radio-group>
                  <a-form-item>
                    <a-select mode="multiple" v-if="value === 2">
                      <a-select-option value="4">同事一</a-select-option>
                      <a-select-option value="5">同事二</a-select-option>
                      <a-select-option value="6">同事三</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-form-item>
                <a-form-item
                  :wrapperCol="{ span: 24 }"
                  style="text-align: center"
                >
                  <a-button htmlType="submit" type="primary">提交</a-button>
                  <a-button style="margin-left: 8px">保存</a-button>
                </a-form-item>
              </a-form> -->
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="状态列表" :key="1">
            <a-row :style="{ padding: '20px' }">
              <a-table
                :loading="loading"
                :columns="columns"
                :pagination="pagination"
                rowKey="id"
                :dataSource="data"
                @change="handleTableChange"
              >
                <span slot="avatar" slot-scope="record">
                  <img
                    :src="record"
                    :style="{
                      width: '38px',
                      height: '38px',
                      borderRadius: '100px'
                    }"
                    alt
                  />
                </span>
                <span slot="action" slot-scope="record">
                  <template>
                    <a @click="handleEdit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      :title="'确定删除吗?'"
                      @confirm="() => onDelete(record.key)"
                    >
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                  </template>
                </span>
              </a-table>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script src="./apply.js"></script>
