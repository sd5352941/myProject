<template>
  <div class="detail_content">
    <el-card class="card" v-if="activityDetail.esInformation">
      <img src="../../../static/image/activityImg/ac1.png" class="titleImg"/>
      <article style="padding: 16px">
        <section class="top20">
          <h1 class="title">{{activityDetail.esInformation.name}}</h1>
          <span>123</span>
        </section>
        <section class="top20">
          <el-row>
            <el-col :span="12">
              <p v-for="item,index in activityDesc" :key="index">
                {{item}}:{{activityDetail.esInformation[index]}}
              </p>
            </el-col>
            <el-col :span="12">
              <div id="baiduMap" style="height: 200px;width: 100%"></div>
            </el-col>
          </el-row>

        </section>
        <section class="top20">

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
        map.centerAndZoom(point, 15);
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style lang="scss">
  .detail_content {
    display: flex;
    justify-content: center;
    .card {
      width: 750px;
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
</style>
