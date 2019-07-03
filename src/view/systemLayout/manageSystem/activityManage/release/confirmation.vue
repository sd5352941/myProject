<template>
  <div class="confirmation-box">
    {{commitDetail}}}
    <p></p>
    <div id="mapBox"></div>
    1
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'confirmation',
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {
        mapBox: {}
      }
    },
    methods: {
      /**
       * 初始化地图
       */
      initMap () {
        this.mapBox = new BMap.Map('mapBox')
        this.mapBox.centerAndZoom('成都', 10);                 // 初始化地图，设置中心点坐标和地图级别
        this.mapBox.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      }
    },
    mounted() {
      this.initMap()
    }
  }
</script>

<style lang="scss">
  .confirmation-box {
    #mapBox {
      height: 500px;
      width: 500px;
    }
  }
</style>
