<template>
  <div class="backgourdIMG">
    <carousel style="min-width: 1200px"></carousel>

    <el-card class="content top20">
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
      mapList
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style>
  .backgourdIMG {
  }

  .content {
    padding: 10px;
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: center;
  }
</style>
