<template>
  <div class="card-box">
    <el-card class='card' v-for="iten in 4" shadow="hover"></el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>
  .card-box {
    display: flex;
    flex-direction:column;
  }
  .card {
    height: 250px;
    width: 500px;
    margin: 12px 0px;
  }
  .card:hover{
    height: 350px;
  }
</style>
