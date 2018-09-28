<template>
  <div>
    <navbar></navbar>
    <router-view class="top20"></router-view>
  </div>
</template>

<script>
  import navbar from './components/navbar'

  export default {
    data() {
      return{}
    },
    components: {
      navbar,
    }
  }
</script>

<style>

</style>
