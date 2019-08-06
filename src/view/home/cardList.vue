<template>
  <div>
    <div class="card-box">
      <el-card class='card' v-for="item,index in activityList" shadow="" :key="item._id">
        <div>
          <div class="card_img"></div>
          <div style="padding: 10px">
            <div class="time"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.time}}</div>
            <div class="card_title" @click="toDetail(item._id)" >{{item.title}}</div>
            <div class="area"><img src="../../image/pointer/gps_19.png" style="margin-right: 10px;width: 20px;height: 20px">{{item.region}}</div>
            <hr style="margin-top: 15px;border:1px solid #eee ;"/>
            <div class="type">
              <div>
                <el-tag v-for="itemType in item.tags" :key="itemType" style="margin-right: 10px">{{itemType }}</el-tag>
              </div>
              <div>
                <el-checkbox v-model="item[index]">收藏</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
      <BackTop>
        <el-button round type="info">返回顶部</el-button>
      </BackTop>
    <div style="width: 100%;display: flex;justify-content: center">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loadingDisplay" infinite-scroll-distance="10"
           style="height: 100px" v-if="!noData">
        <div class="loadMore">
          <div class="loading">
            <span v-for="item in 5" :key="item" v-if="loadingDisplay"></span>
          </div>
        </div>
      </div>
      <span v-if="noData" style="text-align: center;height: 50px; margin-top: 30px;width: 100%">已无数据<a @click="loadMore" style="color: #2baee9">重新加载</a></span>
    </div>
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
        'activityParmas'
      ])
    },
    data() {
      return {
        noData: false,
        loadingDisplay: false,
        cardDesc: [
          {label: '集合点', prop: '某个地方'},
          {label: '集合时间', prop: '2019年9月29号'},
          {label: '骑行路线', prop: '成都到杭州'},
          {label: '描述', prop: '巴拉巴拉巴拉巴拉'},
        ]
      }
    },
    methods: {
      /**
       * 加载更多活动列表
       */
      loadMore() {
        this.loadingDisplay = true
        this.noData = false
        setTimeout(() => {
          this.$store.dispatch("GetActivityList", this.activityParmas).then(res => {
            if (res.data.result.length != 0) {
              this.activityParmas.pageNum = this.activityList.length
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
        this.$store.dispatch("GetActivityList", this.activityParmas).then(res => {
          this.activityParmas.pageNum = this.activityList.length
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
    min-height: 300px;
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

  .card {
    .time {
      margin-top: 14px;
      color: #999;
      font-size: 14px;
    }
    .type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    .area {
      margin-top: 14px;
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .card_title {
      cursor:pointer;
      word-wrap:break-word;
      margin-top: 8px;
      color: #2b312b;
      font-size: 22px;
      font-weight: 600;
      line-height: 22px;
      height: 44px;
    }
    .card_title:hover{
      color: #409EFF;
    }
    height: 420px;
    width: 350px;
    margin: 12px 0px;
  }


  .card_img {
    height: 200px;
    width: 100%;
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
