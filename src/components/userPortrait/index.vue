<template>
  <img :src="src" v-if="src">
  <img v-else src="static/image/icon/morentouxiang.jpg" style="">
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
  }
}
</script>
