<template>
  <div class="mobile-box">
    <div class="phone-bg">
      <div class="content-bg">
        <img :src="data.imgPath" class="title-img">
        <div class="text-content">
          <div class="title-text">
            {{data.title}}
          </div>
          <div class="mt20 content-detail">
            <div>
              集合地点: {{data.address}}
            </div>
            <div class="mt15">目的地：{{data.destination}}</div>
            <div class="mt15">集合时间：{{formatDate(data.gatheringTime)}}</div>
            <div class="mt15">出发时间：{{formatDate(data.departureTime)}}</div>
<!--            <div class="mt15">活动性质：{{toText.type[data.type]}}</div>-->
<!--            {{data}}-->
            <div class="mt40 apply-text">
              报名类型:
              <xhq-radio :options="{radioArr:data.typeArr,unit: '￥'}" v-model="applyType" class="ml20"></xhq-radio>
            </div>
          </div>
        </div>

        <div class="map-content mt30">
          <div class="map-title">
            <i class="el-icon-location-outline mr20" style="color: red"></i>
            <span>活动地图</span>
          </div>
          <view-map height="365px" width="670px" class="mt30" :mapData="data.mapPoint" mapId="mobile"></view-map>
        </div>

        <div class="map-content mt30 mb88">
          <div class="map-title mb20">
            <i class="el-icon-location-outline mr20" style="color: red"></i>
            <span>活动详情</span>
          </div>
          <div v-html="data.desc"></div>

        </div>
        <div class="sign-up-button">
          <span class="sign-up-text">立即报名</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {formatDate} from '@/utils/formatDate'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      applyType: '',
      toText: {
        type: {
          free: '免费',
          charge: '收费'
        },
      },
    }
  },
  methods: {
    /**
     * 时间格式化
     */
    formatDate(val) {
      return formatDate(new Date(val))
    }
  }
}
</script>

<style>
.mobile-box {
  transform: scale(0.45);
}
.phone-bg {
  background: url("../../../static/image/backgroud/phone-bg.png");
  background-size: cover;
  width: 834px;
  height: 1698px;
  padding: 170px 0px 0 36px;
}
.content-bg {
  width: 745px;
  height: 1362px;
  overflow-y:auto;
  overflow-x: hidden;
  background: #F6F6F6;
}
.title-img {
  width: 745px;
  height: 427px;
}
.text-content {
  background: white;
  padding: 30px;
  box-shadow: 0px 2px 21px rgba(224, 224, 224, 0.5);
  opacity: 1;

}
.title-text {
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #333333;
}

.content-detail {
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
}
.apply-text {
  display: flex;
  align-items: center;
  font-weight: 600;
}

.map-content {
  width: 750px;
  background: #FFFFFF;
  box-shadow: 0px 2px 21px rgba(224, 224, 224, 0.5);
  opacity: 1;
  border-radius: 0px;
  padding: 30px;
}

.map-title {
  display: flex;
  align-items: center;
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 0px;
  color: #333333;
  opacity: 1;
}

.sign-up-button {
  width: 750px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFE403;
  position: fixed;
  bottom: 164px;
  font-size: 34px;
  font-weight: 600;
  color: #333333;
  cursor: pointer;
  opacity: .9
}
.sign-up-text {
  opacity: 1
}
</style>
