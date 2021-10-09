<template>
  <div id="updataPie">

  </div>
</template>

<script>
  var echarts = require('echarts')

  export default{
    props:[
      "updata",
    ],
    methods:{
      echartInit(){
        const option = {
          title : {
            text: '活动类型',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['活动1','活动2','活动3','活动4','活动5']
          },
          series: [
            {
              name:'数量',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'活动1'},
                {value:310, name:'活动2'},
                {value:234, name:'活动3'},
                {value:135, name:'活动4'},
                {value:1548, name:'活动5'}
              ]
            }
          ]
        };
        echarts.init(document.getElementById('updataPie')).setOption(option);
      }
    },
    mounted:function () {
      this.echartInit()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #updataPie{
    width: 100%;
    height: 300px;
  }
</style>
