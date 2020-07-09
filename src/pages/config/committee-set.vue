<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="16">
        <a-col :md="24" :lg="24">
          <a-form layout="vertical" :form="form" @submit="handleSubmit" autocomplete="off">
            <a-form-item label="业主委员会" :wrapper-col="{ span: 16 }">
               <!-- style="height:400px;" -->
              <editor ref="serviceContext" class="editor" :value="serviceContext"></editor>
              <!-- <quill-editor
                style="height:280px;"
                v-model="content"
                ref="purchaseInstructions"
                :options="{placeholder: '请输入正文'}"
              ></quill-editor> -->
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="submit">提交</a-button>
            </a-form-item>
            <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<script src="./committee.js"></script>