<template>
  <div class="map-box" :id="mapId" :style="`width:${width};height:${height}`">
  </div>
</template>

<script>
import {parsePoints} from "@/utils";

export default {
  props: {
    mapId: {
      type:String,
      default: 'map'
    },
    mapData: {
      type:Array,
      default: ()=>[]
    },
    width: {
      type:String,
      default: '',
    },
    height: {
      type:String,
      default:'',
    }
  },
  data() {
    return {
      map: {},  //地图容器
      riding: {},
      loading: {},  //地图加载状态
      callbackStatus: false,  //判断是否在回调状态
      polylineArr: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.map = new BMap.Map(this.mapId)
      this.map.centerAndZoom('成都', 10);                 // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      this.map.clearOverlays()
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
          this.callbackStatus = false
          this.loading.close()  // 关闭loading状态
          var viewPort = this.map.getViewport(this.mapData)
          this.map.centerAndZoom(viewPort.center, viewPort.zoom - 1);      //地图视角切换至路径规划中心
        } else {      //没有找到骑行路径
          this.$message.error('没有到此点的骑行路径，请重新设置')
          this.loading.close()  // 关闭loading状态
        }
      })
      this.routeRender()
      this.makerRender()
    },
    /**
     *  骑行路线渲染
     */
    routeRender() {
      if(this.mapData.length < 2) return false //没有2个途径点退出计算
      this.loading = this.$loading({
        lock: true,
        text: '正在计算骑行路径',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target:document.querySelector('#map')
      });
      setTimeout(()=> {
        this.loading.close()
      },2000)
            // 利用骑行路径返回point在地图绘制成线
      let mapPoint = parsePoints(this.mapData)
      // 循环绘制骑行路线
      for(let key in mapPoint) {
        if(key < mapPoint.length - 1) {
          setTimeout(()=> {
            this.riding.search(mapPoint[Number(key)], mapPoint[Number(key)+1])
          },100 * key)
        }
      }
      var viewPort = this.map.getViewport(mapPoint)
      this.map.centerAndZoom(viewPort.center, viewPort.zoom - 2);      //地图视角切换至路径规划中心

    },
    /**
     *  骑终点路线渲染
     */
    async makerRender() {
      for(let key in this.mapData) {
        var point = this.mapData[key]
        var marker = new BMap.Marker(point);  // 创建标注
        // 添加标注描述
        let text
        key == 0 ? text = '起' : text = '' + key
        if(key == this.mapData.length -1 ) text = '终'
        let label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
        marker.setLabel(label);
        this.map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
      }
    }
  },

}
</script>

<style scoped lang="scss">
#map {

}
</style>
