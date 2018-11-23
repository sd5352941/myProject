<template>
  <div class="backgourdIMG">
    <carousel></carousel>
    <div class="content">
      <el-tabs style="width: 1200px" type="card">
        <el-tab-pane label="活动列表" name="first">
          <div style="width: 1200px" class="content">
            <card-list></card-list>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图模式" name="second">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import cardList from './cardList'
  import carousel from './carousel'

  export default {
    data() {
      return {}
    },
    components: {
      cardList,
      carousel
    }
  }
</script>

<style>
  .backgourdIMG {
  }
  .content {
    display: flex;
    justify-content: center;
  }
</style>
