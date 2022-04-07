<template>
  <div class="point-aggregation-map" id="pointAggregation"></div>
</template>

<script>
export default {
  data() {
    return {
      point:''
    }
  },
  methods: {
    initMap(){
      this.map = new BMap.Map("pointAggregation");          // 创建地图实例
      this.point = new BMap.Point(116.404, 39.915);  // 创建点坐标
      this.map.enableScrollWheelZoom(true);
      this.map.centerAndZoom(this.point, 15);
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style lang="scss" scoped>
.point-aggregation-map {
  height: 800px;
  width: 100%;
}
</style>
