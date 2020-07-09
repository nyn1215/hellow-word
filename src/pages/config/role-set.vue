<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row>
         <a-col>
            <a-form layout="vertical" :form="form" @submit="handleSubmit" autocomplete="off">
               
               <a-form-item label="权限选择" :wrapper-col="{ span: 8 }">
                  <a-input-group compact>
                     <a-select style="width: 30%" v-model="radioVal">
                        <a-select-option :value="1">添加角色</a-select-option>
                        <a-select-option :value="2">修改角色权限</a-select-option>
                     </a-select>
                     <a-input
                        style="width: 70%"
                        v-if="radioVal === 1"
                        v-decorator="['name',{ rules: [{ required: true, message: '请输入角色名' }] }]"
                        placeholder="请输入角色名"
                     />
                     <a-select
                        v-if="radioVal === 2"
                        showSearch
                        placeholder="请选择角色名称"
                        style="width: 70%"
                        :filterOption="filterOption"
                        @change="roleTap"
                     >
                        <a-select-option
                        v-for="(item, index) in options"
                        :key="index"
                        :value="item.id"
                        >{{item.name}}</a-select-option>
                     </a-select>
                  </a-input-group>
               </a-form-item>
               <a-form-item label="是否平台工作者" :wrapper-col="{ span: 8 }">
                  <a-radio-group name="radioGroup" v-decorator="['isPlatformWork',{ rules: [{ required: true, message: '请选择' }] }]">
                     <a-radio value="YES">是平台工作者</a-radio>
                     <a-radio value="NO">其他</a-radio>
                  </a-radio-group>
               </a-form-item>
            <a-form-item label="权限选择">
               <a-list style="padding-top:10px;" :loading="loading" :grid="{ gutter: 24, column: 4 }"  v-decorator="['functionIds',{ rules: [{ required: true, message: '请选择权限' }] }]" :dataSource="data">
                  <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                     <a-card :title="item.name" style="min-height:280px" >
                        <a-checkbox-group :disabled="showVal" @change="onChange(index)" v-model="value[index]">
                           <a-row>
                              <a-col :span="12" style="margin-bottom:10px;" v-for="(val, idx) in item.sonList" :key="idx">
                                 <a-checkbox :value="val.id">{{val.name}}</a-checkbox>
                              </a-col>
                           </a-row>
                        </a-checkbox-group>
                     </a-card>
                  </a-list-item>
               </a-list>

            </a-form-item>

               <a-form-item>
                  <a-button type="primary"  :disabled='disBtn' html-type="submit">{{radioVal===1? '保存': '更新'}}</a-button>
               </a-form-item>
            </a-form>
         </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<script src="./role.js"></script>