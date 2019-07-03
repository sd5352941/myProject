<template>
  <el-menu class="systemNavbar" mode="horizontal">
    <template>
      <div style="display: flex">
        <div>LOGO</div>
        <breadcrumb></breadcrumb>
      </div>
    </template>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <b>{{userName}}</b>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="loginOut" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    data() {
      return {
        name: ""
      }
    },
    components: {
      Breadcrumb,
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'userName'
      ])
    },
    methods: {
      loginOut() {
        this.$store.dispatch('LoginOut').then(() => {
          this.$router.push("/home")
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
    },
    mounted: function () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .systemNavbar {
    display: flex;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;

      .avatar-wrapper {
        font-size: 16px;
        cursor: pointer;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

