<script src="../../../build/utils.js"></script>
<template>
  <el-carousel type="card">
    <el-carousel-item v-for="item in carouselList" :key="item.imageURL">
      <!--<div :class="item.imageURL"></div>-->
    </el-carousel-item>
  </el-carousel>
  <!--<Carousel autoplay>-->
    <!--<CarouselItem>-->
      <!--<div class="img"></div>-->
    <!--</CarouselItem>-->
    <!--<CarouselItem>-->
      <!--<div class="img2"></div>-->
    <!--</CarouselItem>-->
    <!--<CarouselItem>-->
      <!--<div class="img3"></div>-->
    <!--</CarouselItem>-->
  <!--</Carousel>-->
</template>

<script>
  export default {
    data() {
      return {
        carouselList:[{
          imageURL:'img'
        },{
          imageURL:'img2'
        },{
          imageURL:'img3'
        }]
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 800px;
    margin: 0;
  }
  .img {
    width:100%;			/* ... */
    height:100%;		/* ... */
    background: url('../../image/title/bike_title_1.jpg');
  }
  .img2{
    width:100%;			/* ... */
    height:100%;		/* ... */
    background: url('../../image/title/bike_title_2.jpg');
  }
  .img3 {
    width:100%;			/* ... */
    height:100%;		/* ... */
    background: url('../../image/title/bike_title_3.jpg');
  }
</style>
