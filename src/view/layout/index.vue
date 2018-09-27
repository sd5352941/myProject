<template>
  <div>
    <navbar></navbar>
    <carousel></carousel>
    <router-view></router-view>
  </div>
</template>

<script>
  import navbar from './components/navbar'
  import carousel from './components/carousel.vue'

  export default {
    data() {
      return{}
    },
    components: {
      navbar,
      carousel
    }
  }
</script>

<style>

</style>
