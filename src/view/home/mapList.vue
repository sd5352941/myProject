<template>
  <div class="map-list-box">
    <div id="baiduMap">
    </div>
    <el-card class="data-list-box">
      <div class="data-item" v-for="item in activityList" @click="searchRoute(item.mapPoint)">
        <h2>{{item.esInformation.name}}</h2>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'activityList'
      ])
    },
    data() {
      return {
        map: '',
        point: '',
        // activityList: [],
        params: {}
      }
    },
    methods: {
      initMap() {
        this.map = new BMap.Map("baiduMap");          // 创建地图实例
        this.point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        this.map.enableScrollWheelZoom(true);
        this.map.centerAndZoom(this.point, 15);
      },
      getActivityList() {
        this.$store.dispatch('GetActivityList', this.params).then(res => {
        })
      },
      searchRoute(mapPoint) {
        this.map.clearOverlays()
        var driving = new BMap.RidingRoute(this.map, {
          renderOptions:{
            map: this.map,
            autoViewport: true,
            enableDragging : true,
          }
        });
        let start = new BMap.Point(mapPoint.startPoint.lng,mapPoint.startPoint.lat);
        let end = new BMap.Point(mapPoint.endPoint.lng,mapPoint.endPoint.lat);
        driving.search(start,end)
      }
    },
    mounted() {
      // this.getActivityList()
      this.initMap()
    }
  }
</script>

<style lang="scss" scoped>
  #baiduMap {
    height: 800px;
    width: 100%;
  }

  .data-list-box {
    overflow-y: auto;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 300px;
    height: 780px;

    .data-item {
      cursor: pointer;
      height: 100px;
      margin-bottom: 10px;
      width: 100%;
      background: #f0f1f3;
    }
  }
</style>
