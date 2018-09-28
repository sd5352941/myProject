<template>
  <div>
    <carousel></carousel>
    <card-list></card-list>
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
