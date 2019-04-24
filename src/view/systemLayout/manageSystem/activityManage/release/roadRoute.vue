<template>
  <div class="roadrouter-box">
    <div class="util-box">123</div>
    <div id="container">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        map: {},
        pointArray: new Array(),
        drawingManager: {},
        nextState: false,
      }
    },
    mounted: function () {
      this.initMap()
    },
    methods: {
      initMap() {
        var map = new BMap.Map("container");          // 创建地图实例
        map.centerAndZoom("成都", 11);                 // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var overlays = [];
        var that = this
        var overlaycomplete = function (e) {
          overlays.push(e.overlay);
          that.pointArray.push(e.overlay)
          var driving = new BMap.RidingRoute(map, {
            renderOptions: {
              map: map,
              autoViewport: true,
              enableDragging: true,
            }
          });
          if (overlays.length == 2) {
            driving.search(overlays[0].point, overlays[1].point)
            that.$confirm('是否确定为此路线?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              drawingManager.close()
              document.getElementsByClassName("BMapLib_marker")[0].style.display = "none"
            }).catch(() => {
              map.clearOverlays();
              drawingManager.close()
              overlays = []
              that.pointArray = []
            });
          }
        };
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
          drawingType: "BMAP_DRAWING_MARKER",
          isOpen: true, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
      },
      submit() {
        var point = {
          startPoint: this.pointArray[0].point,
          endPoint: this.pointArray[1].point
        }
        this.$store.commit("SET_POINT", point)
      }
    },
    watch: {
      pointArray() {
        this.pointArray.length > 1 ? this.nextState = true : this.nextState = false
      }
    }
  }
</script>

<style>
  #container {
    width: 100%;
    height: 500px;
    z-index:3
  }
  .util-box {
    position: relative;
    top: 25px;
    z-index:1
  }

  .BMapLib_circle, .BMapLib_polygon, .BMapLib_polyline, .BMapLib_rectangle {
    display: none;
  }
</style>
