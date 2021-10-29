<template>
  <div class="home-box">
    <div class="affix">
      <navbar></navbar>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view class="mt103"></router-view>
    </transition>
    <foobar></foobar>
  </div>
</template>

<script>
  import navbar from './components/navbar'
  import foobar from './components/foobar'

  export default {
    data() {
      return {}
    },
    components: {
      navbar,
      foobar
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .home-box {
    width: 100%;
    min-width: 1200px;
  }
  .affix {
    //position: -webkit-sticky;
    //position: -moz-sticky;
    //position: -ms-sticky;
    //position: sticky;
    //top: 0px;
  }
</style>
