<template>
  <div class="card-box">
    <el-card class='card' v-for="item in 4" shadow="" :key="item">
      <img src="" class="card_img">
      <el-row class="pad20">
        <el-col :span="12">
          <b>到什么地方去</b>
        </el-col>
        <el-col :span="12">
          <div class="primary_text">
            <img src="../../image/pointer/gps_18.png" style="width: 30px;height: 30px;padding-bottom: 7px"/>
            <span style="font-size: 14px;padding-top: 4px">成都市-武侯区</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="pad20 card_content">
        <CellGroup>
          <Cell v-for="item in cardDesc" class="top10" :title="item.label" :extra="item.prop" :key="item.prop"></Cell>
        </CellGroup>
        <!--<el-col v-for="item in cardDesc" class="top10">{{item.label}}:{{item.prop}}</el-col>-->
      </el-row>
    </el-card>
    <BackTop>
      <el-button round type="info">返回顶部</el-button>
    </BackTop>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cardDesc:[
          {label:'集合点',prop:'某个地方'},
          {label:'集合时间',prop:'2019年9月29号'},
          {label:'骑行路线',prop:'成都到杭州'},
          {label:'描述',prop:'巴拉巴拉巴拉巴拉'},
          ]
      }
    },
    methods: {
      LoadMoreData(dir) {
        console.log(dir)
      }
    }
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
    height: 600px;
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
    margin-right: 20px;
  }

  .card_content {
    color: #898989;
    font-size: 14px;
    margin-top: 20px;
  }

</style>
