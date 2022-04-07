<template>
  <div>
    <div flex="main:center" >
      <div class="personal-page-top mt20">
        <div class="mt30" flex="main:center">
          <div class="personal-img mt10">
            <portrait :src="userData.portrait"></portrait>
          </div>
        </div>
        <div class="user-name" flex="main:center">{{userData.nickName}}</div>
        <div class="jieshao" flex="main:center">{{userData.introduction}}</div>
        <div class="backdrop" flex="cross:center main:justify">
          <div v-for="item,index in tabList" :key="index" :class="currentTab === item.prop ? 'click-btn' : 'btn'" @click="handleTaddbChange(item)">{{item.label}}</div>
        </div>
        <el-button type="primary" class="concern-button" @click="follow('follow')" v-if="!isConcern">关注他</el-button>
        <el-button type="info" class="concern-button" @click="follow('cancel')" v-if="isConcern">取消关注</el-button>


      </div>
    </div>

    <div flex="main:center" class="mt30">

      <div class="personal-content" flex="main:justify">
        <transition name="el-fade-in">
          <div class="content-left">


          <!--     发布的活动       -->
            <div v-if="currentTab === 'activityList'" flex>
              <div class="content-left ml20">
                <div class="content-title mb20">
                  {{tabName}}
                </div>
                <hd-card v-for="item,index in hdList" :key="index" shadow="hover" class="hd-card mt20" :item="item" v-if="hdList.length> 0">
                </hd-card>
                <div v-if="hdList.length === 0">
                  暂无发布活动
                </div>
              </div>
              <div class="content-right" flex="main: center">
                <div class="gz-box">
                  <div class="gz-top">
                    关注TA的人
                  </div>
                  <div class="gz-content" flex="main:justify" >
                    <div v-for="item in fansArr" class="user-item mr10" @click="toPersonal(item)" v-if="fansArr.length > 0">
                      <div>
                        <portrait class="user-portrait" :src="item.portrait"></portrait>
                      </div>
                      <div flex="main:center">
                        {{item.nickName}}
                      </div>
                    </div>

                    <div v-if="fansArr.length === 0">
                      暂无关注
                    </div>
                  </div>
                </div>
              </div>
            </div>

<!--            个人主页-->
            <div v-if="currentTab === 'personalPage'" flex="main:center">
              <div v-html="userData.homePage" v-if="userData.homePage"></div>
              <div v-else>
                暂无主页
              </div>
            </div>

<!--            报名活动-->
            <div v-if="currentTab === 'signUpActivity'">
              <div class="content-left ml20">
                <div class="content-title mb20">
                  {{tabName}}
                </div>

              </div>
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
        {label: '报名的活动',prop: 'signUpActivity'},
        {label: '发布的活动',prop: 'activityList'},
      ],
      currentUserId: '',
      currentTab: 'personalPage',
      tabName: '个人主页',
      hdList: [],
      userData: {},
      fansArr: [],
      isConcern: false,
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    toPersonal(i) {

      this.$store.commit('TO_PERSONAL_DETAIL', {userId:i._id})
    },
    getFans() {
      let data = {
        users: this.userData.fans
      }
      this.$store.dispatch('GetUsers',data).then(res=> {
        this.fansArr = res.data.result
      })
    },
    getUserData() {
      this.$store.dispatch('GetUserData',{id: this.$route.query.userId})
        .then(res=> {
          this.userData = res.data.result
          this.$store.dispatch('GetUserId').then(res=> {
            this.isConcern = this.userData.fans.includes(res)
          })
          this.getFans()
          this.getSingUp()
      })
    },
    getSingUp(){

    },
    handleTabChange(i) {
      this.tabName = i.label
      this.currentTab = i.prop
      this.getHd()
    },
    follow(type) {
      let data = {userId: this.$route.query.userId,type}
      this.$store.dispatch('ConcernUser',data).then(res=> {
        this.$message.success(res.data.msg)
        this.getUserData()
      })
    },
    getHd() {
      let query = {
        userId: this.$route.query.userId,
        pageSize: 10,
        pageNum: 0
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

.concern-button {
  position: absolute;
  right: 30px;
  //background: #FFE403;
  //border-color: #FFE403;
  //color: #1a1a1a;
  opacity: 1;
  bottom: 5px
}
</style>
