<template>
  <div>
    <navbar></navbar>
    <transition name="fade-transform" mode="out-in">
      <router-view class="top20"></router-view>
    </transition>
  </div>
</template>

<script>
  import navbar from './components/navbar'

  export default {
    data() {
      return {}
    },
    components: {
      navbar,
    }
  }
</script>

<style lang="scss">

</style>
