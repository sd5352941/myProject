<template>
  <div class="detail-box">
<!--    活动基本信息-->
    <el-card class="card-base">
      <div class="title-top">
        <img :src="data.imgPath" class="cover-img">
        <div class="top-info">
          <div class="title-text">
            {{data.title}}
          </div>
          <div class="title-top-content">
            <div class="title-top-second">
              <div>
                <span>集合地点:</span>
                <span>{{data.address}}</span>
              </div>
              <div class="registration-info mb20">
                <i class="el-icon-user-solid"></i><div class="ml10">已报名 {{data.currentPeople ? data.currentPeople : 0}}<span v-if="data.people">/{{data.people}}</span>人</div>
              </div>
            </div>
            <div class="mb20">目的地：{{data.destination}}</div>
            <div class="mb20">集合时间：{{formatDate(data.gatheringTime)}}</div>
            <div class="mb20">出发时间：{{formatDate(data.departureTime)}}</div>
            <div class="mb20" flex>
              <div class="creator">{{data.creator}}</div>
              <div>123123</div>
            </div>
<!--            <div class="mb20">活动性质：{{toText.type[data.type]}}</div>-->
          </div>
        </div>
      </div>
      <div class="top-content mt40">
        <div class="activity-type">
          <div class="label">报名类型</div>
          <xhq-radio :options="{radioArr:data.typeArr,unit: '￥'}" v-model="applyType"></xhq-radio>
        </div>
        <div class="button-box">
          <div class="sign-up-now" @click="signUp">立即报名</div>
        </div>
      </div>
    </el-card>

<!--    活动地图信息-->
    <el-card class="card-base mt60">
      <div class="card-title mb30">
        <i class="el-icon-location-outline"></i>
        <span>活动地图</span>
      </div>
      <view-map height="575px" width="100%" :mapData="data.mapPoint" mapId="pc"></view-map>

    </el-card>

    <el-card class="card-base mt60">
      <div class="card-title mb30">
        <i class="el-icon-location-outline"></i>
        <span>活动详情</span>
      </div>
      <div v-html="data.desc"></div>
    </el-card>
  </div>
</template>

<script>
import {formatDate} from '@/utils/formatDate'
import {signUpActivity} from "@/api/activity"
import {getUserName} from "@/utils/auth";

export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    view: {
      tyoe:Boolean,
      default: false
    }
  },
  data() {
    return {
      toText: {
        type: {
          free: '免费',
          charge: '收费'
        },
      },
      applyType: ''
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 活动报名
     */
    signUp() {
      if(this.view) return false
      let commit = {
        activityId: this.data._id,
        userName: getUserName()
      }
      signUpActivity(commit).then(res=> {
        console.log(res)
      })
    },
    /**
     * 时间格式化
     */
    formatDate(val) {
      return formatDate(new Date(val))
    }
  }
}
</script>

<style scoped lang="scss">
.detail-box {
  width: 1200px;
  height: 100%;
  padding: 50px 0;
}


.title-top {
  display: flex;
  justify-content: space-between;
}
.cover-img {
  width: 589px;
  height: 335px;
}
.top-info {
  padding: 15px;
  width: 522px;
}
.title-text {
  font-family: PingFang-SC-Bold;
  font-size: 32px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 25px;

}
.title-top-content {
  font-family: PingFang-SC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
}
.title-top-second {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.registration-info {
  display: flex;
  align-items: center;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #FD7E39;
  letter-spacing: 0;
}

.card-base {
  padding: 30px 15px;
}

.card-title {
  font-size: 25px;
  color: #333333;
  letter-spacing: 0;

  i {
    color: #FD7E39;
  }
}

.sign-up-now {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFE403;
  width: 993px;
  font-family: PingFang-SC-Medium;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  height: 80px;

  cursor: pointer;
}

.button-box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.activity-type {
  display: flex;
}
.label {
  width: 89px;
  display: flex;
  align-items: center;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
}
.type-tabs {
  display: flex;
}

.type-card {
  width: 256px;
  height: 70px;
  padding: 20px;
  margin-right: 40px;
  border: 2px solid #D0D0D0;
  border-radius: 4px;
  cursor: pointer;
  ont-family: SFUIText-Regular;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
}

.creator {
  cursor: pointer;
  &:hover {
    color: #dfc700;
  }
}

</style>
