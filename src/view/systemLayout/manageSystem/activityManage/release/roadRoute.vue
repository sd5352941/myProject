<template>
  <div class="roadrouter-box" :v-loading.fullscreen="true">
<!--    <div>地图上点击右键创建路径点</div>-->
    <el-form ref="form" :model="commitDetail" label-width="80px" size="small" class="mt20">
      <el-form-item label="集合地点" :rules="{ required: false, message: '请输入集合地点', trigger: 'blur' }" prop="address">
        <el-input v-model="commitDetail.address" class="base-input" clearable></el-input>
      </el-form-item>
      <el-form-item label="目的地" :rules="{ required: false, message: '请输入目的地', trigger: 'blur' }" prop="destination">
        <el-input v-model="commitDetail.destination" class="base-input" clearable></el-input>
      </el-form-item>
<!--      <el-form-item label="总公里"  prop="roadKm">-->
<!--        <el-input v-model="commitDetail.roadKm" class="base-input" disabled></el-input>-->
<!--      </el-form-item>-->
    </el-form>
    <div class="util-box">
      <el-input class="auto-input" v-model="searchValue" placeholder="搜索地址">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="danger" style="float: right;margin-right:50px;
      height: 40px;"
        @click="removeRoute">重置路线
      </el-button>
    </div>
    <div id="container">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {parsePoints} from "@/utils";

  export default {
    data() {
      return {
        loading: {},  //加载状态
        callbackStuts: false,   //判断搜索路径回调是否结束
        riding: {},
        polyline: {},  //当前返回骑行路径line
        searchValue: '',  //搜索道路名称
        map: {},////
        makerArray: [],
        drawingManager: {},
        nextState: false,
        localCity: '',
        markerNum: 0,
        polylineArr: [],  // 地图覆盖线存放数组
      }
    },
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    mounted: function () {
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
       * 初始化路径
       */
      initRoute() {
        if(this.commitDetail.mapPoint.length > 1) {
          this.map.clearOverlays();
          this.loading = this.$loading({
            lock: true,
            text: '正在计算骑行路径',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target:document.querySelector('#map')
          });
          let mapPoint = parsePoints(this.commitDetail.mapPoint)
          // 循环绘制骑行路线
          for(let key in mapPoint) {
            if(key < mapPoint.length - 1) {
              setTimeout(()=> {
                this.riding.search(mapPoint[Number(key)], mapPoint[Number(key)+1])
              },100 * key)
            }
          }
          // var viewPort = this.map.getViewport(mapPoint)
          this.markerRender(mapPoint)
          // this.map.centerAndZoom(viewPort.center, viewPort.zoom - 2);      //地图视角切换至路径规划中心
        }
      },
      /**
       *  骑终点路线渲染
       */
      markerRender(mapData) {
        for(let key in mapData) {
          var point = mapData[key]
          var marker = new BMap.Marker(point);  // 创建标注
          // 添加标注描述
          let text
          key == 0 ? text = '起' : text = '' + key
          // if(key == mapData.length -1 ) text = '终'
          let label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
          marker.setLabel(label);
          this.map.addOverlay(marker);               // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
        }
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


        // 骑行路径点搜索回调
        this.riding.setSearchCompleteCallback(() => {
            if(this.riding.getResults()) {
              if(this.riding.getResults().getPlan(0).getDistance()) {
                let km = Number(this.riding.getResults().getPlan(0).getDistance().split('公')[0])
                this.commitDetail.roadKm.push(km)
              }
              var pts = this.riding.getResults().getPlan(0).getRoute(0).getPath()   //获取路线途经坐标点
              var polyline = new BMap.Polyline(pts)  // 将坐标点数组绘制成线
              this.map.addOverlay(polyline)
              this.polylineArr.push(polyline)
              this.riding.clearResults() //清除路径计算点
              this.callbackStuts = false
              this.loading.close()  // 关闭loading状态
            } else {      //没有找到骑行路径
              this.$message.error('没有到此点的骑行路径，请重新设置')

              this.loading.close()  // 关闭loading状态
            }
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
        var txtMenuItem = [     //右键信息配置
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
       * mapPoint已有数据添加maker
       */
      cacheAddMarker(p,key) {
        return new Promise(resolve => {
          key = Number(key)
          // this.commitDetail.roadKm = 0
          let marker = new BMap.Marker(p)
          let geoc = new BMap.Geocoder();
          marker.enableDragging()     // 地图标注开启拖拽
          let text
          marker.addEventListener("dragend", this.makerDragendEvent);
          if(!key) {
            text = '起点'

            //根据起点获取集合地点
            geoc.getLocation(p,(rs)=> {
              this.commitDetail.address= rs.address
            })
          } else if(key === this.commitDetail.mapPoint.length - 1){
            text = '' + key
            //根据终点获取集合地点
            geoc.getLocation(p,(rs)=> {
              this.commitDetail.destination= rs.address
            })
          }
          let label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
          marker.setLabel(label);
          this.map.addOverlay(marker);    //地图添加标注
          marker.setAnimation(BMAP_ANIMATION_DROP); //动画
          if(key > 0)    this.computedRouter(this.commitDetail.mapPoint[key-1], this.commitDetail.mapPoint[key])
          resolve()
        })
      },

      /**
       * 添加路径点并计算骑行路径z
       */
      addMaker(p) {
        var marker = new BMap.Marker(p)
        var geoc = new BMap.Geocoder();
        marker.enableDragging()     // 地图标注开启拖拽
        let text
        marker.addEventListener("dragend", this.makerDragendEvent);
        if(!this.commitDetail.mapPoint.length) {
          text = '起点'

          //根据起点获取集合地点
          geoc.getLocation(p,(rs)=> {
            this.commitDetail.address= rs.address
          })

        } else {
          text = '' + this.commitDetail.mapPoint.length
          //根据终点获取集合地点
          geoc.getLocation(p,(rs)=> {
            this.commitDetail.destination= rs.address
          })
        }
        let label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
        this.commitDetail.mapPoint.push(p)
        marker.setLabel(label);
        this.map.addOverlay(marker);    //地图添加标注
        marker.setAnimation(BMAP_ANIMATION_DROP); //动画
        this.computedRouter(this.commitDetail.mapPoint[this.commitDetail.mapPoint.length - 2], this.commitDetail.mapPoint[this.commitDetail.mapPoint.length - 1])
        // if (this.commitDetail.mapPoint.length > 1) {    // 利用骑行路径返回point在地图绘制成线
        //   this.riding.search(this.commitDetail.mapPoint[this.commitDetail.mapPoint.length-2],this.commitDetail.mapPoint[this.commitDetail.mapPoint.length-1])
        //   var viewPort = this.map.getViewport(this.commitDetail.mapPoint)
        //   this.map.centerAndZoom(viewPort.center, viewPort.zoom-1);     //地图视角切换至路径规划中心
        // }
        // this.map.setViewport(this.commitDetail.mapPoint)
      },
      /**
       * 等待搜索路径回调结束
       */
      waitCallback() {
        return new Promise(resolve => {
          var callbackTimer = setInterval(()=> {
            if(!this.callbackStuts) {
              clearInterval(callbackTimer)
              resolve()
            }
          },100)
        })
      },
      /**
       * maker拖拽事件
       */
      async makerDragendEvent(e) {
        let label
        e.target.getLabel().content != '起点' ? label = e.target.getLabel().content : label = 0
        label = Number(label)
        let endMaker = this.commitDetail.mapPoint.length - 1
        this.commitDetail.mapPoint[label] = e.target.point
        if (label > 0 && label < endMaker) {   //移动起终点之间Maker
          this.computedRouter(this.commitDetail.mapPoint[label], this.commitDetail.mapPoint[label - 1])
          this.callbackStuts = true
          this.waitCallback().then(()=>{
            this.callbackStuts = true
            this.computedRouter(this.commitDetail.mapPoint[label], this.commitDetail.mapPoint[label + 1])
            this.waitCallback().then(()=> {
              this.map.removeOverlay(this.polylineArr[label - 1])       //地图上移除相关line
              this.map.removeOverlay(this.polylineArr[label])
              this.polylineArr[label-1] = this.polylineArr[this.polylineArr.length-2]   // line数组替换成新的路径
              this.polylineArr[label] = this.polylineArr[this.polylineArr.length-1]
              this.polylineArr.pop()   //替换后移除数组尾部新增路径
              this.polylineArr.pop()
            })
          })
        } else if(label == 0) {    //移动起点Maker
          this.computedRouter(this.commitDetail.mapPoint[label], this.commitDetail.mapPoint[label+1])
          this.callbackStuts = true
          this.waitCallback().then(()=> {
            this.map.removeOverlay(this.polylineArr[label])       //地图上移除相关line
            this.polylineArr[label] = this.polylineArr[this.polylineArr.length-1]
            this.polylineArr.pop()
          })
        }else if(label == endMaker) {   //移动终点Maker
          this.computedRouter(this.commitDetail.mapPoint[label-1], this.commitDetail.mapPoint[label])
          this.callbackStuts = true
          this.waitCallback().then(()=> {
            this.map.removeOverlay(this.polylineArr[label - 1])       //地图上移除相关line
            this.polylineArr[label-1] = this.polylineArr[this.polylineArr.length-1]
            this.polylineArr.pop()
          })
        }
      },
      /**
       * 骑行路径计算
       */
      computedRouter(form, to) {
        if (this.commitDetail.mapPoint.length > 1) {      // 利用骑行路径返回point在地图绘制成线
          this.loading = this.$loading({
            lock: true,
            text: '正在计算骑行路径',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target:document.querySelector('#container')
          });
          this.riding.search(form, to)
          var viewPort = this.map.getViewport(this.commitDetail.mapPoint)
          this.map.centerAndZoom(viewPort.center, viewPort.zoom - 1);      //地图视角切换至路径规划中心
        }
      },
      /**
       * 重置路线
       */
      removeRoute() {
        this.map.clearOverlays();
        this.polylineArr = []     //清除polyline数组
        this.commitDetail.mapPoint = []     //清除maker数组
        this.commitDetail.destination = ''
        this.commitDetail.address = ''
        this.commitDetail.roadKm = []
      }
    }
    ,
    watch: {
      pointArray() {
        this.pointArray.length > 1 ? this.nextState = true : this.nextState = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  .base-input {
    width: 220px;
  }
</style>
