<template>
  <el-card class="release-box">
    <el-steps :active="stepsActive" finish-status="success">
      <el-step title="活动信息"></el-step>
      <el-step title="活动路线"></el-step>
      <el-step title="确认信息"></el-step>
    </el-steps>
    <div class="content-box">
      <base-message v-show="stepsActive == 0" ref="baseMessage"></base-message>
      <road-route v-show="stepsActive == 1"></road-route>
      <confirmation v-if="stepsActive == 2"></confirmation>
    </div>
    <el-button @click="back" v-if="stepsActive!=0">上一步</el-button>
    <el-button @click="next">{{stepsActive > 1 ? '提交': '下一步'}}</el-button>
  </el-card>
</template>

<script>
  import baseMessage from './baseMessage'
  import roadRoute from './roadRoute'
  import confirmation from './confirmation'

  export default {
    name: 'release',
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
    methods: {
      next() {
        this.$refs.baseMessage.$refs.form.validate((value) => {
          if(value) {
            if (this.stepsActive < 2) {
              this.stepsActive ++
            } else {
              this.$store.dispatch('AddActivity')
            }
          }
        })
      },
      back() {
        this.stepsActive --
      }
    }
  }
</script>
<style lang="scss">
  .release-box {
    padding: 30px;
    .content-box {
      margin: 40px;
    }
  }
</style>
