<template>
  <div>
    <el-menu :default-active="routerName" unique-opened class="el-menu-vertical-demo"
             :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="item in routers">
        <el-submenu :index="item.name" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <template v-for="children in item.children">
            <router-link :to="{name:children.name}" :key="children.name">
              <el-menu-item :index="children.name">{{children.meta.title}}</el-menu-item>
            </router-link>
          </template>
        </el-submenu>
        <template v-if="!item.children">
          <router-link :to="{name:item.name}">
            <el-menu-item :index="item.name">
              <i class="el-icon-document"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
</style>

<script>
  export default {
    props: {
      routers: {
        type: Array
      }
    },
    data() {
      return {
        isCollapse: false,
        systemMenu: []
      };
    },
    computed: {
      routerName() {
        return this.$route.name
      }
    },
    methods: {},
    mounted() {
      console.log(this.routers)
    }
  }
</script>
