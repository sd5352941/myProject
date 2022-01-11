<template>
  <div class="map-list-box" flex>
    <el-card class="data-list-box">
      <div class="data-item" v-for="item,index in activityList" @click="searchRoute(item.mapPoint)" :key="index">
        <map-card :data="item"></map-card>

      </div>
    </el-card>
    <div id="baiduMap">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import mapCard from "./mapCard";

  export default {
    computed: {
      ...mapGetters([
        'activityList'
      ])
    },
    components: {
      mapCard
    },
    data() {
      return {
        loading: {}, //地图加载状态
        map: '',
        point: '',
        // activityList: [],
        params: {},
        newMapPoint: [], //point新存放数组
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
            this.riding.clearResults() //清除路径计算点
            this.loading.close()  // 关闭loading状态
          } else {      //没有找到骑行路径
            this.$message.error('没有到此点的骑行路径，请重新设置')
            this.loading.close()  // 关闭loading状态
          }
        })
      },
      /**
       * 搜索骑行路径并渲染
       * @param mapPoint
       */
      searchRoute(mapPoint) {
        this.newMapPoint = []
        // if(this.loading) this.loading.close()
        this.map.clearOverlays()
        this.loading = this.$loading({
          lock: true,
          text: '正在计算骑行路径',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target:document.querySelector('#baiduMap')
        });
        if (mapPoint.length > 1) {      // 利用骑行路径返回point在地图绘制成线
          // 重新绘制构建point点
          for (let key in mapPoint) {
            this.newMapPoint.push(new BMap.Point(mapPoint[key].lng,mapPoint[key].lat));
          }
          // 循环绘制骑行路线
          for(let key in this.newMapPoint) {
            if(key < this.newMapPoint.length - 1) {
              setTimeout(()=> {
                this.riding.search(this.newMapPoint[Number(key)], this.newMapPoint[Number(key)+1])
              },100 * key)
            }
          }
          var viewPort = this.map.getViewport(this.newMapPoint)
          this.map.centerAndZoom(viewPort.center, viewPort.zoom - 1);      //地图视角切换至路径规划中心
          this.makerRender()
        }
      },
      /**
       *  骑终点路线渲染
       */
      async makerRender() {
        let time = 2000
        for(let key in this.newMapPoint) {
          time > 200 ? time = time - 200 : time = 200
          var point = this.newMapPoint[key]
          var marker = new BMap.Marker(point);  // 创建标注
          // 添加标注描述
          let text
          key == 0 ? text = '起' : text = '' + key
          if(key == this.newMapPoint.length -1 ) text = '终'
          let label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
          marker.setLabel(label);
          this.map.addOverlay(marker);               // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
        }
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
    background: #f0f1f3;

    overflow-y: auto;
    //position: absolute;
    //top: 10px;
    width: 375px;
    height: 800px;
  }
</style>
