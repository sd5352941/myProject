<template>
  <div class="home-box">
    <Affix>
      <navbar></navbar>
    </Affix>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
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

</style>
