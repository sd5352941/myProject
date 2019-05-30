<template>
  <div>
    {{commitDetail}}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name:'confirmation',
    computed: {
      ...mapGetters([
        'commitDetail'
      ])
    },
    data() {
      return {

      }
    }
  }
</script>
