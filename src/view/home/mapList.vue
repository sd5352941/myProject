<template>
  <div class="map-list-box">
    <div id="baiduMap">
    </div>
    <el-card class="data-list-box">
      <div class="data-item" v-for="item in activityList" @click="searchRoute(item.mapPoint)">
        <h2>{{item.title}}</h2>
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
      /**
       * 初始化地图
       */
      initMap() {
        this.map = new BMap.Map("baiduMap");          // 创建地图实例
        this.point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        this.map.enableScrollWheelZoom(true);
        this.map.centerAndZoom(this.point, 15);
        this.riding = new BMap.RidingRoute(this.map, {       //创建riding对象
          renderOptions: {
            map: this.map,
            autoViewport: true
          }
        });

        // 骑行路径点搜索回调
        this.riding.setSearchCompleteCallback(() => {
          if(this.riding.getResults()) {
            var pts = this.riding.getResults().getPlan(0).getRoute(0).getPath()   //获取路线途经坐标点
            var polyline = new BMap.Polyline(pts)  // 将坐标点数组绘制成线
            this.map.addOverlay(polyline)
            this.polylineArr.push(polyline)
            this.riding.clearResults() //清除路径计算点
            // this.loading.close()  // 关闭loading状态
            var viewPort = this.map.getViewport(this.commitDetail.mapPoint)
            this.map.centerAndZoom(viewPort.center, viewPort.zoom - 1);      //地图视角切换至路径规划中心
          } else {      //没有找到骑行路径
            this.$message.error('没有到此点的骑行路径，请重新设置')
            // this.loading.close()  // 关闭loading状态
          }
        })
      },
      /**
       * 搜索骑行路径并渲染
       * @param mapPoint
       */
      searchRoute(mapPoint) {
        this.map.clearOverlays()

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
