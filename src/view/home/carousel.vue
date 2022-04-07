<script src="../../../build/utils.js"></script>

<template>
  <div class="header">
    <img :src="carouselList[0].imageURL">
<!--    <el-carousel>-->
<!--      <el-carousel-item v-for="item in carouselList" :key="item.imageURL">-->
<!--        <img :src="item.imageURL">-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        carouselList: [{
          imageURL: require('../../image/title/banner.png')
        }]
      }
    }
  }
</script>

<style scoped lang="scss">
  //.el-carousel__container {
  //  height: 700px;
  //}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 900px;
    margin: 0;
  }

  .img {
    width: 100%; /* ... */
    height: 100%; /* ... */
    background-image: url('../../image/title/banner.png');
    background-position-y:center;
    background-position-x:center;
    /*background-size: 700px;*/
    background-repeat: no-repeat;
  }
  .header {
    margin-top: 100px;
  }
  img {
    width: 100vw;
    height: calc(100vh - 100px);
  }
</style>
