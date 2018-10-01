<template>
  <div class="card-box">
    <el-card class='card' v-for="item in 4" shadow="" :key="item">
      <img src="https://mmbiz.qpic.cn/mmbiz_jpg/7Jo2WybqIWlRyGDPGRFQXA68NN1rGEfRh0lo1D7KUPibPu2sJTvGTHa62QUCEMg6zicV8zkbrrbj80Gic6gOt5Glg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" class="card_img">
      <div>
        <b>二环路-环球中心</b>
      </div>
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
    height: 320px;
    width: 450px;
    margin: 12px 0px;
  }
  .card:hover{
    height: 650px;
  }

  .card_img{
    height: 270px;
    width: 100%;
  }
  b {
    font-size: 14px;
  }
</style>
