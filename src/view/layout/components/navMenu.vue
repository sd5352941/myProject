<template>
  <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">测试</el-menu-item>
  </el-menu>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    name: 'navMenu',
    computed: {
      ...mapGetters([
        'navMenu',
      ])
    },
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
}
</style>
