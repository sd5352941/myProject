<template>
  <el-card class="search-box"shadow="never" >
    <div v-for="item in searchDesc" class="search-item">
      <label class="search-label">{{item.label}}:</label>
      <el-radio-group v-model="searchValue[item.model]" v-if="item.status == 'radio'" size="mini" @change="changeTab(item,searchValue[item.model])">
        <el-radio-button v-for="val in item.value" :label="val.value" :key="val.value">{{val.label}}</el-radio-button>
      </el-radio-group>
      <el-checkbox-group v-model="searchValue[item.model]" v-if="item.status == 'checkbox'" size="mini" @change="checkBoxChange(item,searchValue[item.model])">
        <el-checkbox-button v-for="val in item.value" :label="val.value" :key="val.value">{{val.label}}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
  </el-card>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    name: 'searchBox',
    computed: {
      ...mapGetters([
        'searchDesc',
        'activityParams',
        'searchValue'
      ])
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      changeTab(item,val) {
        this.activityParams[item.model] = val
        this.$store.commit('CLEAR_HD_LIST')
        this.$store.dispatch('GetActivityList')
      },
      checkBoxChange(item,val) {
        this.activityParams[item.model] = val.join(',')
        this.$store.commit('CLEAR_HD_LIST')
        this.$store.dispatch('GetActivityList')
      }
    }
  }
</script>
<style scoped lang="scss">
  .search-box {
    width: 1200px;
    padding: 52px 30px 52px 30px;
    margin-bottom: 60px;
  }

  .search-label {
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    margin-right: 38px;
  }

  .search-item {
    margin-bottom: 31px;
    display:flex;
    align-items: center;
  }
</style>g
