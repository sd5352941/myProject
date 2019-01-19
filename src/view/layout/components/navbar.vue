<template>
  <div class="navbar">
    <div class="navbar-centent">
      <Icon type="md-bicycle" size="40"/>
      <a class="link link--kukuri" href="#" data-letters="骑迹"
         @click="toHome">骑迹</a>
      <section class="navbar-right">
        <article style="margin-right: 50px">
          <el-button type="warning" size="medium" round>发布活动</el-button>
        </article>
        <article>
          <el-input style="width: 120px" size="mini" suffix-icon="el-icon-search"></el-input>
        </article>
        <article class="sign-in" v-if="!token">
          <a @click="toLogin">
            注册/登陆
          </a>
        </article>
        <article class="user-name-box" v-if="token">
          <el-dropdown>
            <span class="user-name">
              {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" style="color: #242329">个人中心</el-button>
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
  import {Icon} from 'iview';
  import Vue from 'vue'
  import {mapGetters} from "vuex"

  Vue.component('Icon', Icon);

  export default {
    computed: {
      ...mapGetters([
        'token',
        'userName'
      ])
    },
    name: 'navbar',
    data() {
      return {}
    },
    methods: {
      toHome() {
        this.$router.push('/')
      },
      toLogin() {
        this.$router.push('/login')
      },
      loginOut() {
        this.$store.dispatch('LoginOut')
        this.toHome()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .navbar {
    article {
      margin-right: 20px;
    }
    .sign-in {
      font-family: "Microsoft JhengHei UI";
    }
    padding: 20px;
    color: black;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 80px;
    background: linear-gradient(to bottom right, #f0f1f3, #a5a5a5)
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
    width: 58px;
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
</style>
