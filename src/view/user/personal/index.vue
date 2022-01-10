<template>
  <div>
    <div flex="main:center" >
      <div class="personal-page-top mt20">
        <div class="mt30" flex="main:center">
          <div class="personal-img mt10">
            <img src="@static/image/logo/touxiang_default.png">
          </div>
        </div>
        <div class="user-name" flex="main:center">{{userData.username}}</div>
        <div class="jieshao" flex="main:center">{{userData.introduction}}</div>
        <div class="backdrop" flex="cross:center main:justify">
          <div v-for="item,index in tabList" :key="index" :class="currentTab === item.prop ? 'click-btn' : 'btn'" @click="handleTabChange(item)">{{item.label}}</div>
        </div>
      </div>
    </div>

    <div flex="main:center" class="mt30">

      <div class="personal-content" flex="main:justify">
        <transition name="el-fade-in">
          <div class="content-left">

            <div v-if="currentTab === 'activityList'" flex>
              <div class="content-left ml20">
                <div class="content-title mb20">
                  {{tabName}}
                </div>
                <hd-card v-for="item,index in hdList" :key="index" shadow="hover" class="hd-card mt20" :item="item">
                </hd-card>
              </div>
              <div class="content-right" flex="main: center">
                <div class="gz-box">
                  <div class="gz-top">
                    关注TA的人
                  </div>
                  <div class="gz-content" flex="main:justify" >
                    <div v-for="item in userArr" class="user-item mr10" @click="toPersonal(item)">
                      <div>
                        <img class="user-portrait" :src="item.portrait">
                      </div>
                      {{item.userName}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentTab === 'personalPage'" flex >

            </div>


          </div>


        </transition>


      </div>
    </div>
  </div>

</template>


<script>

import {getActivity} from "@/api/activity";
import hdCard from './personalCard'

export default {
  components: {
    hdCard
  },
  data() {
    return {
      tabList: [
        {label: '个人主页',prop: 'personalPage'},
        {label: '发布的活动',prop: 'activityList'},
      ],
      currentTab: 'personalPage',
      tabName: '个人主页',
      hdList: [],
      userData: {},
      userArr: [
        {userName: '用户1',userId: '321',portrait: 'https://thirdwx.qlogo.cn/mmopen/vi_32/uMUb8zxZDYOUkzm6gdqDoyuKNExvia9gznzSeZ4X1LNdmAkNias1kxekjYSW13xpwxpcBv1FxUE8Pp8GFQqQdeRg/132'},
        {userName: '用户2',userId: '321',portrait:'https://cdn.huodongxing.com/Content/v2.0/img/face/male/small/35.jpg'},
        {userName: '用户23',userId: '321',portrait:'https://cdn.huodongxing.com/app/hdx/social/user/logo/1074314805168/1635074536225.jpg'},
        {userName: '用户244',userId: '321',portrait:'https://cdn.huodongxing.com/Content/v2.0/img/face/male/small/34.jpg'},
        {userName: '用户2555',userId: '321',portrait:'http://thirdwx.qlogo.cn/mmopen/vi_32/kddcgrkQHsuoatq8tl0ib2s9GApJFl8furgAYicMzAueoaMb3nYwn5Uo1s3kaTjC7Vmlp5RH52Bcqrib5LfRia1ibIQ/132'}

      ],
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    toPersonal(i) {
      window.open('/#/personal')
    },
    getUserData() {
      this.$store.dispatch('GetUserData',{id: this.$route.query.userId})
        .then(res=> {
        this.userData = res.data.result
      })
    },
    handleTabChange(i) {
      this.tabName = i.label
      this.currentTab = i.prop
      this.getHd()
    },
    getHd() {
      let query = {
        userId: this.$route.query.userId,
        pageSize: 10,
        pageNum: 1
      }
      getActivity(query).then(res=> {
        this.hdList = res.data.result
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.user-item {
  cursor: pointer;

}

.personal-page-top {
  position:relative;
  color: #fff;
  width: 1080px;
  padding-top: 28px;
  height: 350px;
  background: url(~@static/image/backgroud/personal.jpeg);
}

.personal-img {
  img {
    width: 150px;
    height: 150px;
    border-radius:50%
  }
}
.user-name {
  font-size: 18px;
  margin-bottom: 13px;
}

.backdrop {
  padding: 0 200px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: .5;
  background-color: #000;
  height: 50px;
}

.click-btn {
  border: 2px #fff solid;
  background: none;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;
}

.btn {
  background: none;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;
}

.btn::before, .btn::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}

.btn::after {
  bottom: 0;
  right: 0;
}

.btn::before {
  top: 0;
  left: 0;
}

.btn:hover::before, .btn:hover::after {
  width: 100%;
  height: 100%;
}

.btn:hover::before {
  border-top-color: #fff;
  border-right-color: #fff;
  transition: width 0.1s ease-out, height 0.1s ease-out 0.1s;
}

.btn:hover::after {
  border-bottom-color: #fff;
  border-left-color: #fff;
  transition: border-color 0s ease-out 0.2s, width 0.2s ease-out 0.2s, height 0.2s ease-out .4s;
}

.personal-content {
  border: 1px solid #eee;
  width: 1080px;
  background: white;
  padding: 30px;
}

.content-left {
  flex: 6;
}

.content-right {
  flex: 3;
  justify-content: center;
}

.content-title {
  flex:1;
  font-size: 24px;
  position: relative;
  z-index: 1;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #a0a0a0;
}

.gz-box {
  border: 1px solid #dfdede;
  background: #fff;
  width: 260px;
}
.gz-top {
  font-size: 18px;
  line-height: 47px;
  margin-top: 0;
  padding-left: 20px;
  border-bottom: 1px solid #dfdede;
}

.gz-content {
  padding: 30px;
  flex-direction: row;
  flex-wrap: wrap;
}

.user-portrait {
  display: block;
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
  border-radius: 50%;
}

</style>
