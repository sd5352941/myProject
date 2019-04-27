<template>
  <el-card class="release-box">
    <el-steps :active="stepsActive" finish-status="success">
      <el-step title="活动信息"></el-step>
      <el-step title="活动路线"></el-step>
      <el-step title="确认信息"></el-step>
    </el-steps>
      <div class="content-box">
        <base-message v-show="stepsActive == 0"></base-message>
        <road-route v-show="stepsActive == 1"></road-route>
        <confirmation v-show="stepsActive == 2"></confirmation>
      </div>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
        if (this.stepsActive++ > 2) this.stepsActive = 0;
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
