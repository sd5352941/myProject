<template>
  <div class="hd-card" flex>
    <img :src="item.imgPath" onerror="javascript:this.src='https://preview.qiantucdn.com/paixin/39/06/74/158PICK58PICjDR3uS96EfXeX_PIC2018.jpg!w1024_new_small'" class="hd-img">
    <div class="card-content">
      <div class="primary-text">{{item.title}}</div>
      <div class="sub-text mt10">
        <i class="el-icon-date"></i>
        {{formatDate(new Date(item.gatheringTime))}}
      </div>
      <div class="sub-text mt10">
        <i class="el-icon-location"></i>
        {{item.address}}
      </div>
      <div class="content-bottom mt20" flex="cross:center">
        <i class="el-icon-user-solid"></i>
        <span>{{item.signUpUser.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/utils/formatDate";

export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formatDate
    }
  },
  methods: {
    toDetail() {
      let query = {
        _id: this.item._id
      }
      this.$router.push({path: '/activityDetail', query})
    }
  }
}
</script>

<style lang="scss" scoped>
.hd-card {
  height: 150px;
  width: 100%;
  border: 1px #eeeeee solid;
  cursor: pointer;
  &:hover {
    border: 1px #FFE403 solid
  }
}
.hd-img {
  width: 262px;
  height: 150px;
}

.card-content {
  padding: 10px;
}

.primary-text {
  font-size: 16px;
}

.sub-text {
  font-size: 14px;
  color: #a0a0a0;
}

.user-name {
  color: #666666;
  &:hover {
    color: #FFE403;
  }
}

.touxiang {
  border-radius: 50px;
  width: 16px;
  height: 16px;
}



</style>
