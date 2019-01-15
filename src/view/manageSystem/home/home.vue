<style>
  .user-infor {
    height: 67px;
  }

  .avator-img {
    display: block;
    width: 80%;
    max-width: 100px;
    height: auto;
  }

  .card-user-infor-name {
    margin-left: 20px;
    font-size: 2em;
    color: #2d8cf0;
  }

  .card-title {
    color: #abafbd;
  }

  .made-child-con-middle {
    height: 100%;
  }

  .to-do-list-con {
    height: 160px;
    overflow: auto;
  }

  .to-do-item {
    padding: 2px;
  }

  .infor-card-con {
    height: 100px;
  }

  .infor-card-icon-con {
    height: 100%;
    color: white;
    border-radius: 3px 0 0 3px;
  }

  .map-con {
    height: 305px;
  }

  .map-incon {
    height: 100%;
  }

  .data-source-row {
    height: 200px;
  }

  .line-chart-con {
    height: 150px;
  }

  .home-main {

  }

</style>
<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col span="8">
      <Row>
        <Card>
          <Row type="flex" class="user-infor">
            <Col span="8" style="padding-left:6px;">
            <Row class-name="made-child-con-middle" type="flex">
              <div>
                <b class="card-user-infor-name">欢迎</b>
              </div>
            </Row>
            </Col>
            <Col span="16" style="padding-left:6px;">
              <H1>{{name}}</H1>
            </Col>
          </Row>
          <div class="line-gray"></div>
        </Card>
      </Row>
      </Col>
      <Col span="16" class-name="padding-left-5">
      <Row>
        <a @click="$router.push('member')">
        <Col span="6">
        <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add"
                    color="#2d8cf0" intro-text="会员数量"
        ></infor-card>
        </Col>
        </a>
        <Col span="6" class-name="padding-left-5">
        <infor-card id-name="visit_count" :end-val="count.visit" iconType="android-person-add" color="#64d572"
                    :iconSize="50" intro-text="新增会员数量"
        ></infor-card>
        </Col>
        <Col span="6" class-name="padding-left-5">
        <infor-card id-name="collection_count" :end-val="count.collection" iconType="upload" color="#ffd572"
                    intro-text="活动总数"
        ></infor-card>
        </Col>
        <Col span="6" class-name="padding-left-5">
        <infor-card id-name="transfer_count" :end-val="count.transfer" iconType="shuffle" color="#f25e43"
                    intro-text="今日新增活动"
        ></infor-card>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row class="margin-top-10" style="margin-top: 10px">
      <Card>
        <Tabs>
          <TabPane label="网页访问量">
            <visit-data :visitData="PCvisite"></visit-data>
          </TabPane>
        </Tabs>
      </Card>
    </Row>
    <Row class="margin-top-10" style="margin-top: 10px" :gutter="16">
      <Col span="8">
        <Card>
          <updata-pie></updata-pie>
        </Card>
      </Col>
      <Col span="16">
        <Card>
          <user-pie></user-pie>
        </Card>
      </Col>
    </Row>
  </div>

</template>

<script>
  import countUp from './components/countUp.vue';
  import inforCard from './components/inforCard.vue';
  import visitData from './components/visitData.vue'
  import MvisitData from './components/MvisitData.vue'
  import WXvisitData from './components/WXvisitData.vue'
  import updataPie from './components/updataPie.vue'
  import userPie from './components/userpie.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    components: {
      countUp,
      inforCard,
      visitData,
      WXvisitData,
      MvisitData,
      updataPie,
      userPie,
    },
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    data () {
      return {
        name:"",
        outerVisible: false,
        innerVisible: false,
        PCvisite: [10, 52, 200, 334, 390, 330, 220, 223, 20, 321, 400, 200],
        Mvisite: [332, 42, 32, 123, 121, 321, 220, 223, 55, 44, 99, 200],
        WXvisite: [13, 59, 99, 232, 222, 421, 500, 132, 232, 51, 12, 111],
        count: {
          createUser: 496,
          visit: 12,
          collection: 13121,
          transfer: 12313221
        },

        newToDoItemValue: ''
      };
    },
    computed: {},
    methods: {},
    mounted:function () {
      this.name = 'mynmae'
    }
  };
</script>
