<template>
  <div>
    <div class="app-wrapper">
      <sysytem-menu :routers="routes" class="sidebar-container"></sysytem-menu>
      <div class="main-container" style="background-color: #f0f0f0">
        <navbar></navbar>
        <transition name="fade-transform" mode="out-in">
          <router-view class="system-content"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import sysytemMenu from './menu'
  import navbar from './navbar'

  export default {
    name: 'system',
    components: {
      sysytemMenu,
      navbar
    },
    computed: {
      routes() {  //获取后台列表
        return this.$router.options.routes[2].children
      },
    },
    data() {
      return {

      }
    },
    mounted() {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .system-content {
      margin: 30px;
      min-height: 600px;
    }
  }
</style>
