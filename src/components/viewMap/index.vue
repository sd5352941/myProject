<template>
  <div class="map-box" id="map">

  </div>
</template>

<script>
export default {
  props: {
    mapData: {
      type:Object,
      default: {}
    }
  },
  data() {
    return {
      map: {},  //地图容器
      riding: {},
      loading: {},  //地图加载状态
      callbackStuts: false,  //判断是否在回调状态
      polylineArr: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.map = new BMap.Map('map')

    }
  }
}
</script>

<style scoped lang="scss">

</style>
