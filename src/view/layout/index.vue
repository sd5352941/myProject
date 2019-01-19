<template>
  <div>
    <navbar style="min-width: 1200px"></navbar>
    <transition name="fade-transform" mode="out-in">
      <router-view class="top20"></router-view>
    </transition>
    <foobar style="min-width: 1200px"></foobar>
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
