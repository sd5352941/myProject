<template>
  <div class="card-box">
    <el-card class='card' v-for="item in 4" shadow="" :key="item">
      <img
        src="https://mmbiz.qpic.cn/mmbiz_jpg/7Jo2WybqIWlRyGDPGRFQXA68NN1rGEfRh0lo1D7KUPibPu2sJTvGTHa62QUCEMg6zicV8zkbrrbj80Gic6gOt5Glg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"
        class="card_img">
      <el-row class="pad20">
        <el-col :span="12">
          <b>标题名称测试标题名称测</b>
        </el-col>
        <el-col :span="12">
          <div class="primary_text">
            <img src="../../image/pointer/gps_18.png" style="width: 30px;height: 30px;padding-bottom: 7px"/>
            <span style="font-size: 14px;padding-top: 4px">成都市-武侯区</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="pad20 card_content">
        <el-col v-for="item in cardDesc" class="top10">{{item.label}}:{{item.prop}}</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cardDesc:[
          {label:'集合点',prop:'xxxxxxxxxxxxxx'},
          {label:'集合时间',prop:'XXXX'},
          {label:'骑行路线',prop:'XXXXXXXXXX'},
          {label:'描述',prop:'XXXXXXXXXXXX'},
          ]
      }
    },
    methods: {}
  }
</script>

<style>
  .card-box {
    display: flex;
    flex-direction: column;
  }

  .card {
    height: 320px;
    width: 450px;
    margin: 12px 0px;
  }

  .card:hover {
    height: 500px;
  }

  .card_img {
    height: 270px;
    width: 100%;
  }

  b {
    font-size: 18px;
  }

  .primary_text {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
  }

  .card_content {
    color: #898989;
    font-size: 14px;
    margin-top: 20px;
  }
</style>
