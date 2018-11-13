<template>
  <div class="detail_content">
    <el-card class="card">
      <img src="../../../static/image/activityImg/ac1.png" class="titleImg"/>
      <div class="content_detail">
        <h1>{{activityDetail.esInformation.name}}</h1>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'activityDetail',
      ])
    },
    methods: {
      /**
       * 获取活动详情
       */
      getDetail() {
        let query = {
          id: this.$route.query._id
        }
        this.$store.dispatch('GetActivityDetail', query)
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style lang="scss">
  .detail_content {
    display: flex;
    justify-content: center;
    .card {
      padding: 16px;
      width: 750px;
      margin-top: 50px;
    }
    .titleImg {
      width: 100%;
      height: 100%;
      /*max-height: 300px;*/
    }
    .content_detail{
      margin-top: 30px;
    }
  }
</style>
