<template>
  <div class="activity-manage-box">
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="进行中" name="ongoing"></el-tab-pane>
      <el-tab-pane label="已结束" name="end"></el-tab-pane>
    </el-tabs>
    <el-card shadow="hover" v-for="item,index in list" :key="index" class="mb20 hd-card">
      <div class="table-top" flex>
        <div class="hd-poster" style="flex:2" flex="main:center cross:center">活动封面</div>
        <div class="hd-title" style="flex:6" flex="cross:center">活动标题</div>
        <div class="hd-num" style="flex:2" flex="main:center cross:center">报名人数</div>
        <div class="hd-time" style="flex:3" flex="main:center cross:center">活动时间</div>
        <div class="hd-data" style="flex:3" flex="main:center cross:center">发布时间</div>
        <div class="hd-state" style="flex:2" flex="main:center cross:center">活动状态</div>
      </div>


      <div class="table-content mt20 mb20" flex>
        <div class="hd-poster" style="flex:2" flex="main:center cross:center">
          <img :src="item.imgPath" class="hd-img">
        </div>
        <div class="hd-title" style="flex:6" >
          <div class="subColor" style="font-weight: bold;font-size: 18px">{{item.title}}</div>
        </div>
        <div class="hd-num" style="flex:2" flex="main:center cross:center">
          {{item.signUpUser.length}}
          <span v-if="item.people">/{{item.people}}</span>
        </div>
        <div class="hd-time" style="flex:3" flex="main:center cross:center">
          <div>{{formatDate(new Date(item.gatheringTime))}}</div>
        </div>
        <div class="hd-create-time" style="flex:3" flex="main:center cross:center">
          {{formatDate(new Date(item.createTime))}}
        </div>
        <div class="hd-state" style="flex:2" flex="main:center cross:center">
          <el-tag :type="hdState[item.state].type">{{hdState[item.state].text}}</el-tag>
        </div>
      </div>

      <div class="table-bottom" flex>
        <div class="primary-button ">
          <i class="el-icon-edit mr5"></i>
          编辑
        </div>

        <div class="primary-button ml20">
          <i class="el-icon-edit-outline mr5"></i>
          重新发布
        </div>

        <div class="delete-button ml20" flex="main:center cross:center" @click="deleteActivity(item)">
          <i class="el-icon-delete mr5"></i>
          <span style="color: #ffffff">删除活动</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {formatDate} from '@/utils/formatDate'

export default {
  data() {
    return {
      currentTab: 'all',
      list: [],
      formatDate,
      hdState: {
        full: {
          text: '已满',
          type: 'danger'
        },
        expire: {
          text: '已过期',
          type: 'info'
        },
        ongoing: {
          text: '进行中',
          type: 'success'
        }
      }
    }
  },
  methods: {
    activityState(item) {

    },
    handleClick() {

    },
    getList() {
      this.$store.dispatch('GetMyActivities').then(res=> {
        this.list = res.data.data
      })
    },
    deleteActivity(item) {
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: item._id
        }
        this.$store.dispatch('DeleteActivity',params).then(res=> {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })

      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>


<style lang="scss" scoped>
.table-top {
  padding: 0px 30px;
  border-bottom: 2px solid #EFF2F7;
  height: 40px;
  font-size: 14px;
}
.el-card__body {
  padding: 0px !important;
}
.table-content {
  height: 85px;
}
.table-content {
  padding: 0px 30px;
}
.hd-img {
  height: 85px;
}
.hd-title {
  padding-left: 10px;
}
.table-bottom {
  padding: 10px 30px;
  border-top: 2px solid #EFF2F7;
}
.primary-button {
  width: 100px;
  height: 30px;
}

.delete-button {
  background: #f56c6c;
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 20px;
}
</style>
