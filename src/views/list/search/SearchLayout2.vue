<template>
  <div class="search-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SearchLayout',
  data () {
    return {
      tabs: {
        items: [
          {
            key: '1',
            title: '角色配置'
          },
          {
            key: '2',
            title: '坐标配置'
          },
          // {
          //   key: '3',
          //   title: '门锁配置'
          // },
          // {
          //   key: '4',
          //   title: '社区切换'
          // }
        ],
        active: () => {
          switch (this.$route.path) {
            case '/config/search/role-set':
              return '1'
            case '/config/search/coordinate-set':
              return '2'
            case '/config/search/door-set':
              return '3'
            case '/config/search/community-set':
              return '4'
            default:
              return '1'
          }
        },
        callback: (key) => {
          switch (key) {
            case '1':
              this.$router.push('/config/search/role-set')
              break
            case '2':
              this.$router.push('/config/search/coordinate-set')
              break
            case '3':
              this.$router.push('/config/search/door-set')
              break
            case '4':
              this.$router.push('/config/search/community-set')
              break
            default:
              this.$router.push('/workplace')
          }
        }
      },
      search: true
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
      margin-bottom: 16px;
    }
  }
  .search-content{
    // margin-top: 48px;
  }
</style>
