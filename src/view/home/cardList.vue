<template>
  <div class="card-box">
    <el-card class='card' v-for="item in 4" shadow="" :key="item">
      <img src="https://mmbiz.qpic.cn/mmbiz_jpg/7Jo2WybqIWlRyGDPGRFQXA68NN1rGEfRh0lo1D7KUPibPu2sJTvGTHa62QUCEMg6zicV8zkbrrbj80Gic6gOt5Glg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" class="card_img">
    </el-card>
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
    height: 350px;
    width: 500px;
    margin: 12px 0px;
  }
  .card:hover{
    height: 450px;
  }

  .card_img{
    height: 300px;
    width: 100%;
  }
</style>
