<template>
  <div class="backgourdIMG">
    <carousel style="min-width: 1200px"></carousel>
    <div class="search-div">
      <search-box></search-box>
    </div>
    <el-card class="content">
      <el-tabs v-model="homeTab" style="width: 1180px">
        <el-tab-pane label="活动列表" name="list">
          <div>
            <card-list></card-list>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图模式" name="map">
          <map-list></map-list>
        </el-tab-pane>
        <el-tab-pane label="点聚合" name="dianjuhe">

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
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'homeTab'
      ])
    },
    data() {
      return {}
    },
    components: {
      cardList,
      carousel,
      mapList,
      searchBox
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style>
  .backgourdIMG {
  }
  .search-div {
    display: flex;
    justify-content: center;
    margin-top: 63px;
  }
  .content {
    padding: 10px;
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: center;
  }
</style>
