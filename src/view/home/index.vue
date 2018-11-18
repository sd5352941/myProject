<template>
  <div class="backgourdIMG">
    <carousel></carousel>
    <div class="cardList">
      <card-list></card-list>
    </div>
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

<style>
  .cardList {
    display: flex;
    justify-content: center;
  }

  .backgourdIMG {
  }
</style>
