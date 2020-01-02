<template>
  <el-card class="card-box">
    <div class="card-title-img">
      <img src="http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853">
      <div class="card-Label-box">
        <div class="card-label-text-box">
          <p>进行中</p>
          <p>2/10人</p>
          <div class="thumbtack"></div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-time-box">
        <span class="card-time">{{data.departureTime}}</span>
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
    }
  }
</script>

<style scoped="scoped" lang="scss">
    .card-box {
      width: 365px;
      height: 626px;
      margin-bottom: 20px;

      .card-title-img {
        position: relative;
      }
      .card-Label-box {
        position: absolute;
        top: 0;
        left: 15px;
        width: 47px;
        height: 61px;
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
            margin-bottom: 1px;
          }
          .thumbtack {
            margin-bottom: 2px;
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
        margin: 25px 20px;

        .card-time-box{

        }
        .card-time {
          font-size: 14px;
        }
      }

    }
</style>
