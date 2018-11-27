<template>
  <div class="backgourdIMG">
    <carousel class="top20"></carousel>
    <div class="content top20">
      <el-tabs style="width: 1200px" type="card" v-model="homeTab">
        <el-tab-pane label="活动列表" name="list">
          <div style="width: 1200px" class="content">
            <card-list></card-list>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图模式" name="map">
          {{homeTab}}
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import cardList from './cardList'
  import carousel from './carousel'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'homeTab'
      ])
    },
    data() {
      return {}
    },
    components: {
      cardList,
      carousel
    },
    methods: {

    },
    mounted() {

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
