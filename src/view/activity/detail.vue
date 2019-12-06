<template>
  <div class="detail_content">
    <el-card class="card" v-if="activityDetail.esInformation">
      <el-card>
        <img src="../../../static/image/activityImg/ac1.png" class="titleImg"/>
      </el-card>
      <article style="padding: 16px">
        <section class="top20">
          <h1 class="title">{{activityDetail.esInformation.name}}</h1>
        </section>
        <section style="margin-top: 50px">
          <el-row>
            <el-col :span="9">
              <p v-for="item,index in activityDesc" :key="index" class="top10">
                <label>{{item}}</label>:{{activityDetail.esInformation[index]}}
              </p>
            </el-col>
            <el-col :span="15">
              <el-card>
                <div id="baiduMap"></div>
              </el-card>
            </el-col>
          </el-row>
        </section>
        <section style="margin-top: 50px">
        </section>
      </article>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'activityDetail',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'activityDetail',
        'activityDesc'
      ])
    },
    methods: {
      /**
       * 获取活动详情
       */
      getDetail() {
        let query = {
          id: this.$route.query._id
        }
        this.$store.dispatch('GetActivityDetail', query).then(res => {
          this.initMap()
        })
      },
      initMap() {
        var map = new BMap.Map("baiduMap");          // 创建地图实例
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.enableScrollWheelZoom(true);
        map.centerAndZoom(point, 15);
        var riding = new BMap.RidingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        var mapPoint = this.activityDetail.mapPoint
        let start = new BMap.Point(mapPoint.startPoint.lng, mapPoint.startPoint.lat);
        let end = new BMap.Point(mapPoint.endPoint.lng, mapPoint.endPoint.lat);
        riding.search(start, end)
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style lang="scss">
  #baiduMap {
    height: 600px;
    width: 100%
  }
  .detail_content {
    display: flex;
    justify-content: center;
    .card {
      width: 1200px;
      margin-top: 50px;
    }
    .titleImg {
      width: 100%;
      height: 100%;
      /*max-height: 300px;*/
    }
    .content_detail {
      margin-top: 30px;
    }
    .detail_desc {
      margin-top: 30px;
    }
    .title {
      font-size: 24px;
    }
  }

  .anchorBL {
    display: none;
  }
</style>
