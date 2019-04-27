<template>
  <div class="roadrouter-box">
    <h2>地图上点击右键创建路径点</h2>
    <div class="util-box">
      <el-input class="auto-input" v-model="searchValue">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="danger" style="float: right;margin-right:50px;
      height: 40px;"
      @click="removeRoute">重置路线</el-button>
    </div>
    <div id="container">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        riding: {},
        searchValue: '',
        map: {},
        makerArray: [],
        drawingManager: {},
        nextState: false,
        localCity: '',
        markerNum: 0,
      }
    },
    computed: {
    ...mapGetters([
        'commitDetail'
      ])
    },
    mounted: function () {
      console.log(this.commitDetail)
      this.getCity()
    },
    methods: {
      /**
       * 获取当前城市
       */
      getCity() {
        var myCity = new BMap.LocalCity();
        myCity.get(this.initMap)
      },
      /**
       * 初始化地图
       * @param result
       */
      initMap(result) {
        var cityName = result.name    //获取当前城市名字
        this.map = new BMap.Map("container");          // 创建地图实例
        this.map.centerAndZoom(cityName, 10);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.riding = new BMap.RidingRoute(this.map, {       //创建riding对象
          renderOptions: {
            map: this.map,
            autoViewport: true
          }
        });
        this.riding.setSearchCompleteCallback(()=> {
          var pts = this.riding.getResults().getPlan(0).getRoute(0).getPath()   //获取路线途经坐标点
          var polyline = new BMap.Polyline(pts)  // 将坐标点数组绘制成线
          this.map.addOverlay(polyline)
          this.riding.clearResults() //清除路径计算点
        })
        this.autocomplete()
        this.handlerMouseClick()
      },
      /**
       * 输入框完成自动输入，搜索目的地
       */
      autocomplete() {
        var object = document.getElementsByClassName('auto-input')[0].children[0]
        object.id = 'suggestInput'
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "suggestInput",
            "location": this.map
          });
        ac.addEventListener("onconfirm", (e) => {    //鼠标点击下拉列表后的事件
          var value = e.item.value.city + e.item.value.district + e.item.value.business
          var local = new BMap.LocalSearch(this.map, {
            renderOptions: {map: this.map}
          });
          local.search(value);
        })
      },
      /**
       * 注册地图鼠标右键事件
       */
      handlerMouseClick() {
        var menu = new BMap.ContextMenu();
        var txtMenuItem = [
          {
            text: '添加途径点',
            callback: (point) => {
              this.addMaker(point)
            }
          },
        ];
        for (var i = 0; i < txtMenuItem.length; i++) {
          menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        this.map.addContextMenu(menu);
      },
      /**
       * 添加路径点并计算骑行路径
       */
      addMaker(p) {
        var marker = new BMap.Marker(p)
        marker.enableDragging()
        var text
        this.commitDetail.mapPoint.length == 0 ?text='起点' :text = '' +  this.commitDetail.mapPoint.length
        var label = new BMap.Label(text,{offset:new BMap.Size(20,-10)});
        this.commitDetail.mapPoint.push(p)
        marker.setLabel(label);
        this.map.addOverlay(marker);
        if (this.commitDetail.mapPoint.length > 1) {
          this.riding.search(this.commitDetail.mapPoint[this.commitDetail.mapPoint.length-2],this.commitDetail.mapPoint[this.commitDetail.mapPoint.length-1])
          var viewPort = this.map.getViewport(this.commitDetail.mapPoint)
          this.map.centerAndZoom(viewPort.center, viewPort.zoom-1);
        }
        // this.map.setViewport(this.commitDetail.mapPoint)
      },
      /**
       * 重置路线
       */
      removeRoute() {
        this.map.clearOverlays();
        this.commitDetail.mapPoint = []
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
    z-index: 3
  }

  .util-box {
    position: relative;
    top: 55px;
    left: 25px;
    z-index: 1
  }

  .auto-input {
    width: 200px;
  }

  .BMapLib_circle, .BMapLib_polygon, .BMapLib_polyline, .BMapLib_rectangle {
    display: none;
  }
</style>
