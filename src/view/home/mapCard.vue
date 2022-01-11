<template>
  <el-card shadow="hover" class="map-card-box">
    <div class="sub-text ft14 mt10" flex="main:justify cross:center">
      <div>{{formatDate(new Date(data.gatheringTime))}}</div>
      <div flex="cross：center" @click.stop="collect">
          <el-tag type="danger">已满</el-tag>
      </div>
    </div>

    <div class="primary-text mb20">{{data.title}}</div>

    <div class="sub-text ft15 mb20">{{data.address}}</div>

    <div class="tag-box mb20" flex v-if="data.tags.length">
      <div class="tag mr5 ft12" v-for="item,index in data.tags" :key="index" flex="cross:center main:center">
        {{item}}
      </div>
    </div>

    <div class="bottom-item" flex="main:justify">
      <div flex @click.stop="toPersonalPage">
        <img :src="data.creatorPortrait" class="touxiang mr5">
        <div class="user-name">{{data.creator}}</div>
      </div>
      <div class="view-detail-box" flex="main:center cross:center" @click.stop="toDetail">
        查看详情
      </div>
    </div>

  </el-card>
</template>


<script>
import {formatDate} from "@/utils/formatDate";

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formatDate
    }
  },
  methods: {
    toPersonalPage() {
      let query = {
        userId: this.data.userId
      }
      this.$router.push({path:'/personal',query},)
    },
    /**
     * 收藏页面
     */
    collect() {
      console.log('collect！！')
    },
    /**
     * 跳转详情页面
     */
    toDetail() {
      let query = {
        _id: this.data._id
      }
      this.$store.commit('TO_HD_DETAIL',query)
    },
  }
}
</script>
<style lang="scss" scoped>

.map-card-box {
  padding: 10px;
  cursor: pointer;
  //height: 269px;
  margin-bottom: 10px;
  width: 100%;
  background: #FFFFFF;
  -webkit-transition: margin 0.1s ease-out;
  -moz-transition: margin 0.1s ease-out;
  -o-transition: margin 0.1s ease-out;
  &:hover {
    padding-top: -2px;
  }
}

.sub-text {
  font-family: PingFang-SC-Regular;
  color: #666666;
}

.heart-icon {
  width: 23px;
  height: 23px;
}

.primary-text {
  font-family: PingFang-SC-Bold;
  font-size: 25px;
  color: #333333;
  //height: 68px;
}

.tag {
  border: 1px solid #666666;
  width: 60px;
  height: 25px;
  color: #666666;

}

.touxiang {
  border-radius: 50px;
  width: 16px;
  height: 16px;
}

.user-name {
  font-size: 12px;
  color: #666666;
  &:hover {
    color: #FFE403;
  }
}
.view-detail-box {
  font-size: 14px;
  color: #F58659;
  letter-spacing: 0;
  text-align: right;
}
</style>
