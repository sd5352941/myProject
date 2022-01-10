<template>
  <el-card class="card-box" shadow="hover">
    <div class="card-title-img hand" @click="toDetail">
      <img :src="data.imgPath" onerror="javascript:this.src='https://preview.qiantucdn.com/paixin/39/06/74/158PICK58PICjDR3uS96EfXeX_PIC2018.jpg!w1024_new_small';">
      <hd-label :data="data"></hd-label>
    </div>
    <div class="card-content">
      <div class="card-time-box">
        <i class="el-icon-date"></i>
        <span class="card-time">{{formatDate(data.gatheringTime)}}</span>
      </div>
      <div class="card-title-box hand" @click="toDetail">
        {{data.title}}
      </div>
      <div class="card-address-box">
        <i class="el-icon-location"></i> {{data.address}}
      </div>
      <div class="card-tags-box">
        <el-tag v-for="item of data.tags" :key="item" class="mr5">
          {{item}}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>


<script>
import {formatDate} from '@/utils/formatDate'


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
       * 格式化时间
       */
      formatDate(val) {
        return formatDate(new Date(val))
      },
      /**
       * 跳转详情页面
       */
      toDetail() {
        let query = {
          _id: this.data._id
        }
        this.$router.push({path: '/activityDetail', query})
      },
    },
  }
</script>

<style scoped="scoped" lang="scss">
    .card-box {
      width: 365px;
      margin-bottom: 20px;
      -webkit-transition: margin 0.1s ease-out;
      -moz-transition: margin 0.1s ease-out;
      -o-transition: margin 0.1s ease-out;
      &:hover {
        margin-top: -2px;
      }

      .card-title-img {
        position: relative;
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
