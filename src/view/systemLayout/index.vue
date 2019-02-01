<template>
  <div>
    <sysytem-menu></sysytem-menu>
    <router-view class="top20"></router-view>
  </div>
</template>

<script>
  import sysytemMenu from './menu'

  export default {
    name: 'system',
    components: {
      sysytemMenu
    },
    data() {
      return {

      }
    }
  }
</script>
