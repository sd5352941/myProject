<template>
  <div class="card-list-box"  v-infinite-scroll="loadMore" :infinite-scroll-immediate="false">
    <div class="card-box">
      <activity-card :data="item" v-for="item,index in activityList" :key="item._id"></activity-card>

<!--      加载样式-->
      <div style="width: 100%;display: flex;justify-content: center">
        <div style="height: 100px" v-if="!noData">
          <div class="loadMore">
            <div class="loading">
              <span v-for="item in 5" :key="item" v-if="loadingDisplay"></span>
            </div>
          </div>
        </div>
        <span v-if="noData" class="no-more-info">已经没有更多了</span>
      </div>
      <!--      加载样式-->

    </div>
      <BackTop>
        <el-button round type="info">返回顶部</el-button>
      </BackTop>
  </div>
</template>

<script>
  import loading from '@/components/loading.vue'
  import activityCard from './activityCard'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      loading,
      activityCard
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
        }, 1000)
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
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .card-list-box {
    padding: 30px 0;
    height: 700px;
    overflow-y:auto;
    background: #F6F6F6;;
  }
  .card-box {
    overflow-y:auto;
    /*height: 700px;*/
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
  .no-more-info {
    text-align: center;
    height: 50px;
    margin-top: 30px;
    width: 100%
  }

</style>
