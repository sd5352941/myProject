<template>
  <div class="xhe-radio-box">
    <div class="type-tabs">
      <div v-for="item,index in options.radioArr" class="card" :key="index"
           :class="radioValue === item.value ? 'checked' : ''" @click="inputChange(item.value)">
        <div v-if="item.label">
          <div>{{options.unit}}{{item.label}}</div>
          <div class="sub-text">{{item.value}}</div>
        </div>
        <div v-else>{{item.value}}</div>
      </div>
    </div>
<!--    <div v-for="item,index in options.radioArr" :key="index" class="card">-->
<!--      {{item.value}}-->
<!--    </div>-->


  </div>
</template>

<script>
export default {
  props: {
    options: {
      type:Object,
      default: {
        radioArr: []
      }
    },
    value: {
      type:String,
      default: ''
    }
  },
  model: {
    prop: "value",
    event: 'change'
  },
  data() {
    return {
      radioValue: this.value,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.radioValue = this.options.radioArr[0].value //默认选择第一个
      this.$emit('change',this.radioValue)

    },
    inputChange(val) {
      this.radioValue = val
      this.$emit('change',val)
    }
  }
}
</script>

<style scoped lang="scss">
.type-tabs {
  display: flex;
}

.card {
  width: 256px;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 40px;
  border: 2px solid #D0D0D0;
  border-radius: 4px;
  cursor: pointer;
  ont-family: SFUIText-Regular;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
}

.checked {
  border: 2px solid #1BB14F !important;
  color: #1BB14F !important;
}

.sub-text {
  font-size: 14px;
}


</style>
