<template>
  <div>
    <a-card :bordered="false" :style="{marginBottom: '20px'}" :body-style="{paddingBottom: '0'}">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-row :gutter="48">
             <a-col :md="24" :sm="24" v-show="activeKey === 0">
              <a-form-item label="租房类型">
                <template v-for="(tag, index) in typeList">
                  <a-checkable-tag
                    :key="index"
                    :checked="typeTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 1)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item label="房屋户型">
                <template v-for="(tag, index) in styleList">
                  <a-checkable-tag
                    :key="index"
                    :checked="styleTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 2)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" v-show="activeKey === 0">
              <a-form-item label="租金">
                <template v-for="(tag, index) in rentList">
                  <a-checkable-tag
                    :key="index"
                    :checked="rentTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 3)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
           
            <a-col :md="24" :sm="24" v-show="activeKey === 0">
              <a-form-item label="朝向">
                <template v-for="(tag, index) in orientationIdList">
                  <a-checkable-tag
                    :key="index"
                    :checked="orientationTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 4)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" v-show="activeKey === 1">
              <a-form-item label="总价">
                <template v-for="(tag, index) in priceList">
                  <a-checkable-tag
                    :key="index"
                    :checked="priceTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 5)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" v-show="activeKey === 1">
              <a-form-item label="面积">
                <template v-for="(tag, index) in measureAreaTypeList">
                  <a-checkable-tag
                    :key="index"
                    :checked="measureAreaTypeTags.indexOf(tag.name) > -1"
                    @change="(checked) => handleChange(tag.name, checked, 6)"
                  >
                    {{tag.name}}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </a-col>
            
            <!-- <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" htmlType="submit">搜索</a-button>
                <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
              </span>
            </a-col> -->
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          v-model="activeKey"
          size="large"
          @change="tabsChange"
          :tab-bar-style="{marginBottom: '0', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item" @click="handleAdd">
              <a v-show="activeKey === 0">发布租房</a>
              <a v-show="activeKey === 1">发布卖房</a>
            </div>
          </div>
          <a-tab-pane loading="true" tab="租房列表" :key="0">
            <a-row :style="{padding: '20px'}">

              <a-list :loading="loading" itemLayout="vertical" size="large" :pagination="pagination" :dataSource="data">
                <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
                <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                  <template slot="actions">
                    <template>
                      <!-- <a @click="$refs.createModal.edit(record)">修改</a>
                      <a-divider type="vertical" />
                      <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(record.id)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm> -->
                    </template>
                    <!-- <span :key="type">
                      <a-icon :type="type" style="margin-right: 8px" />
                      {{text}}
                    </span> -->
                  </template>
                  
                  <a-list-item-meta>
                    <a slot="title" :href="item.href">{{item.title}}</a>
                    <a-avatar slot="avatar" :src="item.imageUrl" />
                    <!-- <a-avatar slot="avatar" src="http://47.104.90.16:8088//upLoadFiles/TRUSTEESHIP/2019-11-29/513bebba-2b1e-4e55-930d-7f4442c28097.jpg" /> -->
                    <span slot="description" style="margin-right: 10px;">{{item.typeName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.apartmentName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.measureArea}}㎡</span>
                    <span slot="description" style="margin-right: 10px;">{{item.orientationName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.renovationTypeName}}</span>
                    
                    <div slot="description" style="margin-top: 6px;">地址：{{item.address}}</div>
                    <div slot="description" style="margin-top: 6px;">联系人：{{item.ownerName}}</div>
                    <div slot="description" style="margin-top: 6px;">联系电话：{{item.ownerPhone}}</div>
                    <div slot="description" class="description" style=""><span>{{item.rentsPrice}}</span><i>元/月</i></div>
                    <div slot="description" class="" style="text-align:right;padding-right:20px;margin-top: 6px;">
                      <a @click="handleEdit(item)" style="padding-right: 10px;">修改</a>
                      <!-- <a-divider type="vertical" /> -->
                      <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(item.id)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm>
                    </div>
                      <!-- <a slot="title" :href="item.href">{{item.title}}</a>
                       <a slot="title" :href="item.href">{{item.title}}</a> -->
                  </a-list-item-meta>
                  
                  {{item.content}}
                  <!-- <img
                    slot=""
                    width="272"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  /> -->
                </a-list-item>
              </a-list>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="卖房列表" :key="1">
            <a-row :style="{padding: '20px'}">
              <a-list :loading="loading" itemLayout="vertical" size="large" :pagination="pagination" :dataSource="data">
                <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                  <a-list-item-meta>
                    <a slot="title" :href="item.href">{{item.title}}</a>
                     <a-avatar slot="avatar" :src="item.imageUrl" />
                    <!-- <a-avatar slot="avatar" src="http://47.104.90.16:8088//upLoadFiles/TRUSTEESHIP/2019-11-29/513bebba-2b1e-4e55-930d-7f4442c28097.jpg" /> -->
                    <span slot="description" style="margin-right: 10px;">{{item.typeName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.apartmentName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.measureArea}}㎡</span>
                    <span slot="description" style="margin-right: 10px;">{{item.orientationName}}</span>
                    <span slot="description" style="margin-right: 10px;">{{item.renovationTypeName}}</span>
                    <!-- <span slot="description" style="margin-right: 10px;">{{item.year}}年建</span> -->
                    
                    
                    <div slot="description" style="margin-top: 6px;">地址：{{item.address}}</div>
                    <div slot="description" style="margin-top: 6px;">联系人：{{item.ownerName}}</div>
                    <div slot="description" style="margin-top: 6px;">联系电话：{{item.ownerPhone}}</div>
                    <div slot="description" class="description" style=""><span>{{item.totalPrice}}</span><i style="color:red;">万</i><br>
                    <i style="color: rgba(0, 0, 0, 0.45);">{{item.unitPrice}}元/㎡</i>
                    </div>
                    <div slot="description" class="" style="text-align:right;padding-right:20px;margin-top: 6px;">
                      <a @click="handleEdit(item)" style="padding-right: 10px;">修改</a>
                      <a-popconfirm :title="'确定删除吗?'" @confirm="() => onDelete(item.id)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm>
                    </div>
                  </a-list-item-meta>
                  {{item.content}}
                </a-list-item>
              </a-list>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <renting-add ref="createModal" @ok="handleOk" />
    <renmting-add ref="crmeateModal" @ok="handleOk" />
  </div>
</template>

<script src="./renting.js"></script>
<style lang="less" scoped>
  /deep/ .ant-avatar{
    width: 230px;
    height: auto;
    border-radius: 0;
  }
  .description{
    text-align: right;
    
    padding-right: 20px;
    margin-top: -38px ;
    span{
      font-size: 30px;
      color: red;
      padding-right: 4px;
    }
    i{
      font-style: normal;
      color: #333;
      
    }
  }
  .extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}
</style>
