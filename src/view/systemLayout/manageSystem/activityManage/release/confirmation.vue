<template>
  <div class="confirmation-box">
<!--    <p></p>-->
<!--    <div>-->
<!--      <img :src="commitDetail.imgPath">-->
<!--    </div>-->
    <div class="confirmation-background">
      <activity-detail-pc :data="commitDetail"></activity-detail-pc>
    </div>
<!--    <div id="map">-->

<!--    </div>-->
<!--    <view-map :width="500" :height="500" :mapData="commitDetail.mapPoint"></view-map>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import activityDetailPc from '@/components/activityDetail/pc'


  export default {
    name: 'confirmation',
    components: {
      activityDetailPc,
    },
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {

      }
    },
    methods: {

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
</style>
