<template>
  <el-card class="card-box">
    <div class="card-title-img hand" @click="toDetail">
      <img :src="data.imgPath">
<!--      <img src="D:\yyh\bike-koa\public\upload\activityCover\dGVzdEltZy5wbmcxNTc4NTU1ODM3MTY2cover.jpg">-->
      <div class="card-Label-box">
        <div class="card-label-text-box">
          <p>进行中</p>
          <p>999/999</p>
          <div class="thumbtack"></div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-time-box">
        <i class="el-icon-date"></i>
        <span class="card-time">{{data.departureTime}}</span>
      </div>
      <div class="card-title-box hand" @click="toDetail">
        {{data.title}}
      </div>
      <div class="card-address-box">
        <i class="el-icon-location"></i> 高新区益州大道按时大萨达所多
      </div>
      <div class="card-tags-box">
        <el-tag v-for="item of data.tags" :key="item">
          {{item}}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>


<script>
  export default {
    name: 'activityCard',
    props: {
      data: {
        // 活动数据
        type:Object,
        default: {}
      }
    },
    data() {
      return {

      }
    },
    methods: {
      /**
       * 跳转详情页面
       */
      toDetail() {
        let query = {
          _id: this.data._id
        }
        this.$router.push({path: '/activityDetail', query})
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
    .card-box {
      width: 365px;
      margin-bottom: 20px;

      .card-title-img {
        position: relative;
      }

      .card-Label-box {
        position: absolute;
        top: 0;
        left: 15px;
        width: 47px;
        height: 70px;
        background-color: #FFE403;
        display: flex;
        justify-content: center;
        border-radius: 0px 0px 20px 20px;
        .card-label-text-box {
          margin-top: 6px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            margin-bottom: 5px;
          }
          .thumbtack {
            margin-top: 2px;
            width: 8px;
            height: 8px;
            border-radius: 20px;
            background-color: #D8D8D8;
          }
        }

      }
      .card-title-img img{
        width: 365px;
        height: 210px;
      }
      .card-content {
        margin: 25px 20px 5px 20px;

        .card-time-box{
          display: flex;
          align-items: center;
        }
        .card-time-box span{
          margin-left: 5px;
        }
        .card-time {
          font-size: 14px;
        }
      }
      .card-title-box {
        height: 74px;
        margin-top: 15px;
        font-size: 25px;
        color: #333333;
        font-family: "adobe-garamond-pro", sans-serif;
      }
      .card-address-box {
        margin-top: 15px;
        color: #666666;
      }
      .card-tags-box {
        margin-top: 20px;
        height: 50px;
        display: flex;
        align-items: center;
        border-top: 1px solid #eee;
      }
    }
</style>
