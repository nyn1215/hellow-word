<template>
  <a-card :bordered="false">
    <a-table  
      :loading="loading"  
      :columns="columns"  
      :pagination="pagination"  
      rowKey="id"  
      :dataSource="data"  
      @change="handleTableChange"  
    >
      
    </a-table>
  </a-card>
</template>

<script src="./call.js"></script>
