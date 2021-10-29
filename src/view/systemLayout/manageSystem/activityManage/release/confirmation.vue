<template>
  <div class="confirmation-box">
<!--    <p></p>-->
<!--    <div>-->
<!--      <img :src="commitDetail.imgPath">-->
<!--    </div>-->
    <div class="confirmation-background">
      <transition name="el-fade-in-linear">
        <activity-detail-mobile :data="commitDetail" class="mobile-box" v-show="showPhone"></activity-detail-mobile>
      </transition>
      <activity-detail-pc :data="commitDetail"></activity-detail-pc>
    </div>
    <div @click="showHidePhone">
      <el-card class="show-phone">
        <i class="el-icon-mobile-phone"></i>
      </el-card>
    </div>
<!--    <div id="map">-->

<!--    </div>-->
<!--    <view-map :width="500" :height="500" :mapData="commitDetail.mapPoint"></view-map>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import activityDetailPc from '@/components/activityDetail/pc'
  import activityDetailMobile from '@/components/activityDetail/mobile'


  export default {
    name: 'confirmation',
    components: {
      activityDetailPc,
      activityDetailMobile
    },
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {
        showPhone:false
      }
    },
    methods: {
      showHidePhone () {
        this.showPhone = !this.showPhone
      }
    },
    mounted() {
      // this.initMap()
    },
    updated() {
      // this.initMap()
    }
  }
</script>

<style lang="scss" scoped>
.confirmation-background {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #F6F6F6;
}
.show-phone {
  position: fixed;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  border-radius: 100px;
  z-index: 999;
  top:500px;
  right: 150px;
  cursor: pointer;

  &:hover {
    background: #FFE403;
    transform: scale(1.05);
  }
}
.mobile-box {
  position: fixed;
  top:-300px;
  right: 0px;
  z-index: 998;
}
</style>
