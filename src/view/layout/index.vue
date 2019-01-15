<template>
  <div>
    <navbar></navbar>
    <transition name="fade-transform" mode="out-in">
      <router-view class="top20"></router-view>
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

<style lang="scss">

</style>
