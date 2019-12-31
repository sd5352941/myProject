<template>
  <div class="card-list-box">
    <div class="card-box" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false">
      <el-card class='card' v-for="item,index in activityList" :key="item._id">
<!--          <div class="card_img"></div>-->
<!--          <div style="padding: 10px">-->
<!--            <div class="time"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.time}}</div>-->
<!--            <div class="card_title" @click="toDetail(item._id)" >{{item.title}}</div>-->
<!--            <div class="area"><img src="../../image/pointer/gps_19.png" style="margin-right: 10px;width: 20px;height: 20px">{{item.region}}</div>-->
<!--            <hr style="margin-top: 15px;border:1px solid #eee ;"/>-->
<!--            <div class="type">-->
<!--              <div>-->
<!--                <el-tag v-for="itemType in item.tags" :key="itemType" style="margin-right: 10px">{{itemType }}</el-tag>-->
<!--              </div>-->
<!--              <div>-->
<!--                <el-checkbox v-model="item[index]">收藏</el-checkbox>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
      </el-card>
      <div style="width: 100%;display: flex;justify-content: center">
        <div style="height: 100px" v-if="!noData">
          <div class="loadMore">
            <div class="loading">
              <span v-for="item in 5" :key="item" v-if="loadingDisplay"></span>
            </div>
          </div>
        </div>
        <span v-if="noData" style="text-align: center;height: 50px; margin-top: 30px;width: 100%">已经没有更多了</span>
      </div>
    </div>
      <BackTop>
        <el-button round type="info">返回顶部</el-button>
      </BackTop>
  </div>
</template>

<script>
  import loading from '@/components/loading.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      loading
    },
    computed: {
      ...mapGetters([
        'activityList',
        'activityParams'
      ])
    },
    data() {
      return {
        noData: false,
        loadingDisplay: false,
        cardDesc: []
      }
    },
    methods: {
      /**
       * 加载更多活动列表
       */
      loadMore() {

        if(this.noData) return false //无数据不触发

        this.loadingDisplay = true
        this.noData = false
        setTimeout(() => {
          this.$store.dispatch("GetActivityList", this.activityParams).then(res => {
            if (res.data.result.length != 0) {
              this.activityParams.pageNum = this.activityList.length
              this.loadingDisplay = false
            } else {
              this.loadingDisplay = true
              this.noData = true
            }
          }).catch(err=>{
            this.loadingDisplay = true
            this.noData = true
          })
        }, 3000)
      },
      /**
       * 获取活动列表
       */
      getList() {
        this.$store.dispatch("GetActivityList", this.activityParams).then(res => {
          this.activityParams.pageNum = this.activityList.length
        }).catch(err => {
          this.loadingDisplay = true
          this.noData = true
        })
      },
      /**
       * 跳转详情页面
       */
      toDetail(id) {
        let query = {
          _id: id
        }
        this.$router.push({path: '/activityDetail', query})
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>

  .card-box {
    overflow-y:auto;
    height: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /*flex-direction: column;*/
    .loadMore {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
    }
  }



  b {
    font-size: 18px;
  }

  .primary_text {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  .card_content {
    color: #898989;
    font-size: 14px;
    margin-top: 20px;
  }

</style>
