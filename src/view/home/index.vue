<template>
  <div class="home-content-box">
<!--    <carousel></carousel>-->
    <div class="search-div">
      <search-box></search-box>
    </div>
    <el-card class="content" shadow="never">
      <el-tabs v-model="homeTab">
        <el-tab-pane name="list">
          <div slot="label" class="tab-label">
            <img src="../../image/home/activity-tab.png">
            <span class="mt10">活动列表</span>
          </div>
          <div>
            <card-list></card-list>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图模式" name="map">
          <div slot="label" class="tab-label">
            <img src="../../image/home/map-tab.png">
            <span class="mt10">地图模式</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="点聚合" name="dianjuhe">
          <div slot="label" class="tab-label">
            <img src="../../image/home/dianjuhe-tab.png">
            <span class="mt10">点聚合</span>
          </div>
          <pointAggregation></pointAggregation>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import cardList from './cardList'
  import mapList from './mapList'
  import carousel from './carousel'
  import searchBox from './searchBox'
  import pointAggregation from "./pointAggregation";
  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
//    computed: {
//      ...mapGetters([
//        'homeTab'
//      ])
//    },
    data() {
      return {
        homeTab: 'list'
      }
    },
    components: {
      cardList,
      carousel,
      mapList,
      searchBox,
      pointAggregation
    },
    methods: {},
    mounted() {
      console.log(process.env)
    }
  }
</script>

<style scoped lang="scss">
  .tab-label {
    width: 400px;
  }
  .el-tabs {
    width: 1200px;
  }
  .search-div {
    display: flex;
    justify-content: center;
    margin-top: 63px;
  }
  .content {
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: center;
  }
  .tab-label {
    font-family: PingFang-SC-Medium;
    flex-direction: column;
    width: 355px;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*.tab-label img{*/
  /*  width: 20px;*/
  /*  height: 20px;*/
  /*}*/
</style>
