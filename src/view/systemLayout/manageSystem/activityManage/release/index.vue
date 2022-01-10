<template>
  <el-card class="release-box">
    <el-steps :active="stepsActive" finish-status="success">
      <el-step title="活动信息"></el-step>
      <el-step title="活动路线"></el-step>
      <el-step title="确认信息"></el-step>
    </el-steps>
    <div class="content-box">
      <base-message v-show="stepsActive == 0" ref="baseMessage"></base-message>
      <road-route v-show="stepsActive == 1" ref="roadRoute"></road-route>
      <confirmation v-if="stepsActive == 2"></confirmation>
    </div>
    <div class="button-box">
      <el-button @click="next" type="primary" class="click-button">{{stepsActive > 1 ? '提交': '下一步'}}</el-button>
      <el-button @click="back" type="primary" plain v-if="stepsActive!=0" class="click-button">上一步</el-button>
    </div>
  </el-card>
</template>

<script>
  import baseMessage from './baseMessage'
  import roadRoute from './roadRoute'
  import confirmation from './confirmation'
  import {mapGetters} from 'vuex'
  import {parsePoints} from "@/utils";

  export default {
    name: 'release',
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    components: {
      baseMessage,
      roadRoute,
      confirmation
    },
    data() {
      return {
        stepsActive: 0

      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        let cacheData = localStorage.getItem('commitDetail')
        if(cacheData) {
          // cacheData.mapPoint = parsePoints(cacheData.mapPoint)
          this.$store.commit('SET_COMMITDETAIL',JSON.parse(cacheData))
          this.commitDetail.mapPoint = parsePoints(this.commitDetail.mapPoint)
        }
        this.$store.commit('SET_COMMITDETAILCREATOR')

      },
      cacheData() {
        localStorage.setItem("commitDetail",JSON.stringify(this.commitDetail));
      },
      async next() {
        this.$refs.baseMessage.$refs.form.validate((value) => {
          if(value) {
            if (this.stepsActive < 2) {
              this.cacheData()
              this.stepsActive ++
              if(this.stepsActive == 1) {
                for(let key in this.commitDetail.mapPoint) {
                  this.$refs.roadRoute.cacheAddMarker(this.commitDetail.mapPoint[key],key)
                }
              }
            } else {
              this.commitData()
            }
          } else {
            this.$message.error('请完善相关活动信息')
          }
        })
      },
      /**
       * 提交数据
       */
      commitData() {
        this.$store.dispatch('AddActivity').then(res=> {
          if(res.data.code === 2000) {
            localStorage.setItem('commitDetail','')
            this.$store.commit('CLEAR_COMMITDETAIL')
            this.$refs.roadRoute.map.clearOverlays()
            this.$confirm('活动提交成功，是否跳转到详情页面', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              let query = {
                _id: res.data.result._id
              }
              this.$router.push({path: '/activityDetail', query})

            }).catch(() => {
              this.stepsActive = 0
            });
          }
        })

      },
      back() {
        this.stepsActive --
      }
    }
  }
</script>
<style lang="scss" scoped="scoped">
  .release-box {
    padding: 30px;
    .button-box{
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 20px;
    }
    .content-box {
      margin: 40px;
    }
  }

  .click-button {
    width: 200px;
  }
</style>
