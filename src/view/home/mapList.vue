<template>
  <div class="map-list-box">
    <div id="baiduMap">
    </div>
    <el-card class="data-list-box">
      {{activityList}}
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([])
    },
    data() {
      return {
        activityList: [],
        params: {

        }
      }
    },
    methods: {
      initMap() {
        var map = new BMap.Map("baiduMap");          // 创建地图实例
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.enableScrollWheelZoom(true);
        map.centerAndZoom(point, 15);
      },
      getActivityList() {
        this.$store.dispatch('GetActivityList',this.params).then(res=> {
          console.log(res)
        })
      }
    },
    mounted() {
      this.getActivityList()
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
    position: relative;
    top: 0px;
    width: 400px;
    height: 750px;
  }
</style>
