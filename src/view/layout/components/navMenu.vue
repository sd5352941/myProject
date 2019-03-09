<template>
  <div class="menu">
    <a v-for="item in navMenu" class="men-title">
      {{item.label}}
    </a>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    name: 'navMenu',
    computed: {
      ...mapGetters([
        'navMenu',
      ])
    },
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
.menu {
  display: flex;
  .men-title {
    color: white;
    width: 77px;
  }
  a :active{
    color:yellow;
  }
}
</style>
