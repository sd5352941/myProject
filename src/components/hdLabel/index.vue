<template>
  <div class="card-Label-box" :style="'background-color:' + state[data.state].color ">
    <div class="card-label-text-box" >
      <p>{{state[data.state].text}}</p>
      <div v-if="data.state== 'ongoing'">
        <p>{{data.signUpUser.length}}
          <span v-if="data.people">/{{data.people }}</span>
          <span v-else>人</span>
        </p>
      </div>
      <div class="thumbtack"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:Object,
    }
  },
  data() {
    return {
      state: {
        ongoing: {
          text: '进行中',
          color: '#FFE403'
        },
        full:  {
          text: '已满员',
          color: '#f58659'
        },
        expire: {
          text: '已结束',
          color: '#989A9C'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-Label-box {
  position: absolute;
  top: 0;
  left: 15px;
  width: 47px;
  height: 70px;
  background-color: #FFE403;
  display: flex;
  justify-content: center;
  border-radius: 0px 0px 20px 20px;
  .card-label-text-box {
    margin-top: 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-bottom: 5px;
    }
    .thumbtack {
      position: absolute;
      bottom: 6px;
      width: 8px;
      height: 8px;
      border-radius: 20px;
      background-color: #D8D8D8;
    }
  }

}
</style>
