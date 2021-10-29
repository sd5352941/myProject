<template>
  <div class="detail-content">
    <activityDetailPc :data="activityDetail.esInformation" v-if="activityDetail.esInformation"></activityDetailPc>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import activityDetailPc from '@/components/activityDetail/pc'


  export default {
    name: 'activityDetail',
    data() {
      return {}
    },
    components: {
      activityDetailPc
    },
    computed: {
      ...mapGetters([
        'activityDetail',
        'activityDesc'
      ])
    },
    methods: {
      /**
       * 获取活动详情
       */
      getDetail() {
        let query = {
          id: this.$route.query._id
        }
        this.$store.dispatch('GetActivityDetail', query)
      },
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style lang="scss" scoped>
.detail-content {
  display: flex;
  justify-content: center;
}
</style>
