<template>
  <div class="logo">
    <router-link :to="{name:'index'}">
      <img src="@/common/images/logo1.png" style="width:86%" alt="">
      <!-- <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/common/images/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    // LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Ant Design Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
