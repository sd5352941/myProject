<template>
  <div class="navbar">
    <div class="navbar-centent">
<!--      <a class="link link&#45;&#45;kukuri" href="#" data-letters="LOGO"-->
<!--         @click="toHome"></a>-->
      <img src="@static/image/logo/pc-title.png" class="logo-img" @click="toHome">
      <section class="navbar-right">
        <article style="margin-right: 50px">
          <el-button type="primary" round class="nav-button" @click="releaseActivity">发布活动</el-button>
        </article>
        <article>
          <el-input class="nav-input" suffix-icon="el-icon-search"></el-input>
        </article>
        <article class="sign-in" v-if="!token">
<!--          <a style="margin-right: 40px" @click="$router.push('login')">注册</a>-->
          <a class="login-text" @click="$router.push('login')">登录</a>
        </article>
        <article class="user-name-box" v-if="token">
          <el-dropdown>
            <el-badge :value="3" class="badge-item">
              <span class="user-name">
                {{userName}}
              </span>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" style="color: #242329" @click="toSystem">个人中心</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" style="color: #242329" @click="loginOut">退出登陆</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth'
  import {Icon} from 'iview';
  import Vue from 'vue'
  import {mapGetters} from "vuex"
  import navMenu from './navMenu'

  Vue.component('Icon', Icon);

  export default {
    name: 'navbar',
    computed: {
      ...mapGetters([
        'token',
        'userName'
      ])
    },
    components: {
      navMenu
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 发布活动
       */
      releaseActivity() {
        this.$router.push({name:'activityRelease'})
      },
      /**
       * 跳转个人中心
       */
      toSystem() {
         this.$router.push('/system')
      },
      toHome() {
        this.$router.push({name:'home'})
      },
      toLogin() {
        this.$router.push({name:'login'})
      },
      loginOut() {
        this.$store.dispatch('LoginOut')
        this.toHome()
      }
    }
  }
</script>

<style lang="scss" scoped>
  a :hover {
    color: #FFE403;
  }
  .navbar {
    width: 100%;
    //min-width: 1200px;
    .badge-item {

    }
    .nav-button {
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      width: 134px;
      height: 37px;
      padding: 10px;
      background: #FFE403;
      border-color:#FFE403;
      }
    article {
      margin-right: 20px;
    }
    .nav-input {
      border-radius: 19px;
      width: 195px;
      height: 38px;
      margin-right: 40px
    }
    .nav-menu {
      height: 100%;
      margin-left: 93px;
    }
    .sign-in {
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      span {
        width: 40px;
        height: 30px;
        display:inline-block;
        cursor:pointer
      }
    }
    align-items: center;
    justify-content: center;
    display: flex;
    height: 103px;
    background: #090909;
    /*background: linear-gradient(to bottom right, #f0f1f3, #a5a5a5)*/
  }

  .link {
    margin-left: 5px;
    outline: none;
    text-decoration: none;
    position: relative;
    font-size: 2em;
    font-weight: 700;
    line-height: 1;
    color: #9e9ba4;
    display: inline-block;
  }

  .user-name-box {
    margin-left: 150px;
  }

  .user-name-box .user-name {
    font-size: 19px;
    cursor:pointer
  }

  .link--kukuri {
    width: 110px;
    text-transform: uppercase;
    font-weight: 900;
    overflow: hidden;
    /*line-height: 0.75;*/
    color: #b2b0a9;
  }

  .link--kukuri:hover {
    color: #b2b0a9;
  }

  .link--kukuri::after {
    content: '';
    position: absolute;
    height: 16px;
    width: 100%;
    top: 50%;
    margin-top: -8px;
    right: 0;
    background: #F9F9F9;
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }

  .link--kukuri:hover::after {
    transform: translate3d(100%, 0, 0);
  }

  .link--kukuri::before {
    content: attr(data-letters);
    position: absolute;
    z-index: 2;
    overflow: hidden;
    color: #424242;
    white-space: nowrap;
    width: 0%;
    transition: width 0.4s 0.3s;
  }

  .link--kukuri:hover::before {
    width: 100%;
  }

  .navbar-centent {
    width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .navbar-right {
    color: #696969;
    font-weight: 600;
    font-size: 1.4em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .logo-img {
    cursor: pointer;
    width: 120px;
    height: 40px;
  }
</style>
