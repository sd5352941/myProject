<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
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
